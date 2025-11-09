#!/usr/bin/env bash
# exit on error
set -o errexit

echo "Checking for PHP..."
php --version || {
    echo "Installing PHP using Heroku buildpack..."
    curl -L https://heroku-buildpack-php.s3.amazonaws.com/dist-heroku-22-stable/php-8.1.30.tar.gz | tar xz -C /tmp
    export PATH=/tmp/php/bin:$PATH
    export LD_LIBRARY_PATH=/tmp/php/lib:$LD_LIBRARY_PATH
}

php --version

echo "Installing Composer..."
curl -sS https://getcomposer.org/installer | php
chmod +x composer.phar

echo "Installing Composer dependencies..."
php composer.phar install --no-dev --optimize-autoloader --no-interaction

echo "Installing NPM dependencies..."
npm ci

echo "Building frontend assets..."
npm run build

echo "Creating storage directories..."
mkdir -p storage/framework/cache/data
mkdir -p storage/framework/sessions
mkdir -p storage/framework/views
mkdir -p storage/logs
mkdir -p bootstrap/cache

echo "Setting permissions..."
chmod -R 775 storage bootstrap/cache

echo "Build completed successfully!"
