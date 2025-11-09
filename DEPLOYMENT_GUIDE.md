# Deployment Guide for Render.com

## Prerequisites

- Git installed on your computer
- GitHub account
- Render.com account
- PostgreSQL database created on Render.com (already done)
- Google OAuth credentials

## Step 1: Prepare the GitHub Repository

### 1.1 Navigate to your project directory
```powershell
cd c:\xampp\htdocs\NAV
```

### 1.2 Initialize Git (if not already initialized)
```powershell
git init
git branch -M main
```

### 1.3 Add all files to Git
```powershell
git add .
```

### 1.4 Commit the changes
```powershell
git commit -m "Initial commit - NAV Admin Panel for production"
```

### 1.5 Connect to GitHub repository

**IMPORTANT:** First, delete everything in your GitHub repository:
1. Go to: https://github.com/SamAdly728/NAV-Production-admin
2. Click on "Settings" (bottom right)
3. Scroll down to "Danger Zone"
4. Click "Delete this repository"
5. Create a new empty repository with the same name: `NAV-Production-admin`

Then connect your local project:
```powershell
git remote add origin https://github.com/SamAdly728/NAV-Production-admin.git
```

### 1.6 Push to GitHub
```powershell
git push -u origin main
```

If you encounter authentication issues, you may need to use a Personal Access Token:
1. Go to GitHub → Settings → Developer settings → Personal access tokens
2. Generate a new token with `repo` permissions
3. Use the token as your password when pushing

## Step 2: Configure Google OAuth

### 2.1 Create OAuth Credentials
1. Go to: https://console.cloud.google.com/
2. Create a new project or select existing one
3. Navigate to: APIs & Services → Credentials
4. Click "Create Credentials" → "OAuth 2.0 Client ID"
5. Choose "Web application"
6. Add Authorized redirect URIs:
   - Development: `http://localhost/nav/auth/google/callback`
   - Production: `https://your-app-name.onrender.com/auth/google/callback`
7. Save the **Client ID** and **Client Secret**

## Step 3: Deploy on Render.com

### 3.1 Connect GitHub Repository
1. Log in to: https://render.com/
2. Click "New +" → "Web Service"
3. Connect your GitHub account (if not already connected)
4. Select repository: `SamAdly728/NAV-Production-admin`
5. Click "Connect"

### 3.2 Configure Service Settings

**Basic Settings:**
- **Name:** `nav-admin-panel` (or your preferred name)
- **Environment:** `PHP`
- **Region:** Choose closest to your users (or Oregon for database proximity)
- **Branch:** `main`

**Build & Deploy:**
- **Build Command:** `./build.sh`
- **Start Command:** `php artisan serve --host=0.0.0.0 --port=$PORT`

### 3.3 Add Environment Variables

Click "Add Environment Variable" and add the following:

| Key | Value |
|-----|-------|
| `APP_NAME` | `NAV Admin` |
| `APP_ENV` | `production` |
| `APP_DEBUG` | `false` |
| `APP_URL` | `https://your-app-name.onrender.com` (update after deployment) |
| `DB_CONNECTION` | `pgsql` |
| `DB_HOST` | `dpg-d465ji4hg0os73ebpqv0-a.oregon-postgres.render.com` |
| `DB_PORT` | `5432` |
| `DB_DATABASE` | `nav_productions_db` |
| `DB_USERNAME` | `nav_productions_db_user` |
| `DB_PASSWORD` | `FnndQlTPxlhcnJcMk4hEB537gu12Xkk2` |
| `GOOGLE_CLIENT_ID` | `[Your Google OAuth Client ID]` |
| `GOOGLE_CLIENT_SECRET` | `[Your Google OAuth Client Secret]` |
| `SESSION_DRIVER` | `file` |
| `CACHE_DRIVER` | `file` |
| `QUEUE_CONNECTION` | `sync` |
| `LOG_CHANNEL` | `errorlog` |

**IMPORTANT:** Render will auto-generate `APP_KEY` for you, or you can generate one:
```bash
php artisan key:generate --show
```

### 3.4 Deploy
1. Click "Create Web Service"
2. Render will automatically:
   - Clone your repository
   - Run the build script
   - Install dependencies
   - Build frontend assets
   - Run database migrations
   - Start the application

### 3.5 Update Google OAuth Redirect URI
Once deployment is complete:
1. Note your Render app URL: `https://your-app-name.onrender.com`
2. Go back to Google Cloud Console
3. Update the OAuth redirect URI to: `https://your-app-name.onrender.com/auth/google/callback`
4. Update the `APP_URL` environment variable in Render

## Step 4: Post-Deployment

### 4.1 Verify Deployment
1. Visit your app: `https://your-app-name.onrender.com`
2. Test Google OAuth login
3. Check logs in Render dashboard if any issues

### 4.2 Common Issues & Solutions

**Issue: 500 Error**
- Check Render logs
- Verify `APP_KEY` is set
- Ensure database migrations ran successfully

**Issue: Google OAuth fails**
- Verify redirect URI matches exactly in Google Console
- Check `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are set correctly

**Issue: Assets not loading**
- Ensure `npm run build` completed successfully
- Check `/public/build` directory exists

**Issue: Database connection error**
- Verify PostgreSQL credentials are correct
- Check database is accessible from Render

### 4.3 Enable Auto-Deploy
Render will automatically deploy when you push to GitHub:
```powershell
# Make changes to your code
git add .
git commit -m "Your commit message"
git push origin main
```

## Step 5: Optional Enhancements

### 5.1 Custom Domain
1. In Render dashboard, go to your service
2. Click "Settings" → "Custom Domains"
3. Add your domain and follow DNS setup instructions

### 5.2 Enable HTTPS (Auto-enabled on Render)
Render automatically provides free SSL certificates

### 5.3 Database Backups
Render automatically backs up PostgreSQL databases

## Database Information

**External Database URL:**
```
postgresql://nav_productions_db_user:FnndQlTPxlhcnJcMk4hEB537gu12Xkk2@dpg-d465ji4hg0os73ebpqv0-a.oregon-postgres.render.com/nav_productions_db
```

You can connect to this database using tools like:
- pgAdmin
- DBeaver
- TablePlus

## Support & Troubleshooting

### View Logs
```powershell
# In Render dashboard
Click on your service → "Logs" tab
```

### Connect to Database
Use the external database URL with your favorite PostgreSQL client

### Restart Service
In Render dashboard: Click "Manual Deploy" → "Deploy latest commit"

---

## Quick Command Reference

```powershell
# Initialize and push to GitHub
git init
git branch -M main
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/SamAdly728/NAV-Production-admin.git
git push -u origin main

# Future updates
git add .
git commit -m "Your changes"
git push origin main
```

## Contact & Resources

- Render Documentation: https://render.com/docs
- Laravel Documentation: https://laravel.com/docs
- Google OAuth Setup: https://console.cloud.google.com/

---

**Note:** After first deployment, make sure to update your `.env.example` file with the correct production URLs and commit the changes.
