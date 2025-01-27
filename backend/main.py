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
        openai.api_key = os.getenv("OPENAI_API_KEY")
        
        # Using the older OpenAI API format for compatibility
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": m.role, "content": m.content} for m in request.messages],
            temperature=0.7,
            max_tokens=500
        )
        
        return {"message": response.choices[0].message["content"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/health")
async def health_check():
    return {"status": "healthy"} 