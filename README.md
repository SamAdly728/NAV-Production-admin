# NAV Admin - Laravel + Vue.js with Google OAuth

A modern admin dashboard application built with Laravel 10+, Vue 3, Inertia.js, and Google OAuth authentication. Production-ready and deployed on Render.com with PostgreSQL.

## 🚀 Live Demo

**Production URL:** https://nav-production-admin.onrender.com

## Features

- ✅ Laravel 10+ with Vue 3 and Inertia.js
- ✅ Google OAuth Authentication (Laravel Socialite)
- ✅ PostgreSQL Database (Production-ready)
- ✅ Responsive Bootstrap 5 UI
- ✅ Modern SPA experience with Inertia.js
- ✅ Pre-built dashboard with statistics and charts
- ✅ User profile management
- ✅ Clean and modular code structure
- ✅ Deployed on Render.com

## 🎯 Quick Deployment

### Deploy to Production (15 minutes)

See **[DEPLOY_NOW.md](DEPLOY_NOW.md)** for step-by-step deployment guide.

**Quick Steps:**
1. Push to GitHub: `git push origin main`
2. Setup Google OAuth credentials
3. Connect to Render.com
4. Deploy! 🎉

**Detailed Guide:** [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

## 💻 Local Development Setup

### Prerequisites

- ✅ XAMPP with Apache & MySQL (or PostgreSQL)
- ✅ PHP 8.1+
- ✅ Composer
- ✅ Node.js 16+

### Installation

```powershell
# Clone repository
git clone https://github.com/SamAdly728/NAV-Production-admin.git
cd NAV-Production-admin

# Run automated setup
.\setup-laravel.ps1
```

Or manually:

```powershell
# Install dependencies
composer install
npm install

# Setup environment
copy .env.example .env
php artisan key:generate

# Create database
# For local: Create 'nav_admin' in phpMyAdmin
# For production: Use PostgreSQL credentials

# Run migrations
php artisan migrate

# Build assets
npm run build
```

### Configure Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create OAuth 2.0 Client ID
3. Add redirect URIs:
   - Local: `http://localhost/nav/public/auth/google/callback`
   - Production: `https://your-app-name.onrender.com/auth/google/callback`
4. Update `.env` with credentials

## 🗄️ Database Configuration

### Local (MySQL)
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nav_admin
DB_USERNAME=root
DB_PASSWORD=
```

### Production (PostgreSQL on Render.com)
```env
DB_CONNECTION=pgsql
DB_HOST=dpg-d465ji4hg0os73ebpqv0-a.oregon-postgres.render.com
DB_PORT=5432
DB_DATABASE=nav_productions_db
DB_USERNAME=nav_productions_db_user
DB_PASSWORD=FnndQlTPxlhcnJcMk4hEB537gu12Xkk2
```

## Documentation

- **[Complete Setup Guide](LARAVEL_SETUP_GUIDE.md)** - Comprehensive setup instructions
- **[Implementation Guide](IMPLEMENTATION_GUIDE.md)** - Step-by-step implementation walkthrough

## Project Structure

```
ki-admin-laravel/
├── app/
│   └── Http/Controllers/Auth/
│       └── GoogleController.php
├── resources/
│   └── js/
│       ├── Layouts/
│       │   └── AuthenticatedLayout.vue
│       └── Pages/
│           ├── Auth/Login.vue
│           └── Dashboard.vue
├── public/
│   └── assets/
└── routes/
    └── web.php
```

## Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:8000/auth/google/callback`
6. Copy Client ID and Secret to `.env`

## Screenshots

### Login Page
Clean and modern login with Google OAuth integration

### Dashboard
Comprehensive dashboard with statistics, charts, and recent activities

### Responsive Design
Fully responsive across all devices

## Tech Stack

- **Backend**: Laravel 10+
- **Frontend**: Vue 3 + Inertia.js
- **CSS**: Bootstrap 5 + Custom SCSS
- **Authentication**: Laravel Socialite (Google OAuth)
- **Build Tool**: Vite
- **Icons**: Tabler Icons

## Available Pages

- Dashboard (Statistics, Charts, Recent Orders)
- Profile
- Products (Ready for implementation)
- Orders (Ready for implementation)
- Blog (Ready for implementation)
- Settings (Ready for implementation)

## Development

### Run Development Servers

```powershell
# Laravel backend
php artisan serve

# Vite frontend
npm run dev
```

### Build for Production

```powershell
npm run build
php artisan config:cache
php artisan route:cache
```

## License

This project is based on the Ki-Admin HTML template and converted to Laravel + Vue.js.

## Support

For issues and questions:
- Check the [Implementation Guide](IMPLEMENTATION_GUIDE.md)
- Review Laravel documentation
- Check Inertia.js documentation

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments

- Original HTML template: Ki-Admin
- Laravel Framework
- Vue.js
- Inertia.js
- Laravel Socialite
