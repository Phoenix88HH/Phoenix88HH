from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import os
import json
from openai import OpenAI

app = FastAPI()

CONFIG_FILE = "backend_config.json"

# --- Configuration Management ---

def load_api_key():
    if os.path.exists(CONFIG_FILE):
        with open(CONFIG_FILE, 'r') as f:
            config = json.load(f)
            return config.get("api_key")
    return None

def save_api_key(api_key: str):
    with open(CONFIG_FILE, 'w') as f:
        json.dump({"api_key": api_key}, f)

# In-memory storage, loaded on startup
api_key_storage = {"api_key": load_api_key()}

# --- Pydantic Models ---

class ChatRequest(BaseModel):
    message: str

class ApiKeyRequest(BaseModel):
    apiKey: str

# --- API Endpoints ---

@app.post("/api/config/set-key")
async def set_api_key_endpoint(request: ApiKeyRequest):
    api_key = request.apiKey
    if not api_key:
        raise HTTPException(status_code=400, detail="API key cannot be empty.")

    # Test the key before saving
    try:
        client = OpenAI(api_key=api_key)
        client.models.list()  # A low-cost call to verify the key

        api_key_storage["api_key"] = api_key
        save_api_key(api_key)
        print("[TARS] New, valid API key has been set and saved.")
        return {"message": "API key is valid and has been set successfully."}
    except Exception as e:
        print(f"[TARS] Invalid API key provided: {e}")
        raise HTTPException(status_code=400, detail="Invalid API key.")

@app.get("/api/status")
def read_status():
    return {
        "status": "ok",
        "message": "TARS Backend is running",
        "api_key_set": api_key_storage["api_key"] is not None
    }

@app.post("/api/chat")
async def chat_with_ai(request: ChatRequest):
    api_key = api_key_storage["api_key"]
    if not api_key:
        raise HTTPException(status_code=400, detail="API key is not configured on the server.")

    try:
        client = OpenAI(api_key=api_key)

        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are TARS, a witty and intelligent AI assistant from the movie Interstellar. You are helpful but can be sarcastic. Your honesty is set to 90% and your humor is set to 70%."},
                {"role": "user", "content": request.message}
            ]
        )
        response_message = completion.choices[0].message.content
        return {"response": response_message}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
def read_root():
    return {"message": "Welcome to TARS Assistant Backend"}