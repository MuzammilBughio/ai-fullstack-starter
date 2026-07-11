# 🚀 Full-Stack AI Starter Template

> Clone this for every project in the 100-project challenge.
> Stack: **Next.js 14 + FastAPI + PostgreSQL + Tailwind + JWT Auth**

## Quick clone for a new project

```bash
cp -r starter-template p05-my-new-project
cd p05-my-new-project
# update .env files, then:
```

## Tech Stack

| Layer | Tech | Why |
|---|---|---|
| Frontend | Next.js 14 (App Router) | File-based routing, SSR, easy Vercel deploy |
| Styling | Tailwind CSS | Utility-first, fast to build |
| Backend | FastAPI (Python) | Async, auto docs at /docs, AI library support |
| Database | PostgreSQL via Neon | Free tier, serverless |
| ORM | SQLAlchemy + Alembic | Migrations out of the box |
| Auth | JWT (access + refresh tokens) | Stateless, works across frontend/backend |
| AI | OpenAI SDK (swap any provider) | Standard interface, easy to switch |

## Project Structure

```
starter-template/
├── frontend/               # Next.js app
│   ├── src/
│   │   ├── app/            # App router pages
│   │   ├── components/     # Reusable UI + layout components
│   │   ├── lib/            # API client, utils
│   │   ├── hooks/          # Custom React hooks
│   │   └── types/          # TypeScript types
│   ├── .env.local          # Frontend env vars
│   └── package.json
├── backend/                # FastAPI app
│   ├── main.py             # Entry point
│   ├── routers/            # API route handlers
│   ├── services/           # Business logic + AI calls
│   ├── models/             # SQLAlchemy DB models
│   ├── core/               # Config, security, DB session
│   ├── .env                # Backend env vars
│   └── requirements.txt
└── README.md
```

## Setup (5 steps)

### 1. Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env            # fill in your values
alembic upgrade head            # run migrations
uvicorn main:app --reload
```

### 2. Frontend
```bash
cd frontend
pnpm install
cp .env.local.example .env.local   # fill in your values
pnpm dev
```

### 3. Check it works
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API docs: http://localhost:8000/docs

## Deploy

| Service | What to deploy | Free? |
|---|---|---|
| Vercel | `/frontend` folder | ✅ |
| Railway | `/backend` folder | ✅ |
| Neon | PostgreSQL | ✅ |

## How to customise for each project

1. Change the app name in `frontend/src/app/layout.tsx`
2. Add your DB models in `backend/models/`
3. Add your API routes in `backend/routers/`
4. Add your AI logic in `backend/services/ai_service.py`
5. Build your UI pages in `frontend/src/app/`

Everything else (auth, DB connection, error handling, CORS) is already wired up.
