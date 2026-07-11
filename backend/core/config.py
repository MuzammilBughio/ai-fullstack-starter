from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    APP_NAME: str = "MyAIApp"
    ENVIRONMENT: str = "development"
    FRONTEND_URL: str = "http://localhost:3000"

    DATABASE_URL: str
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    OPENAI_API_KEY: str = ""

    class Config:
        env_file = ".env"


settings = Settings()
