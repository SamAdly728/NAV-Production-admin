# Laravel + Vue.js Transformation Guide

This guide will walk you through converting your HTML template to a Laravel + Vue.js application with Google OAuth authentication, specifically for XAMPP on Windows 10.

## Prerequisites Check

Before starting, ensure you have:
- ✅ XAMPP with Apache and MySQL running
- ✅ PHP 8.1+ (Check: `php -v` in terminal)
- ✅ Composer installed (Check: `composer -V`)
- ✅ Node.js 16+ and npm (Check: `node -v` and `npm -v`)
- ✅ Google Cloud Console project for OAuth credentials

## Step-by-Step Transformation

### Phase 1: Backup and Prepare

1. **Backup Current Project**
   ```powershell
   # Create a backup of your current template files
   Copy-Item -Path "C:\xampp\htdocs\NAV" -Destination "C:\xampp\htdocs\NAV_BACKUP" -Recurse
   ```

2. **Navigate to Project**
   ```powershell
   cd C:\xampp\htdocs\NAV
   ```

### Phase 2: Install Laravel in Current Directory

Since we can't run `composer create-project` in an existing directory, we'll install Laravel manually:

1. **Create composer.json for Laravel**
   ```powershell
   # This will be created automatically by the script
   ```

2. **Install Laravel Framework**
   ```powershell
   composer require laravel/framework
   composer require laravel/tinker
   ```

### Phase 3: Install Required Packages

```powershell
# Install Laravel Breeze (Authentication scaffolding with Vue)
composer require laravel/breeze --dev

# Install Laravel Socialite (For Google OAuth)
composer require laravel/socialite

# Install Breeze with Vue + Inertia
php artisan breeze:install vue

# Install npm dependencies
npm install
```

### Phase 4: Configure Environment

1. **Create/Update .env file**
   ```env
   APP_NAME="NAV Admin"
   APP_ENV=local
   APP_KEY=
   APP_DEBUG=true
   APP_URL=http://localhost/nav

   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=nav_admin
   DB_USERNAME=root
   DB_PASSWORD=

   # Google OAuth Configuration
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   GOOGLE_REDIRECT_URI=http://localhost/nav/auth/google/callback
   ```

2. **Generate Application Key**
   ```powershell
   php artisan key:generate
   ```

3. **Create Database**
   - Open phpMyAdmin: http://localhost/phpmyadmin
   - Create new database: `nav_admin`

### Phase 5: Setup Google OAuth

1. **Update config/services.php**
   Add Google configuration

2. **Create Google Controller**
   Already available in `laravel-files/GoogleController.php`

3. **Update User Migration**
   Add `google_id` column using `laravel-files/add_google_id_to_users_table.php`

4. **Update Routes**
   Add Google OAuth routes from `laravel-files/web.php`

### Phase 6: Organize Assets

1. **Move Assets to Public**
   ```powershell
   # Assets will be moved to public/assets
   ```

2. **Update Asset References**
   All asset paths will be updated to use Laravel's `asset()` helper

### Phase 7: Create Vue Components

1. **Authentication Layout**
   - Create `resources/js/Layouts/AuthenticatedLayout.vue`

2. **Pages**
   - Login page with Google OAuth button
   - Dashboard page
   - Profile page

3. **Configure Inertia.js**
   - Set up app.js
   - Configure Vite

### Phase 8: Configure for XAMPP

1. **Update public/.htaccess**
   Ensure proper routing for Laravel in subdirectory

2. **Configure Vite for XAMPP**
   Update `vite.config.js` for proper asset serving

### Phase 9: Run Migrations

```powershell
php artisan migrate
```

### Phase 10: Build and Run

```powershell
# Build assets
npm run build

# For development with hot reload
npm run dev
```

## Access Your Application

- **Application URL**: http://localhost/nav/public
- **Or configure virtual host** to access at http://nav.test

## Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Go to Credentials → Create Credentials → OAuth 2.0 Client ID
5. Configure OAuth consent screen
6. Add Authorized redirect URIs:
   - `http://localhost/nav/public/auth/google/callback`
   - `http://localhost/nav/auth/google/callback` (if using rewrite)
7. Copy Client ID and Secret to `.env`

## Troubleshooting

### Issue: 404 Errors
- Check Apache mod_rewrite is enabled in XAMPP
- Verify .htaccess is present in public folder

### Issue: Assets Not Loading
- Run `npm run build`
- Check asset paths use `asset()` helper
- Verify Vite manifest exists in `public/build`

### Issue: Database Connection
- Verify MySQL is running in XAMPP Control Panel
- Check database exists in phpMyAdmin
- Verify .env credentials match XAMPP settings

### Issue: Google OAuth Not Working
- Verify redirect URI exactly matches Google Console
- Check .env has correct credentials
- Ensure services.php is configured

## Development Workflow

```powershell
# Terminal 1: Run Laravel (Apache handles this in XAMPP)
# Just access: http://localhost/nav/public

# Terminal 2: Watch and compile assets
npm run dev
```

## Next Steps

After successful setup:
1. ✅ Test Google login
2. ✅ Customize dashboard with your data
3. ✅ Add more pages (convert HTML templates to Vue components)
4. ✅ Implement CRUD operations
5. ✅ Add authorization and roles

## File Structure After Transformation

```
NAV/
├── app/
│   └── Http/
│       └── Controllers/
│           └── Auth/
│               └── GoogleController.php
├── config/
│   └── services.php
├── database/
│   └── migrations/
├── public/
│   ├── assets/          # Your template assets
│   ├── build/           # Compiled Vue assets
│   └── index.php
├── resources/
│   ├── js/
│   │   ├── Layouts/
│   │   │   └── AuthenticatedLayout.vue
│   │   ├── Pages/
│   │   │   ├── Auth/
│   │   │   │   └── Login.vue
│   │   │   ├── Dashboard.vue
│   │   │   └── Profile.vue
│   │   └── app.js
│   └── views/
│       └── app.blade.php
├── routes/
│   └── web.php
├── template/            # Original HTML templates (reference)
├── .env
├── composer.json
├── package.json
└── vite.config.js
```

## Support Files Provided

The `laravel-files/` folder contains:
- `GoogleController.php` - Google OAuth controller
- `add_google_id_to_users_table.php` - Migration for google_id
- `services.php` - Google service configuration
- `web.php` - Sample routes
- `app.js` - Vue configuration
- `package.json` - npm dependencies

## Important Notes

1. **XAMPP Apache Configuration**: The app will run through Apache, not `php artisan serve`
2. **Public Folder**: Access via http://localhost/nav/public unless you configure a virtual host
3. **Hot Module Replacement**: May need manual refresh in XAMPP setup
4. **File Permissions**: Windows usually doesn't have permission issues like Linux
5. **Database**: Use XAMPP's MySQL (default: root with no password)

---

Ready to start? Follow the automated setup script or run commands manually!
