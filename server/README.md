# NAV Productions - server (scaffold)

This folder contains a minimal scaffold for the Nav Productions backend using Node.js, Express and Prisma (Postgres).

Quick start (local dev):

1. cd server
2. npm install
3. copy `.env.example` to `.env` and fill values (DATABASE_URL, JWT_SECRET)
4. npx prisma generate
5. npx prisma migrate dev --name init
6. npm run dev

Notes for Render deployment:
- Create a Postgres database as a Render "Database" and set `DATABASE_URL` in the Web Service environment.
- Set `JWT_SECRET`, `STRIPE_SECRET`, and any S3 credentials in Render's environment.
- Use the `start` script for production on Render.

Next steps implemented by the scaffold:
- Health endpoint: GET /health
- Auth endpoints: POST /api/auth/register, POST /api/auth/login (email/password -> JWT)
