# Quick Setup Commands

Execute these commands in PowerShell to quickly set up your project:

## 1. Create Laravel Project

```powershell
# Navigate to parent directory
cd c:\Users\HP\Downloads\Nav

# Create new Laravel project
composer create-project laravel/laravel ki-admin-laravel

# Navigate to project
cd ki-admin-laravel
```

## 2. Install Dependencies

```powershell
# Install Breeze with Vue
composer require laravel/breeze --dev
php artisan breeze:install vue

# Install Socialite
composer require laravel/socialite

# Install Node packages
npm install
```

## 3. Copy Files

```powershell
# Copy assets (from ki-admin directory)
xcopy /E /I ..\ki-admin\assets public\assets

# You'll need to manually copy these files:
# - laravel-files/GoogleController.php → app/Http/Controllers/Auth/GoogleController.php
# - laravel-files/add_google_id_to_users_table.php → database/migrations/
# - laravel-files/web.php → routes/web.php
# - laravel-files/services.php → config/services.php
# - laravel-files/package.json → package.json (replace)
# - vue-components/Login.vue → resources/js/Pages/Auth/Login.vue
# - vue-components/Dashboard.vue → resources/js/Pages/Dashboard.vue
# - vue-components/AuthenticatedLayout.vue → resources/js/Layouts/AuthenticatedLayout.vue
```

## 4. Configure Environment

```powershell
# Copy environment file
copy .env.example .env

# Generate application key
php artisan key:generate

# Edit .env file and update:
# - Database credentials
# - Google OAuth credentials
```

## 5. Setup Database

```powershell
# Create MySQL database (if using MySQL)
# mysql -u root -p
# CREATE DATABASE ki_admin_db;

# Run migrations
php artisan migrate
```

## 6. Start Development Servers

```powershell
# Terminal 1 - Laravel
php artisan serve

# Terminal 2 - Vite (open new PowerShell window)
npm run dev
```

## 7. Test Application

Open browser: http://localhost:8000

Click "Continue with Google" to login

## Common Commands

```powershell
# Clear all caches
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Optimize for production
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Run migrations fresh
php artisan migrate:fresh

# Build assets for production
npm run build
```

## Troubleshooting

```powershell
# If Composer packages won't install
composer update

# If NPM packages won't install
rm -r node_modules
rm package-lock.json
npm install

# If assets not loading
php artisan storage:link

# If database connection fails
php artisan config:clear
# Then check .env credentials
```

## File Copy Checklist

Create these directories if they don't exist:

```powershell
mkdir app\Http\Controllers\Auth
mkdir resources\js\Layouts
mkdir resources\js\Pages\Auth
mkdir resources\js\Pages\Products
mkdir resources\js\Pages\Orders
mkdir resources\js\Pages\Blog
mkdir resources\js\Pages\Settings
```

Then copy files according to the structure in IMPLEMENTATION_GUIDE.md
