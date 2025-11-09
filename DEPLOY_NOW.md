# Quick Deployment Steps

## 1. Push to GitHub (5 minutes)

### Delete old repository content on GitHub:
1. Visit: https://github.com/SamAdly728/NAV-Production-admin/settings
2. Scroll to "Danger Zone" → Delete repository
3. Create new empty repository: `NAV-Production-admin`

### Push your code:
```powershell
cd c:\xampp\htdocs\NAV
git init
git branch -M main
git add .
git commit -m "Production ready NAV Admin Panel"
git remote add origin https://github.com/SamAdly728/NAV-Production-admin.git
git push -u origin main
```

## 2. Setup Google OAuth (3 minutes)

1. Go to: https://console.cloud.google.com/apis/credentials
2. Create OAuth 2.0 Client ID
3. Add redirect URI: `https://your-app-name.onrender.com/auth/google/callback`
4. Save **Client ID** and **Client Secret**

## 3. Deploy on Render (10 minutes)

### Create Web Service:
1. Login to: https://render.com
2. Click "New +" → "Web Service"
3. Connect GitHub repo: `SamAdly728/NAV-Production-admin`

### Configure:
- **Build Command:** `./build.sh`
- **Start Command:** `php artisan serve --host=0.0.0.0 --port=$PORT`

### Add Environment Variables:
```
APP_NAME=NAV Admin
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-app-name.onrender.com
DB_CONNECTION=pgsql
DB_HOST=dpg-d465ji4hg0os73ebpqv0-a.oregon-postgres.render.com
DB_PORT=5432
DB_DATABASE=nav_productions_db
DB_USERNAME=nav_productions_db_user
DB_PASSWORD=FnndQlTPxlhcnJcMk4hEB537gu12Xkk2
GOOGLE_CLIENT_ID=[paste your client id]
GOOGLE_CLIENT_SECRET=[paste your client secret]
SESSION_DRIVER=file
CACHE_DRIVER=file
LOG_CHANNEL=errorlog
```

### Deploy:
4. Click "Create Web Service"
5. Wait for deployment (~5-10 minutes)

## 4. Done! 🎉

Visit: `https://your-app-name.onrender.com`

---

**For detailed instructions, see:** `DEPLOYMENT_GUIDE.md`
