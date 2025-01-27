from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from loanFlash.api_routes import workflow_routes, template_routes
from loanFlash.nlp_engine import MortgageNLPEngine
from loanFlash.knowledge_base import KnowledgeBase
from loanFlash.conflict_resolution import ConflictResolver
from loanFlash.auth import get_supabase_client
import logging
import traceback
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Configure detailed logging
logging.basicConfig(
    level=logging.DEBUG,  # Changed to DEBUG for more detail
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s - [%(filename)s:%(lineno)d]'
)

logger = logging.getLogger(__name__)

# Log environment setup
logger.info("Environment variables loaded:")
logger.info(f"SUPABASE_URL configured: {'SUPABASE_URL' in os.environ}")
logger.info(f"SUPABASE_KEY configured: {'SUPABASE_KEY' in os.environ}")
logger.info(f"OPENAI_API_KEY configured: {'OPENAI_API_KEY' in os.environ}")

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize global components
try:
    logger.info("Initializing Supabase client...")
    supabase_client = get_supabase_client()
    
    logger.info("Initializing Knowledge Base...")
    knowledge_base = KnowledgeBase(supabase_client)
    
    logger.info("Initializing Conflict Resolver...")
    conflict_resolver = ConflictResolver(supabase_client)
    
    logger.info("Initializing NLP Engine...")
    nlp_engine = MortgageNLPEngine()
    nlp_engine.knowledge_base = knowledge_base
    
    logger.info("All components initialized successfully")
except Exception as e:
    logger.error(f"Error initializing components: {str(e)}")
    logger.error(f"Traceback: {traceback.format_exc()}")
    raise

# Include routers
app.include_router(workflow_routes.router, prefix="/api")
app.include_router(template_routes.router, prefix="/api")

@app.post("/api/chat")
async def chat(request: dict):
    try:
        # Log incoming request
        logger.info(f"Received chat request: {request}")
        
        # Extract the last user message from the messages array
        messages = request.get("messages", [])
        logger.debug(f"Messages array: {messages}")
        
        if not messages:
            logger.warning("No messages provided in request")
            raise HTTPException(status_code=400, detail="Messages array is required")

        # Get the last user message
        user_message = None
        for message in reversed(messages):
            if message.get("role") == "user":
                user_message = message.get("content")
                break
        
        if not user_message:
            logger.warning("No user message found in messages array")
            raise HTTPException(status_code=400, detail="No user message found")

        logger.info(f"Processing user message: {user_message}")

        # Process query using NLP engine
        logger.debug("Calling NLP engine process_query...")
        try:
            response = await nlp_engine.process_query(user_message)
            logger.info(f"NLP engine response: {response}")
        except Exception as nlp_error:
            logger.error(f"NLP engine error: {str(nlp_error)}")
            logger.error(f"NLP error traceback: {traceback.format_exc()}")
            raise HTTPException(status_code=500, detail=f"NLP processing error: {str(nlp_error)}")
        
        # Check if we need to generate a workflow
        workflow = None
        answer = response.get('answer', '') if isinstance(response, dict) else str(response)
        
        if any(keyword in user_message.lower() for keyword in ["apply", "loan", "mortgage", "process"]):
            try:
                logger.info("Workflow generation triggered")
                
                # Extract scenario type from response
                if "fha" in user_message.lower():
                    scenario = "FHA"
                elif "conventional" in user_message.lower():
                    scenario = "CONVENTIONAL"
                elif "va" in user_message.lower():
                    scenario = "VA"
                elif "jumbo" in user_message.lower():
                    scenario = "JUMBO"
                elif "crypto" in user_message.lower():
                    scenario = "CRYPTO_BACKED"
                else:
                    scenario = "CONVENTIONAL"  # Default to conventional
                
                logger.info(f"Detected scenario type: {scenario}")

                # Generate workflow
                logger.debug("Getting workflow generator...")
                workflow_generator = workflow_routes.get_workflow_generator()
                
                logger.debug(f"Generating workflow for scenario: {scenario}")
                workflow = workflow_generator.generate_workflow(
                    scenario=scenario,
                    user_inputs={
                        "query_context": user_message,
                        "nlp_response": answer
                    }
                )
                logger.info(f"Generated workflow: {workflow}")
            except Exception as workflow_error:
                logger.error(f"Error generating workflow: {str(workflow_error)}")
                logger.error(f"Workflow error traceback: {traceback.format_exc()}")
                # Don't raise exception, just log it and continue without workflow

        # Prepare response
        response_data = {
            "answer": answer,
            "workflow": workflow
        }
        logger.info(f"Sending response: {response_data}")
        return response_data

    except Exception as e:
        logger.error(f"Error processing chat request: {str(e)}")
        logger.error(f"Full traceback: {traceback.format_exc()}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    try:
        # Check all components
        health_status = {
            "status": "healthy",
            "components": {
                "supabase": "healthy",
                "nlp_engine": "healthy",
                "knowledge_base": "healthy",
                "conflict_resolver": "healthy"
            }
        }
        
        # Test Supabase connection
        try:
            supabase_client.auth.get_session()
            logger.info("Supabase connection test successful")
        except Exception as e:
            logger.error(f"Supabase connection test failed: {str(e)}")
            health_status["components"]["supabase"] = "unhealthy"
            health_status["status"] = "degraded"
        
        # Test NLP engine
        try:
            if not nlp_engine:
                raise Exception("NLP engine not initialized")
            logger.info("NLP engine check successful")
        except Exception as e:
            logger.error(f"NLP engine check failed: {str(e)}")
            health_status["components"]["nlp_engine"] = "unhealthy"
            health_status["status"] = "degraded"
        
        return health_status
    except Exception as e:
        logger.error(f"Health check failed: {str(e)}")
        logger.error(f"Health check traceback: {traceback.format_exc()}")
        return {
            "status": "unhealthy",
            "error": str(e)
        }

@app.on_event("startup")
async def startup_event():
    logger.info("Starting up FastAPI application...")
    # Log all available routes
    for route in app.routes:
        logger.info(f"Route: {route.path} [{route.methods}]")

@app.on_event("shutdown")
async def shutdown_event():
    logger.info("Shutting down FastAPI application...")