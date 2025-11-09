#!/usr/bin/env bash
# exit on error
set -o errexit

echo "Installing PHP using static binary..."
# Download static PHP binary built for Linux
mkdir -p $HOME/php
cd $HOME/php
curl -L https://github.com/crazywhalecc/static-php-cli/releases/download/2.2.0/php-8.1-cli-linux-x86_64.tar.gz -o php.tar.gz
tar -xzf php.tar.gz
rm php.tar.gz

# Add to PATH
export PATH=$HOME/php/bin:$PATH
cd $HOME/repo

echo "Verifying PHP installation..."
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
