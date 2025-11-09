# Prerequisites Installation Guide for Windows

Your system needs PHP and Composer installed before creating the Laravel project. Follow this guide:

## Option 1: Using Laragon (Recommended - Easiest)

Laragon includes PHP, Composer, MySQL, and everything you need in one package.

### Download and Install Laragon

1. **Download Laragon Full**
   - Visit: https://laragon.org/download/
   - Download "Laragon Full" (includes PHP, MySQL, Node.js)
   - File size: ~250MB

2. **Install Laragon**
   - Run the installer
   - Choose installation directory (default: C:\laragon)
   - Complete the installation

3. **Start Laragon**
   - Open Laragon
   - Click "Start All" button
   - Everything (Apache, MySQL, PHP) will start automatically

4. **Verify Installation**
   - Right-click Laragon tray icon
   - Select "Terminal" → This opens a terminal with PHP and Composer available

5. **Continue with Laravel Installation**
   - In the Laragon terminal, navigate to your directory:
   ```bash
   cd C:\Users\HP\Downloads\Nav
   composer create-project laravel/laravel ki-admin-laravel
   ```

## Option 2: Using XAMPP + Composer

If you prefer XAMPP:

### Step 1: Install XAMPP

1. Download XAMPP from: https://www.apachefriends.org/
2. Run installer and install with PHP 8.1 or higher
3. Start Apache and MySQL from XAMPP Control Panel

### Step 2: Install Composer

1. Download from: https://getcomposer.org/Composer-Setup.exe
2. Run the installer
3. It will automatically detect PHP from XAMPP
4. Complete the installation
5. **Restart PowerShell** after installation

### Step 3: Verify Installation

Open a NEW PowerShell window and run:
```powershell
php --version
composer --version
```

## Option 3: Manual Installation (Advanced)

### Install PHP

1. Download PHP 8.1+ from: https://windows.php.net/download/
2. Extract to C:\php
3. Add C:\php to System PATH:
   - Search "Environment Variables" in Windows
   - Edit "Path" variable
   - Add C:\php
4. Copy php.ini-development to php.ini
5. Edit php.ini and enable extensions:
   ```ini
   extension=openssl
   extension=pdo_mysql
   extension=mbstring
   extension=curl
   extension=fileinfo
   extension=zip
   ```

### Install Composer

1. Download: https://getcomposer.org/Composer-Setup.exe
2. Install and follow prompts
3. Restart PowerShell

### Install MySQL

1. Download: https://dev.mysql.com/downloads/installer/
2. Install MySQL Server
3. Set root password during installation

## After Installation

Once PHP and Composer are installed, return to PowerShell and run:

```powershell
# Navigate to directory
cd C:\Users\HP\Downloads\Nav

# Verify installations
php --version
composer --version

# Create Laravel project
composer create-project laravel/laravel ki-admin-laravel

# Navigate to project
cd ki-admin-laravel

# Continue with the rest of the setup from QUICK_START.md
```

## Recommended: Laragon

For the smoothest experience, I highly recommend **Laragon** because:
- ✅ One-click installation
- ✅ Includes everything you need (PHP, MySQL, Composer, Node.js)
- ✅ Easy to manage and start/stop services
- ✅ Built-in terminal with all tools ready
- ✅ Auto-creates virtual hosts
- ✅ Perfect for Laravel development

## Next Steps After Installing Prerequisites

1. ✅ Install Laragon (or XAMPP + Composer)
2. ✅ Open Laragon Terminal (or new PowerShell)
3. ✅ Run the Laravel project creation commands
4. ✅ Continue with the setup from QUICK_START.md

## Need Help?

If you encounter any issues:
- Make sure to restart PowerShell after installing Composer
- Check that PHP version is 8.1 or higher
- Verify Composer is in your PATH
- For Laragon, use the built-in terminal (right-click tray icon → Terminal)
