# 📝 Command Cheat Sheet - NAV Laravel Project

Quick reference for common commands you'll use while developing your Laravel + Vue.js application.

---

## 🚀 Initial Setup Commands

```powershell
# Install all dependencies
composer install
npm install

# Setup environment
copy .env.example .env
php artisan key:generate

# Run migrations
php artisan migrate

# Build frontend assets
npm run build
```

---

## 💻 Development Commands

### Frontend Development

```powershell
# Start Vite dev server (hot reload)
npm run dev

# Build for production
npm run build

# Watch mode (alternative to dev)
npm run watch
```

### Laravel Commands

```powershell
# Clear all caches
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Clear everything at once
php artisan optimize:clear

# View all routes
php artisan route:list

# View config values
php artisan config:show

# Run tinker (Laravel REPL)
php artisan tinker
```

---

## 🗄️ Database Commands

```powershell
# Run migrations
php artisan migrate

# Rollback last migration
php artisan migrate:rollback

# Reset all migrations
php artisan migrate:reset

# Fresh migration (drop all tables and re-run)
php artisan migrate:fresh

# Refresh migrations (rollback & migrate)
php artisan migrate:refresh

# Create new migration
php artisan make:migration create_products_table

# Check migration status
php artisan migrate:status
```

---

## 🏗️ Creating New Files

### Controllers

```powershell
# Create controller
php artisan make:controller ProductController

# Create resource controller
php artisan make:controller ProductController --resource

# Create API controller
php artisan make:controller API/ProductController --api
```

### Models

```powershell
# Create model
php artisan make:model Product

# Create model with migration
php artisan make:model Product -m

# Create model with migration and controller
php artisan make:model Product -mc

# Create everything
php artisan make:model Product -mcr
```

### Other Files

```powershell
# Create middleware
php artisan make:middleware CheckAge

# Create request
php artisan make:request StoreProductRequest

# Create resource
php artisan make:resource ProductResource

# Create seeder
php artisan make:seeder ProductSeeder

# Create factory
php artisan make:factory ProductFactory
```

---

## 🔒 Authentication Commands

```powershell
# No additional auth commands needed
# Google OAuth is already configured
```

---

## 🌐 Server Commands

```powershell
# Using XAMPP (Apache already running)
# Just access: http://localhost/nav/public

# Alternative: Use PHP built-in server
php artisan serve
# Access: http://localhost:8000
```

---

## 🧪 Testing Commands

```powershell
# Run all tests
php artisan test

# Run specific test
php artisan test --filter=ProductTest

# Create test
php artisan make:test ProductTest
```

---

## 📦 Composer Commands

```powershell
# Install package
composer require package/name

# Install dev package
composer require package/name --dev

# Remove package
composer remove package/name

# Update all packages
composer update

# Update specific package
composer update package/name

# Dump autoload
composer dump-autoload
```

---

## 📦 NPM Commands

```powershell
# Install package
npm install package-name

# Install dev package
npm install package-name --save-dev

# Remove package
npm uninstall package-name

# Update all packages
npm update

# List installed packages
npm list

# Check outdated packages
npm outdated
```

---

## 🔍 Debugging Commands

```powershell
# View logs (tail)
Get-Content storage\logs\laravel.log -Tail 50 -Wait

# Enable debug mode
# Edit .env: APP_DEBUG=true

# Dump database queries
php artisan tinker
>>> DB::enableQueryLog()
>>> // Run your query
>>> DB::getQueryLog()
```

---

## 🛠️ Maintenance Commands

```powershell
# Put app in maintenance mode
php artisan down

# Bring app back up
php artisan up

# Put in maintenance with secret
php artisan down --secret="my-secret-token"
# Access: http://localhost/nav/public/my-secret-token
```

---

## 🔄 Cache Commands

```powershell
# Cache routes (production)
php artisan route:cache

# Cache config (production)
php artisan config:cache

# Cache views
php artisan view:cache

# Clear all caches
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
```

---

## 📊 Information Commands

```powershell
# View Laravel version
php artisan --version

# View PHP version
php -v

# View Composer version
composer -V

# View Node version
node -v

# View NPM version
npm -v

# List all artisan commands
php artisan list

# Get help for command
php artisan help migrate
```

---

## 🎨 Frontend Development

### Vue Component Commands

```powershell
# No CLI for Vue components
# Manually create files in resources/js/Pages/

# Example structure:
# resources/js/Pages/Products/Index.vue
# resources/js/Pages/Products/Create.vue
# resources/js/Pages/Products/Edit.vue
```

---

## 🔐 Security Commands

```powershell
# Generate new app key
php artisan key:generate

# Clear sessions
php artisan session:clear
```

---

## 📁 File System Commands

```powershell
# Create symbolic link to storage
php artisan storage:link

# Clear temporary files
Remove-Item storage\framework\cache\* -Recurse -Force
Remove-Item storage\framework\sessions\* -Recurse -Force
Remove-Item storage\framework\views\* -Recurse -Force
```

---

## 🌐 Git Commands (Version Control)

```powershell
# Initialize repository
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit"

# View status
git status

# View history
git log --oneline

# Create branch
git checkout -b feature-name

# Switch branch
git checkout main
```

---

## 🚨 Emergency Commands

### Application Not Working

```powershell
# Clear everything
php artisan optimize:clear
composer dump-autoload
npm run build

# Restart services
# Restart Apache in XAMPP Control Panel
```

### Database Issues

```powershell
# Fresh start
php artisan migrate:fresh

# With seeders
php artisan migrate:fresh --seed
```

### Permission Issues

```powershell
# Windows usually doesn't have permission issues
# If needed, run command prompt as Administrator
```

---

## 📚 Quick Workflows

### Adding a New Feature

```powershell
# 1. Create migration
php artisan make:migration create_products_table

# 2. Create model
php artisan make:model Product

# 3. Create controller
php artisan make:controller ProductController --resource

# 4. Run migration
php artisan migrate

# 5. Create Vue component
# Manually create: resources/js/Pages/Products/Index.vue

# 6. Add route in routes/web.php
```

### Deploying Changes

```powershell
# 1. Pull latest code
git pull

# 2. Install dependencies
composer install --no-dev
npm install

# 3. Build assets
npm run build

# 4. Run migrations
php artisan migrate --force

# 5. Clear and cache
php artisan optimize
php artisan config:cache
php artisan route:cache
```

### Daily Development

```powershell
# Terminal 1: Start Vite
npm run dev

# Terminal 2: Work on code
# Make changes, save, see hot reload

# Clear caches if needed
php artisan cache:clear
```

---

## 🎯 Most Used Commands (Top 10)

```powershell
# 1. Start dev server
npm run dev

# 2. Clear cache
php artisan cache:clear

# 3. Run migrations
php artisan migrate

# 4. View routes
php artisan route:list

# 5. Build assets
npm run build

# 6. Create model
php artisan make:model ModelName -m

# 7. Create controller
php artisan make:controller ControllerName

# 8. Install package
composer require package/name

# 9. Clear all caches
php artisan optimize:clear

# 10. Tinker (REPL)
php artisan tinker
```

---

## 💡 Pro Tips

### Create aliases for common commands

Add to your PowerShell profile:

```powershell
# Edit profile
notepad $PROFILE

# Add aliases
function art { php artisan $args }
function mig { php artisan migrate }
function mfs { php artisan migrate:fresh --seed }
function cache-clear { php artisan optimize:clear }

# Usage:
# art cache:clear
# mig
# mfs
```

### Watch mode for better development

```powershell
# Terminal 1: Frontend
npm run dev

# Terminal 2: Backend changes
# Just save and refresh browser
```

### Quick database reset

```powershell
# Drop all tables and re-run migrations
php artisan migrate:fresh

# With seeders
php artisan migrate:fresh --seed
```

---

## 📞 Getting Help

```powershell
# Help for any command
php artisan help command-name

# List all available commands
php artisan list

# View Laravel documentation
# https://laravel.com/docs
```

---

**💾 Save this file for quick reference!**

Print it or keep it open while developing. These are the commands you'll use most often.

---

*Quick Reference Guide for NAV Laravel + Vue.js Project*
