#!/bin/bash

# Run Laravel optimization commands
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Run migrations
php artisan migrate --force --no-interaction

# Start PHP-FPM in the background
php-fpm -D

# Start Nginx in the foreground
nginx -g "daemon off;"
