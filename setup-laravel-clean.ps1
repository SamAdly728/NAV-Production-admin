# NAV Admin - Laravel Vue Setup Script
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "NAV Admin - Laravel + Vue Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$currentPath = Get-Location
Write-Host "Current Directory: $currentPath" -ForegroundColor Yellow

# Step 1: Install Composer Dependencies
Write-Host ""
Write-Host "[1/8] Installing Composer dependencies..." -ForegroundColor Green
if (Test-Path "composer.json") {
    composer install
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Composer dependencies installed successfully" -ForegroundColor Green
    } else {
        Write-Host "✗ Failed to install Composer dependencies" -ForegroundColor Red
        Write-Host "Please run 'composer install' manually" -ForegroundColor Yellow
    }
} else {
    Write-Host "✗ composer.json not found" -ForegroundColor Red
}

# Step 2: Copy .env file
Write-Host ""
Write-Host "[2/8] Setting up environment file..." -ForegroundColor Green
if (!(Test-Path ".env")) {
    if (Test-Path ".env.example") {
        Copy-Item ".env.example" ".env"
        Write-Host "✓ .env file created from .env.example" -ForegroundColor Green
    } else {
        Write-Host "✗ .env.example not found" -ForegroundColor Red
    }
} else {
    Write-Host "✓ .env file already exists" -ForegroundColor Yellow
}

# Step 3: Generate Application Key
Write-Host ""
Write-Host "[3/8] Generating application key..." -ForegroundColor Green
php artisan key:generate
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Application key generated" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to generate application key" -ForegroundColor Red
}

# Step 4: Install NPM Dependencies
Write-Host ""
Write-Host "[4/8] Installing NPM dependencies..." -ForegroundColor Green
Write-Host "This may take a few minutes..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ NPM dependencies installed successfully" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to install NPM dependencies" -ForegroundColor Red
}

# Step 5: Create necessary directories
Write-Host ""
Write-Host "[5/8] Creating necessary directories..." -ForegroundColor Green
$directories = @(
    "storage/framework/cache",
    "storage/framework/sessions",
    "storage/framework/views",
    "storage/logs",
    "bootstrap/cache"
)

foreach ($dir in $directories) {
    if (!(Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
        Write-Host "  ✓ Created: $dir" -ForegroundColor Green
    }
}

# Step 6: Move assets to public folder
Write-Host ""
Write-Host "[6/8] Organizing assets..." -ForegroundColor Green
if (Test-Path "assets") {
    if (!(Test-Path "public/assets")) {
        Write-Host "Moving assets to public folder..." -ForegroundColor Yellow
        Copy-Item -Path "assets" -Destination "public/assets" -Recurse -Force
        Write-Host "✓ Assets copied to public/assets" -ForegroundColor Green
    } else {
        Write-Host "✓ Assets already in public folder" -ForegroundColor Yellow
    }
} else {
    Write-Host "⚠ Assets folder not found - will skip for now" -ForegroundColor Yellow
}

# Step 7: Database Setup Instructions
Write-Host ""
Write-Host "[7/8] Database Setup" -ForegroundColor Green
Write-Host "Please complete the following steps:" -ForegroundColor Yellow
Write-Host "  1. Open phpMyAdmin: http://localhost/phpmyadmin" -ForegroundColor Cyan
Write-Host "  2. Create a new database named: nav_admin" -ForegroundColor Cyan
Write-Host "  3. Update .env file with your database credentials" -ForegroundColor Cyan
Write-Host ""
$response = Read-Host "Have you created the database? (y/n)"

if ($response -eq "y" -or $response -eq "Y") {
    Write-Host ""
    Write-Host "Running database migrations..." -ForegroundColor Green
    php artisan migrate
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Database migrations completed" -ForegroundColor Green
    } else {
        Write-Host "✗ Migration failed. Please check your database configuration" -ForegroundColor Red
    }
} else {
    Write-Host "⚠ Skipping database migration. Run 'php artisan migrate' later" -ForegroundColor Yellow
}

# Step 8: Build Assets
Write-Host ""
Write-Host "[8/8] Building frontend assets..." -ForegroundColor Green
Write-Host "Building for production..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Assets built successfully" -ForegroundColor Green
} else {
    Write-Host "✗ Asset build failed" -ForegroundColor Red
}

# Final Instructions
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Configure Google OAuth:" -ForegroundColor Cyan
Write-Host "   - Go to: https://console.cloud.google.com/" -ForegroundColor White
Write-Host "   - Create OAuth 2.0 credentials" -ForegroundColor White
Write-Host "   - Add redirect URI: http://localhost/nav/public/auth/google/callback" -ForegroundColor White
Write-Host "   - Update .env with GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET" -ForegroundColor White
Write-Host ""
Write-Host "2. Access Your Application:" -ForegroundColor Cyan
Write-Host "   - URL: http://localhost/nav/public" -ForegroundColor White
Write-Host "   - Login URL: http://localhost/nav/public/login" -ForegroundColor White
Write-Host ""
Write-Host "3. For Development (Hot Reload):" -ForegroundColor Cyan
Write-Host "   - Open a new terminal and run: npm run dev" -ForegroundColor White
Write-Host "   - Keep it running while developing" -ForegroundColor White
Write-Host ""
Write-Host "4. Troubleshooting:" -ForegroundColor Cyan
Write-Host "   - If you see 404 errors, ensure mod_rewrite is enabled in XAMPP" -ForegroundColor White
Write-Host "   - Check Apache error logs in: C:\xampp\apache\logs\error.log" -ForegroundColor White
Write-Host ""
Write-Host "Documentation:" -ForegroundColor Yellow
Write-Host "   - Read FINAL_STEPS.md for detailed guide" -ForegroundColor White
Write-Host "   - Check README.md for more information" -ForegroundColor White
Write-Host ""
Write-Host "Happy Coding! 🚀" -ForegroundColor Green
Write-Host ""
