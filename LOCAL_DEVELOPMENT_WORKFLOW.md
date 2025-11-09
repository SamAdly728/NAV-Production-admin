# 🔄 Local Development + Production Workflow

## Overview

You have **TWO environments** working together:

### 🏠 Local (XAMPP)
- **URL:** `http://localhost/nav/public`
- **Database:** MySQL on XAMPP
- **Config File:** `.env` (NOT committed to GitHub)
- **Purpose:** Development and testing

### 🌐 Production (Render.com)
- **URL:** `https://nav-production-admin.onrender.com`
- **Database:** PostgreSQL on Render
- **Config File:** `.env.example` → Render environment variables
- **Purpose:** Live application

---

## 📁 Configuration Files

### `.env` (Local - NEVER commit this!)
```env
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost/nav

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nav_admin
DB_USERNAME=root
DB_PASSWORD=

GOOGLE_REDIRECT_URI=http://localhost/nav/auth/google/callback
```

### `.env.example` (Production template - committed to GitHub)
```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://nav-production-admin.onrender.com

DB_CONNECTION=pgsql
DB_HOST=dpg-d465ji4hg0os73ebpqv0-a.oregon-postgres.render.com
DB_PORT=5432
DB_DATABASE=nav_productions_db
DB_USERNAME=nav_productions_db_user
DB_PASSWORD=FnndQlTPxlhcnJcMk4hEB537gu12Xkk2

GOOGLE_REDIRECT_URI=https://nav-production-admin.onrender.com/auth/google/callback
```

---

## 🔧 Google OAuth Setup (Both Environments)

Add **BOTH** redirect URIs to your Google OAuth credentials:

1. Go to: https://console.cloud.google.com/apis/credentials
2. Click your Client ID: `338739274683-5d9vpv4focaanrik97qpomdeb3hkc1vs.apps.googleusercontent.com`
3. Add these **Authorized redirect URIs:**
   ```
   http://localhost/nav/auth/google/callback
   http://localhost/nav/public/auth/google/callback
   https://nav-production-admin.onrender.com/auth/google/callback
   ```
4. Click **Save**

Now Google OAuth will work on BOTH local and production!

---

## 💻 Daily Development Workflow

### Step 1: Work Locally on XAMPP

```powershell
# Navigate to project
cd c:\xampp\htdocs\NAV

# Start development server (optional - for hot reload)
npm run dev
```

**Access your local app:**
- http://localhost/nav/public

### Step 2: Make Changes

Edit your files:
- Vue components in `resources/js/`
- Laravel controllers in `app/Http/Controllers/`
- Routes in `routes/web.php`
- etc.

### Step 3: Test Locally

1. **Build assets** (if needed):
   ```powershell
   npm run build
   ```

2. **Test in browser:**
   - Visit: http://localhost/nav/public
   - Test Google login
   - Test all features
   - Check for errors in browser console

3. **Run migrations** (if you changed database):
   ```powershell
   php artisan migrate
   ```

### Step 4: Push to GitHub (Deploy to Production)

Once you're happy with local changes:

```powershell
# Check what changed
git status

# Add all changes
git add .

# Commit with descriptive message
git commit -m "Added new feature: user dashboard improvements"

# Push to GitHub (this triggers auto-deployment on Render)
git push origin main
```

### Step 5: Verify Production

Wait 5-10 minutes for Render to deploy, then:
- Visit: https://nav-production-admin.onrender.com
- Test the changes
- Check Render logs if there are issues

---

## 🎯 Quick Commands Reference

### Local Development:
```powershell
# Start Vite dev server (hot reload)
npm run dev

# Build assets
npm run build

# Run migrations
php artisan migrate

# Clear cache
php artisan cache:clear
php artisan config:clear
php artisan route:clear
```

### Deploy to Production:
```powershell
# Standard workflow
git add .
git commit -m "Your changes"
git push origin main

# First time only
git init
git branch -M main
git remote add origin https://github.com/SamAdly728/NAV-Production-admin.git
git push -u origin main
```

---

## 🔍 How It Works

### What Stays Local:
- ✅ `.env` file (your local database, local URLs)
- ✅ `node_modules/` folder
- ✅ `vendor/` folder
- ✅ Local database data
- ✅ `storage/logs/` files

### What Goes to GitHub:
- ✅ All code files (`.php`, `.vue`, `.js`)
- ✅ `.env.example` (template for production)
- ✅ `composer.json` and `package.json`
- ✅ Migration files
- ✅ Configuration files

### What Happens on Render:
1. Detects GitHub push
2. Clones your code
3. Runs `build.sh`:
   - Installs Composer packages
   - Installs NPM packages
   - Builds frontend assets
   - Runs database migrations
4. Uses Render environment variables (not `.env.example`)
5. Restarts the application

---

## 📋 Development Checklist

Before pushing to production:

- [ ] Test locally at `http://localhost/nav/public`
- [ ] Google OAuth login works locally
- [ ] No errors in browser console
- [ ] Database migrations work locally
- [ ] Assets build successfully (`npm run build`)
- [ ] All features work as expected

After pushing to production:

- [ ] Render deployment completes (check dashboard)
- [ ] Visit `https://nav-production-admin.onrender.com`
- [ ] Test Google OAuth on production
- [ ] Check Render logs for errors
- [ ] Verify database migrations ran

---

## 🚨 Troubleshooting

### Issue: Changes not showing locally
```powershell
# Clear Laravel cache
php artisan cache:clear
php artisan config:clear
php artisan view:clear

# Rebuild assets
npm run build
```

### Issue: Changes not showing on production
1. Check Render dashboard for deployment status
2. Check Render logs for errors
3. Verify files were pushed to GitHub: https://github.com/SamAdly728/NAV-Production-admin
4. Manual deploy: Render dashboard → "Manual Deploy" → "Deploy latest commit"

### Issue: Google OAuth not working locally
1. Check `.env` has correct Client ID and Secret
2. Verify redirect URI in Google Console includes `http://localhost/nav/auth/google/callback`
3. Clear browser cookies and try again

### Issue: Google OAuth not working on production
1. Check Render environment variables have correct Client ID and Secret
2. Verify redirect URI in Google Console includes `https://nav-production-admin.onrender.com/auth/google/callback`
3. Check `APP_URL` in Render environment variables

---

## 💡 Pro Tips

### 1. Use Git Branches for Features
```powershell
# Create feature branch
git checkout -b new-feature

# Work on feature locally
# ... make changes ...

# Commit changes
git add .
git commit -m "Added new feature"

# Merge to main when ready
git checkout main
git merge new-feature

# Push to production
git push origin main
```

### 2. Check Logs
**Local:**
- Check `storage/logs/laravel.log`
- Check browser console (F12)

**Production:**
- Render Dashboard → Your Service → Logs

### 3. Database Management
**Local:** 
- Use phpMyAdmin: http://localhost/phpmyadmin

**Production:**
- Use DBeaver, TablePlus, or pgAdmin with external database URL:
  ```
  postgresql://nav_productions_db_user:FnndQlTPxlhcnJcMk4hEB537gu12Xkk2@dpg-d465ji4hg0os73ebpqv0-a.oregon-postgres.render.com/nav_productions_db
  ```

### 4. Environment-Specific Code
```php
// In your Laravel code
if (app()->environment('local')) {
    // Local-only code
} elseif (app()->environment('production')) {
    // Production-only code
}
```

---

## 📊 Summary

| Aspect | Local (XAMPP) | Production (Render) |
|--------|--------------|---------------------|
| **URL** | http://localhost/nav/public | https://nav-production-admin.onrender.com |
| **Database** | MySQL (XAMPP) | PostgreSQL (Render) |
| **Config** | `.env` | Render env variables |
| **Purpose** | Development & Testing | Live Application |
| **Changes** | Instant | Push to GitHub → Auto-deploy |
| **Debug Mode** | ON (`APP_DEBUG=true`) | OFF (`APP_DEBUG=false`) |

---

## 🎉 You're All Set!

Now you can:
1. ✅ Develop locally on XAMPP
2. ✅ Test everything before deployment
3. ✅ Push to GitHub when ready
4. ✅ Render automatically deploys your changes
5. ✅ Both environments work independently

**Happy coding! 🚀**
