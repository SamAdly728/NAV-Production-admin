# Deployment Checklist ✅

## Before Deployment

### 1. Google OAuth Setup
- [ ] Go to https://console.cloud.google.com/
- [ ] Create OAuth 2.0 Client ID
- [ ] Add redirect URI: `https://your-app-name.onrender.com/auth/google/callback`
- [ ] Save Client ID: `_______________________________________`
- [ ] Save Client Secret: `_______________________________________`

### 2. GitHub Repository
- [ ] Visit: https://github.com/SamAdly728/NAV-Production-admin
- [ ] Delete old repository (Settings → Danger Zone)
- [ ] Create new empty repository with same name

### 3. Local Setup
- [ ] All dependencies installed (`composer install`, `npm install`)
- [ ] `.env.example` updated with production settings
- [ ] All files committed locally

## Deployment Steps

### Step 1: Push to GitHub (5 min)
```powershell
cd c:\xampp\htdocs\NAV
git init
git branch -M main
git add .
git commit -m "Production ready NAV Admin Panel"
git remote add origin https://github.com/SamAdly728/NAV-Production-admin.git
git push -u origin main
```

- [ ] Code pushed to GitHub successfully
- [ ] Repository visible at: https://github.com/SamAdly728/NAV-Production-admin

### Step 2: Deploy on Render.com (10 min)

#### Create Web Service:
- [ ] Login to https://render.com
- [ ] Click "New +" → "Web Service"
- [ ] Connect GitHub repository: `SamAdly728/NAV-Production-admin`
- [ ] Select branch: `main`

#### Configure Service:
- [ ] Name: `nav-admin-panel` (or your choice)
- [ ] Environment: `PHP`
- [ ] Build Command: `./build.sh`
- [ ] Start Command: `php artisan serve --host=0.0.0.0 --port=$PORT`

#### Add Environment Variables:

| Variable | Value | Status |
|----------|-------|--------|
| `APP_NAME` | `NAV Admin` | [ ] |
| `APP_ENV` | `production` | [ ] |
| `APP_DEBUG` | `false` | [ ] |
| `APP_URL` | `https://your-app-name.onrender.com` | [ ] |
| `DB_CONNECTION` | `pgsql` | [ ] |
| `DB_HOST` | `dpg-d465ji4hg0os73ebpqv0-a.oregon-postgres.render.com` | [ ] |
| `DB_PORT` | `5432` | [ ] |
| `DB_DATABASE` | `nav_productions_db` | [ ] |
| `DB_USERNAME` | `nav_productions_db_user` | [ ] |
| `DB_PASSWORD` | `FnndQlTPxlhcnJcMk4hEB537gu12Xkk2` | [ ] |
| `GOOGLE_CLIENT_ID` | [Paste from Google Console] | [ ] |
| `GOOGLE_CLIENT_SECRET` | [Paste from Google Console] | [ ] |
| `SESSION_DRIVER` | `file` | [ ] |
| `CACHE_DRIVER` | `file` | [ ] |
| `LOG_CHANNEL` | `errorlog` | [ ] |

- [ ] Click "Create Web Service"
- [ ] Wait for deployment to complete (~5-10 minutes)

### Step 3: Post-Deployment

- [ ] Note your app URL: `https://__________________.onrender.com`
- [ ] Update Google OAuth redirect URI with production URL
- [ ] Update `APP_URL` in Render environment variables
- [ ] Test application: Visit your app URL
- [ ] Test Google login
- [ ] Check if dashboard loads correctly

## Verification Tests

### After Deployment:
- [ ] Homepage loads: `https://your-app.onrender.com`
- [ ] Login page accessible: `https://your-app.onrender.com/login`
- [ ] Google OAuth works (can login)
- [ ] Dashboard displays after login
- [ ] Profile page works
- [ ] No console errors in browser
- [ ] Database connection working

## Troubleshooting

### If deployment fails:
1. [ ] Check Render logs (Dashboard → Your Service → Logs)
2. [ ] Verify all environment variables are set
3. [ ] Check build.sh has execute permissions
4. [ ] Verify database credentials are correct

### If Google OAuth fails:
1. [ ] Verify redirect URI matches exactly (including https://)
2. [ ] Check Client ID and Secret are correct
3. [ ] Ensure Google OAuth consent screen is configured

### If database connection fails:
1. [ ] Verify PostgreSQL credentials
2. [ ] Check DB_HOST includes full external URL
3. [ ] Ensure migrations ran successfully

## Future Updates

To deploy updates:
```powershell
git add .
git commit -m "Your update message"
git push origin main
```

Render will automatically deploy changes!

---

## Quick Reference

**GitHub Repo:** https://github.com/SamAdly728/NAV-Production-admin

**Database URL:**
```
postgresql://nav_productions_db_user:FnndQlTPxlhcnJcMk4hEB537gu12Xkk2@dpg-d465ji4hg0os73ebpqv0-a.oregon-postgres.render.com/nav_productions_db
```

**Google Console:** https://console.cloud.google.com/

**Render Dashboard:** https://dashboard.render.com/

---

## Notes

**Your App URL:** `https://__________________.onrender.com`

**Google Client ID:** `_________________________________________________`

**Google Client Secret:** `_________________________________________________`

**Deployment Date:** ________________

**Status:** ☐ Pending  ☐ In Progress  ☐ Completed  ☐ Live
