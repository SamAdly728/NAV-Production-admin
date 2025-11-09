#!/usr/bin/env bash
# exit on error
set -o errexit

echo "Installing PHP 8.1..."
# Install PHP via apt-get (Render's Ubuntu environment)
sudo apt-get update
sudo apt-get install -y php8.1-cli php8.1-fpm php8.1-pgsql php8.1-mbstring php8.1-xml php8.1-curl php8.1-zip php8.1-gd php8.1-bcmath

echo "Installing Composer..."
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php composer-setup.php --quiet
rm composer-setup.php
mv composer.phar /usr/local/bin/composer

echo "Installing Composer dependencies..."
composer install --no-dev --optimize-autoloader --no-interaction

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
