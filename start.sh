#!/usr/bin/env bash

echo "Starting NAV Admin Panel..."

# Start PHP built-in server
php artisan serve --host=0.0.0.0 --port=${PORT:-8000}
