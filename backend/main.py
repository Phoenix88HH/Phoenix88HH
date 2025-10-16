from fastapi import FastAPI

app = FastAPI()

@app.get("/api/status")
def read_status():
    return {"status": "ok", "message": "TARS Backend is running"}

@app.get("/")
def read_root():
    return {"message": "Welcome to TARS Assistant Backend"}