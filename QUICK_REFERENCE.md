# 🚀 Quick Reference Card

## Your Project URLs

🏠 **Local:** http://localhost/nav/public
🌐 **Production:** https://nav-production-admin.onrender.com

---

## Daily Workflow (3 Steps)

### 1️⃣ Work Locally
```powershell
cd c:\xampp\htdocs\NAV
# Make your changes
# Test at http://localhost/nav/public
```

### 2️⃣ Test & Build
```powershell
npm run build          # Build assets
php artisan migrate    # If database changed
# Test everything works locally
```

### 3️⃣ Deploy to Production
```powershell
git add .
git commit -m "Describe your changes"
git push origin main
# Wait 5-10 minutes, check https://nav-production-admin.onrender.com
```

---

## Google OAuth Setup (ONE TIME)

Add these redirect URIs to your Google Console:
```
http://localhost/nav/auth/google/callback
https://nav-production-admin.onrender.com/auth/google/callback
```

👉 https://console.cloud.google.com/apis/credentials

---

## File Differences

| File | Purpose | Committed? |
|------|---------|-----------|
| `.env` | Local config (MySQL) | ❌ NO |
| `.env.example` | Production template | ✅ YES |

**Important:** Never commit `.env` file!

---

## Troubleshooting

### Local not working?
```powershell
php artisan cache:clear
php artisan config:clear
npm run build
```

### Production not deploying?
1. Check GitHub: https://github.com/SamAdly728/NAV-Production-admin
2. Check Render Dashboard: https://dashboard.render.com
3. Check Render Logs

---

## Essential Commands

```powershell
# Development server (hot reload)
npm run dev

# Build for production
npm run build

# Database migrations
php artisan migrate

# Clear cache
php artisan cache:clear

# Git workflow
git add .
git commit -m "message"
git push origin main
```

---

## Support Documents

📖 **LOCAL_DEVELOPMENT_WORKFLOW.md** - Full local dev guide
📖 **DEPLOYMENT_GUIDE.md** - Deployment instructions
📖 **GIT_COMMANDS.md** - Git reference

---

**🎯 Remember:** Test local → Push to GitHub → Auto-deploys to Render!
