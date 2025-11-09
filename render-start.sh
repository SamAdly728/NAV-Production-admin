#!/usr/bin/env bash

# Add PHP to PATH
export PATH=$HOME/php/bin:$PATH

echo "Running migrations..."
php artisan migrate --force --no-interaction

echo "Clearing and caching config..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "Starting PHP built-in server..."
php artisan serve --host=0.0.0.0 --port=${PORT:-8000}
