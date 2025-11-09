# Quick Start Guide - NAV Admin Laravel + Vue.js

## 🚀 Quick Setup (5 Minutes)

This guide will help you transform your HTML template into a Laravel + Vue.js application with Google OAuth authentication in XAMPP.

---

## Prerequisites

✅ **Already Running:**
- XAMPP with Apache and MySQL
- Template accessible at: `http://localhost/nav/template/`

✅ **Required Software:**
- PHP 8.1+ (Check: `php -v`)
- Composer (Check: `composer -V`)
- Node.js 16+ (Check: `node -v`)

---

## Step-by-Step Setup

### 1️⃣ Run the Setup Script

Open PowerShell in the `C:\xampp\htdocs\NAV` directory and run:

```powershell
.\setup-laravel.ps1
```

**What it does:**
- Installs all Composer dependencies
- Creates .env file
- Generates application key
- Installs NPM packages
- Creates necessary directories
- Builds frontend assets

**Time:** ~3-5 minutes (depending on internet speed)

---

### 2️⃣ Create Database

1. Open phpMyAdmin: **http://localhost/phpmyadmin**
2. Click "New" in the left sidebar
3. Database name: `nav_admin`
4. Collation: `utf8mb4_unicode_ci`
5. Click "Create"

---

### 3️⃣ Run Migrations

```powershell
php artisan migrate
```

This creates the users table with Google OAuth support.

---

### 4️⃣ Setup Google OAuth

#### A. Create Google Cloud Project

1. Go to: **https://console.cloud.google.com/**
2. Create a new project or select existing
3. Enable **Google+ API**

#### B. Create OAuth Credentials

1. Go to: **APIs & Services → Credentials**
2. Click: **Create Credentials → OAuth 2.0 Client ID**
3. Application type: **Web application**
4. Name: `NAV Admin`
5. Authorized redirect URIs:
   ```
   http://localhost/nav/public/auth/google/callback
   ```
6. Click **Create**
7. Copy **Client ID** and **Client Secret**

#### C. Update .env File

Edit `C:\xampp\htdocs\NAV\.env`:

```env
GOOGLE_CLIENT_ID=your-client-id-here.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret-here
GOOGLE_REDIRECT_URI=http://localhost/nav/public/auth/google/callback
```

---

### 5️⃣ Access Your Application

**Production Mode:**
- URL: **http://localhost/nav/public**
- Login: **http://localhost/nav/public/login**

**Development Mode (with Hot Reload):**

Open a new terminal and run:
```powershell
npm run dev
```

Keep this terminal open while developing. Changes to Vue files will auto-refresh!

---

## 🎉 You're Done!

Click "Sign in with Google" on the login page and you'll be redirected to your dashboard!

---

## 📁 Project Structure

```
NAV/
├── app/
│   ├── Http/Controllers/Auth/
│   │   └── GoogleController.php      # Google OAuth logic
│   ├── Models/
│   │   └── User.php                   # User model
├── resources/
│   ├── js/
│   │   ├── Pages/
│   │   │   ├── Auth/Login.vue         # Login page
│   │   │   └── Dashboard.vue          # Dashboard
│   │   ├── Layouts/
│   │   │   └── AuthenticatedLayout.vue
│   │   └── app.js                     # Vue entry point
│   └── views/
│       └── app.blade.php              # Main template
├── public/
│   ├── assets/                        # Your template assets
│   └── index.php                      # Laravel entry point
├── routes/
│   └── web.php                        # Application routes
├── .env                               # Environment config
└── template/                          # Original HTML (reference)
```

---

## 🛠️ Common Tasks

### Start Development Server
```powershell
npm run dev
```

### Build for Production
```powershell
npm run build
```

### Clear Cache
```powershell
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
```

### Create New Migration
```powershell
php artisan make:migration create_products_table
```

### Create New Controller
```powershell
php artisan make:controller ProductController
```

---

## 🐛 Troubleshooting

### Issue: 404 Not Found

**Solution:**
1. Ensure Apache's `mod_rewrite` is enabled in XAMPP
2. Check `.htaccess` exists in `public/` folder
3. Restart Apache

### Issue: Assets Not Loading

**Solution:**
```powershell
npm run build
php artisan config:clear
```

### Issue: Database Connection Error

**Solution:**
1. Verify MySQL is running in XAMPP Control Panel
2. Check `.env` database credentials:
   ```env
   DB_DATABASE=nav_admin
   DB_USERNAME=root
   DB_PASSWORD=
   ```

### Issue: Google OAuth Error

**Solution:**
1. Verify redirect URI matches exactly in Google Console
2. Check `.env` has correct credentials
3. Clear browser cache/cookies

---

## 📚 Next Steps

### Add More Pages

1. Create Vue component in `resources/js/Pages/`
2. Add route in `routes/web.php`
3. Access at the defined route

Example for Products page:

**resources/js/Pages/Products/Index.vue**
```vue
<template>
  <AuthenticatedLayout>
    <div class="py-12">
      <h1>Products Page</h1>
    </div>
  </AuthenticatedLayout>
</template>

<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
</script>
```

**routes/web.php**
```php
Route::get('/products', function () {
    return Inertia::render('Products/Index');
})->name('products');
```

### Convert HTML Templates to Vue

1. Open original template in `template/` folder
2. Extract HTML structure
3. Create corresponding Vue component
4. Style using Tailwind CSS or your template's CSS

---

## 🔐 Security Notes

- Never commit `.env` file to git
- Keep Google OAuth credentials secure
- Use HTTPS in production
- Enable CSRF protection (already configured)

---

## 📖 Documentation

- **Laravel:** https://laravel.com/docs
- **Vue.js:** https://vuejs.org/guide/
- **Inertia.js:** https://inertiajs.com/
- **Tailwind CSS:** https://tailwindcss.com/docs

---

## 💡 Tips

1. **Use Laravel Debugbar** for development:
   ```powershell
   composer require barryvdh/laravel-debugbar --dev
   ```

2. **Enable Vue DevTools** in browser for debugging

3. **Keep terminals open:**
   - Terminal 1: For running commands
   - Terminal 2: `npm run dev` (for hot reload)

4. **Original templates** in `template/` folder are your reference

---

## ✅ Checklist

- [ ] Ran `setup-laravel.ps1` script
- [ ] Created `nav_admin` database
- [ ] Ran migrations
- [ ] Setup Google OAuth credentials
- [ ] Updated `.env` with Google credentials
- [ ] Accessed login page successfully
- [ ] Logged in with Google
- [ ] Saw dashboard

---

## 🎯 What You Have Now

✅ Laravel 10+ backend
✅ Vue 3 + Inertia.js frontend
✅ Google OAuth authentication
✅ Responsive dashboard
✅ User management
✅ Protected routes
✅ Modern SPA experience
✅ Hot module replacement for development
✅ All original template assets preserved

---

## 🆘 Need Help?

Check these files for more details:
- `TRANSFORMATION_STEPS.md` - Detailed transformation guide
- `README.md` - Project overview
- `LARAVEL_SETUP_GUIDE.md` - Comprehensive Laravel setup

---

**Enjoy your new Laravel + Vue.js application! 🎊**
