"""
AI Service — swap the provider here without touching any router.
Currently uses OpenAI. To switch to Anthropic or Gemini, only change this file.
"""
from openai import OpenAI
from core.config import settings

client = OpenAI(api_key=settings.OPENAI_API_KEY)


def chat(
    system_prompt: str,
    user_message: str,
    model: str = "gpt-4o-mini",   # cheap default; use gpt-4o for harder tasks
    max_tokens: int = 1000,
    temperature: float = 0.7,
) -> str:
    """Single-turn chat — returns the assistant's reply as a string."""
    response = client.chat.completions.create(
        model=model,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_message},
        ],
        max_tokens=max_tokens,
        temperature=temperature,
    )
    return response.choices[0].message.content


def chat_with_history(
    messages: list[dict],  # [{"role": "user"|"assistant"|"system", "content": "..."}]
    model: str = "gpt-4o-mini",
    max_tokens: int = 1000,
) -> str:
    """Multi-turn chat with full history — for chatbot projects."""
    response = client.chat.completions.create(
        model=model,
        messages=messages,
        max_tokens=max_tokens,
    )
    return response.choices[0].message.content


def get_embedding(text: str, model: str = "text-embedding-3-small") -> list[float]:
    """Returns a vector embedding — for RAG projects (project 4+)."""
    response = client.embeddings.create(input=text, model=model)
    return response.data[0].embedding
