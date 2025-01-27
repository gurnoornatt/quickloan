from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import os
from dotenv import load_dotenv
import openai

load_dotenv()

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[Message]

@app.post("/api/chat")
async def chat(request: ChatRequest):
    try:
        # Set the API key
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            raise HTTPException(status_code=500, detail="OpenAI API key not found")
        
        # Initialize the client
        client = openai.OpenAI(api_key=api_key)
        
        # Format messages for the API
        messages = [{"role": m.role, "content": m.content} for m in request.messages]
        
        # Add system message to provide context about mortgage assistance
        messages.insert(0, {
            "role": "system",
            "content": "You are a knowledgeable mortgage advisor specializing in all types of mortgages including FHA, conventional, VA, and USDA loans. Provide accurate, helpful information about mortgage processes, requirements, and guidelines."
        })
        
        # Make the API call
        response = await client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=messages,
            temperature=0.7,
            max_tokens=500
        )
        
        # Extract and return the response
        return {"message": response.choices[0].message.content}
    except Exception as e:
        print(f"Error in chat endpoint: {str(e)}")  # Add logging
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/health")
async def health_check():
    return {"status": "healthy"} 