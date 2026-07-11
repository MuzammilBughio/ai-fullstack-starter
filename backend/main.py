from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from core.config import settings
from core.database import Base, engine
from routers import auth
import uvicorn
import os

# Create all tables on startup (use Alembic for production migrations)
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.APP_NAME,
    description="Built with the Full-Stack AI Starter Template",
    version="1.0.0",
)

origins = [
    "http://localhost:3000",
    "https://ai-fullstack-starter-gj1yk1n4t-axiompilot.vercel.app/", 
]

# CORS — allows the Next.js frontend to talk to this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(auth.router, prefix="/api")

# Add your project-specific routers here:
# from routers import items
# app.include_router(items.router, prefix="/api")


@app.get("/")
def root():
    return {"status": "ok", "app": settings.APP_NAME}


@app.get("/health")
def health():
    return {"status": "healthy"}

if __name__ == "__main__":
    # Uses the port assigned dynamically by the cloud provider, defaults to 8000
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port)