#!/bin/bash
# Build script for Render deployment

echo "📦 Installing dependencies..."
npm install

echo "🔄 Generating Prisma client..."
npx prisma generate

echo "🗄️ Running database migrations..."
npx prisma migrate deploy

echo "🌱 Seeding database..."
npm run seed

echo "✅ Build complete!"
