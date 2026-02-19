from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import CurriculumRequest
from ai_service import generate_curriculum

app = FastAPI()

# Enable CORS (important for frontend connection)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "CurricuForge Backend Running ✈️"}

@app.post("/generate")
def create_curriculum(request: CurriculumRequest):

    result = generate_curriculum(
        request.subject,
        request.level,
        request.duration
    )

    return {
        "subject": request.subject,
        "level": request.level,
        "duration": request.duration,
        "curriculum": result
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)