# Windows PowerShell Setup Script for Ki-Admin Laravel Project
# This script will guide you through the setup process

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Ki-Admin Laravel Vue Project Setup" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Check for PHP
Write-Host "Checking prerequisites..." -ForegroundColor Yellow
Write-Host ""

$phpInstalled = Get-Command php -ErrorAction SilentlyContinue
$composerInstalled = Get-Command composer -ErrorAction SilentlyContinue

if (-not $phpInstalled) {
    Write-Host "❌ PHP is not installed or not in PATH" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install PHP first. Recommended options:" -ForegroundColor Yellow
    Write-Host "1. Install Laragon (Easiest): https://laragon.org/download/" -ForegroundColor Green
    Write-Host "2. Install XAMPP: https://www.apachefriends.org/" -ForegroundColor Green
    Write-Host ""
    Write-Host "See PREREQUISITES_INSTALLATION.md for detailed instructions" -ForegroundColor Cyan
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

if (-not $composerInstalled) {
    Write-Host "❌ Composer is not installed or not in PATH" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install Composer:" -ForegroundColor Yellow
    Write-Host "Download from: https://getcomposer.org/Composer-Setup.exe" -ForegroundColor Green
    Write-Host ""
    Write-Host "After installation, restart PowerShell and run this script again." -ForegroundColor Cyan
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

# Show versions
$phpVersion = php --version | Select-Object -First 1
$composerVersion = composer --version
Write-Host "✅ PHP: $phpVersion" -ForegroundColor Green
Write-Host "✅ Composer: $composerVersion" -ForegroundColor Green
Write-Host ""

# Confirm to proceed
Write-Host "Ready to create Laravel project. This will:" -ForegroundColor Yellow
Write-Host "  1. Create new Laravel project (ki-admin-laravel)" -ForegroundColor White
Write-Host "  2. Install Laravel Breeze with Vue" -ForegroundColor White
Write-Host "  3. Install Laravel Socialite" -ForegroundColor White
Write-Host "  4. Install NPM dependencies" -ForegroundColor White
Write-Host ""

$confirm = Read-Host "Continue? (Y/N)"
if ($confirm -ne "Y" -and $confirm -ne "y") {
    Write-Host "Setup cancelled." -ForegroundColor Yellow
    exit 0
}

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Step 1: Creating Laravel Project" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "This may take a few minutes..." -ForegroundColor Yellow
Write-Host ""

# Navigate to directory
Set-Location "C:\Users\HP\Downloads\Nav"

# Create Laravel project
composer create-project laravel/laravel ki-admin-laravel

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "❌ Failed to create Laravel project" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "✅ Laravel project created successfully!" -ForegroundColor Green
Write-Host ""

# Navigate to project
Set-Location "ki-admin-laravel"

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Step 2: Installing Laravel Breeze" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

composer require laravel/breeze --dev

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "❌ Failed to install Breeze" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "Installing Breeze with Vue stack..." -ForegroundColor Yellow
php artisan breeze:install vue

Write-Host ""
Write-Host "✅ Breeze installed successfully!" -ForegroundColor Green
Write-Host ""

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Step 3: Installing Laravel Socialite" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

composer require laravel/socialite

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "❌ Failed to install Socialite" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "✅ Socialite installed successfully!" -ForegroundColor Green
Write-Host ""

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Step 4: Installing NPM Dependencies" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "This may take a few minutes..." -ForegroundColor Yellow
Write-Host ""

npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "❌ Failed to install NPM packages" -ForegroundColor Red
    Write-Host "You may need to install Node.js from: https://nodejs.org/" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "✅ NPM dependencies installed successfully!" -ForegroundColor Green
Write-Host ""

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Setup Complete!" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "✅ Laravel project created: ki-admin-laravel" -ForegroundColor Green
Write-Host "✅ Breeze with Vue installed" -ForegroundColor Green
Write-Host "✅ Socialite installed" -ForegroundColor Green
Write-Host "✅ NPM dependencies installed" -ForegroundColor Green
Write-Host ""

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Next Steps" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Copy project files from ki-admin folder:" -ForegroundColor Yellow
Write-Host "   - Laravel backend files to appropriate locations" -ForegroundColor White
Write-Host "   - Vue components to resources/js/" -ForegroundColor White
Write-Host "   - Assets to public/assets/" -ForegroundColor White
Write-Host ""
Write-Host "2. Configure .env file with:" -ForegroundColor Yellow
Write-Host "   - Database credentials" -ForegroundColor White
Write-Host "   - Google OAuth credentials" -ForegroundColor White
Write-Host ""
Write-Host "3. Run migrations:" -ForegroundColor Yellow
Write-Host "   php artisan migrate" -ForegroundColor White
Write-Host ""
Write-Host "4. Start development servers:" -ForegroundColor Yellow
Write-Host "   Terminal 1: php artisan serve" -ForegroundColor White
Write-Host "   Terminal 2: npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "See IMPLEMENTATION_GUIDE.md for detailed instructions" -ForegroundColor Cyan
Write-Host ""

Read-Host "Press Enter to exit"
