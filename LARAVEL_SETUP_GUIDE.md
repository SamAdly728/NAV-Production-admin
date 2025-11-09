# Ki-Admin Laravel Vue Project Setup Guide

This guide will help you convert the HTML template to a Laravel + Vue.js project with Google OAuth authentication.

## Prerequisites

- PHP >= 8.1
- Composer
- Node.js >= 16.x & NPM
- MySQL or PostgreSQL database
- Google Cloud Console account (for OAuth credentials)

## Step 1: Create Laravel Project

```bash
# Navigate to your desired directory
cd c:\Users\HP\Downloads\Nav

# Create a new Laravel project
composer create-project laravel/laravel ki-admin-laravel

# Navigate to the project
cd ki-admin-laravel
```

## Step 2: Install Laravel Breeze with Vue (Inertia.js)

```bash
# Install Laravel Breeze
composer require laravel/breeze --dev

# Install Breeze with Vue and Inertia
php artisan breeze:install vue

# Install NPM dependencies
npm install

# Compile assets
npm run dev
```

## Step 3: Install Laravel Socialite for Google OAuth

```bash
composer require laravel/socialite
```

## Step 4: Configure Database

1. Create a database (e.g., `ki_admin_db`)
2. Update `.env` file:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=ki_admin_db
DB_USERNAME=root
DB_PASSWORD=your_password
```

3. Run migrations:

```bash
php artisan migrate
```

## Step 5: Setup Google OAuth

### 5.1 Get Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Configure OAuth consent screen
6. Add Authorized redirect URIs:
   - `http://localhost:8000/auth/google/callback`
   - `http://127.0.0.1:8000/auth/google/callback`

### 5.2 Configure .env

Add to your `.env` file:

```env
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=http://localhost:8000/auth/google/callback
```

## Step 6: Database Migration for Google Auth

Add `google_id` column to users table:

```bash
php artisan make:migration add_google_id_to_users_table
```

## Step 7: Copy Assets from HTML Template

Copy the following directories from the original template to Laravel:

```
ki-admin/assets/ → ki-admin-laravel/public/assets/
```

## Step 8: Run the Application

```bash
# Start Laravel development server
php artisan serve

# In another terminal, start Vite dev server
npm run dev
```

Visit: `http://localhost:8000`

## Step 9: Test Google Login

1. Click "Login with Google"
2. Authenticate with your Google account
3. You should be redirected to the dashboard

## Project Structure

```
ki-admin-laravel/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Auth/
│   │   │   │   └── GoogleController.php
│   │   │   └── DashboardController.php
│   ├── Models/
│   │   └── User.php
├── database/
│   └── migrations/
├── resources/
│   ├── js/
│   │   ├── Components/
│   │   │   ├── Layout/
│   │   │   │   ├── Sidebar.vue
│   │   │   │   ├── Header.vue
│   │   │   │   └── Footer.vue
│   │   ├── Pages/
│   │   │   ├── Auth/
│   │   │   │   └── Login.vue
│   │   │   ├── Dashboard.vue
│   │   │   ├── Profile.vue
│   │   │   └── ...
│   │   └── app.js
│   └── css/
├── routes/
│   ├── web.php
│   └── auth.php
├── public/
│   └── assets/ (copied from original template)
├── .env
├── composer.json
└── package.json
```

## Additional Features

### Install Additional Packages

```bash
# For better Vue development
npm install @heroicons/vue @headlessui/vue

# For charts (if needed)
npm install apexcharts vue3-apexcharts
```

## Troubleshooting

### Issue: Assets not loading
- Clear cache: `php artisan cache:clear`
- Rebuild assets: `npm run build`

### Issue: Google OAuth not working
- Check callback URL matches exactly
- Verify Google Client ID and Secret in .env
- Ensure Google+ API is enabled

### Issue: Database connection error
- Verify database credentials in .env
- Check if MySQL/PostgreSQL service is running

## Next Steps

1. Customize the Vue components to match your HTML template design
2. Implement additional pages (Products, Orders, Blog, etc.)
3. Add role-based access control if needed
4. Configure email settings for notifications
5. Deploy to production server

## Security Checklist

- [ ] Change APP_KEY in production
- [ ] Use HTTPS in production
- [ ] Keep dependencies updated
- [ ] Enable CSRF protection
- [ ] Configure CORS properly
- [ ] Use environment variables for secrets
- [ ] Implement rate limiting
- [ ] Add 2FA for admin accounts (optional)

## Resources

- [Laravel Documentation](https://laravel.com/docs)
- [Inertia.js Documentation](https://inertiajs.com/)
- [Vue 3 Documentation](https://vuejs.org/)
- [Laravel Socialite](https://laravel.com/docs/socialite)
