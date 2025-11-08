# 🚀 Deployment Instructions for Render

## Current Issues Fixed

### ✅ Authentication & Redirects
- **Issue**: Going to https://nav-production-admin.onrender.com/ showed dashboard without login
- **Fix**: Root `/` now redirects to `/sign_in.html`
- **Fix**: All protected pages now redirect to login if not authenticated (instead of JSON errors)
- **Fix**: Admin login redirects to `/index.html` (not `/admin_orders.html`)

### ✅ Logo Spacing
- **Issue**: Large space below logo on index.html
- **Fix**: Added custom CSS rules to remove extra margins/padding
- **Fix**: Applied to all pages via custom.css

### ✅ Login Errors
- **Issue**: "Server error" when logging in
- **Fix**: Added cookie-parser middleware
- **Fix**: Created database seed script with test users
- **Fix**: Enhanced authentication middleware

## 🔧 Render Configuration Required

### 1. Update Build Command
In your Render dashboard, update the **Build Command** to:
```bash
cd server && chmod +x build.sh && ./build.sh
```

**OR** use this simpler version:
```bash
cd server && npm install && npx prisma generate && npx prisma migrate deploy && npm run seed
```

### 2. Start Command (should already be set)
```bash
cd server && npm start
```

### 3. Environment Variables
Ensure these are set in Render:
```
DATABASE_URL=postgresql://nav_productions_db_user:FnndQlTPxlhcnJcMk4hEB537gu12Xkk2@dpg-d465ji4hg0os73ebpqv0-a.oregon-postgres.render.com/nav_productions_db
JWT_SECRET=vZ8q9YwPz7s4K1bR6xN0eF3uT2mH5cV9aQ7rL0pS
NODE_ENV=production
PORT=3000
ADMIN_EMAIL=admin@nav-productions.com
ADMIN_PASSWORD=StrongAdmin!234
```

## 📝 Manual Deployment Steps (if build script fails)

If the automatic build fails, you can manually run these commands via Render Shell:

```bash
# 1. Navigate to server directory
cd server

# 2. Install dependencies
npm install

# 3. Generate Prisma client
npx prisma generate

# 4. Run migrations
npx prisma migrate deploy

# 5. Seed database (creates users and services)
npm run seed

# 6. Restart the service
# (Do this from Render dashboard: Manual Deploy > Clear build cache & deploy)
```

## 🧪 Test Credentials

After deployment, test with these credentials at:
https://nav-production-admin.onrender.com/sign_in.html

### Admin User
- **Email**: admin@nav-productions.com
- **Password**: StrongAdmin!234
- **Redirect**: /index.html (admin dashboard)

### Client Users
1. **Alice Johnson**
   - Email: alice@example.com
   - Password: alicepass
   - Redirect: /client_dashboard.html

2. **Bob Smith**
   - Email: bob@example.com
   - Password: bobpass
   - Redirect: /client_dashboard.html

## 🔍 Verification Steps

1. **Test Root Redirect**:
   - Visit: https://nav-production-admin.onrender.com/
   - Expected: Redirects to /sign_in.html

2. **Test Protected Page Without Login**:
   - Visit: https://nav-production-admin.onrender.com/index.html
   - Expected: Redirects to /sign_in.html

3. **Test Admin Login**:
   - Login with admin credentials
   - Expected: Redirects to /index.html
   - Check: Logo has no excessive spacing

4. **Test Client Login**:
   - Login with alice@example.com
   - Expected: Redirects to /client_dashboard.html

5. **Test Footer**:
   - Scroll down on any page
   - Expected: Footer is not sticky (moves with content)

## 🐛 Troubleshooting

### Issue: "Server error" on login
**Check:**
1. Database is accessible (check DATABASE_URL in env vars)
2. Migrations ran successfully (check build logs)
3. Seed script ran (check for "Seeding complete!" in logs)
4. cookie-parser is installed (check package.json dependencies)

**Solution:**
```bash
# In Render Shell:
cd server
npm run seed
```

### Issue: Still showing old behavior
**Check:**
1. Render deployed the latest commit (check commit hash)
2. Clear browser cache and cookies
3. Check Render logs for any startup errors

**Solution:**
- Trigger manual deploy in Render
- Clear build cache before deploying

### Issue: Logo spacing still wrong
**Check:**
1. custom.css is loaded (view page source, check for `/assets/css/custom.css`)
2. Browser cache cleared

**Solution:**
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

## 📊 Database Schema

The seed script creates:

### Users
- 1 Admin user (role: "admin")
- 2 Client users (role: "client")

### Services
- Event Production ($1,500)
- Video Production ($2,000)
- Photography ($1,000)
- Aerial Media (Drone) ($1,250)
- Social Media Content ($750)

## 🔄 Redeployment

After pushing changes to GitHub:
1. Render will auto-deploy (if auto-deploy is enabled)
2. Build command will run migrations and seeding
3. Service will restart automatically

**Manual Deploy:**
- Go to Render Dashboard
- Click "Manual Deploy"
- Select "Clear build cache & deploy" if you updated dependencies

## 📞 Support

If issues persist:
1. Check Render logs: Dashboard > Logs
2. Check build logs for errors during migration/seeding
3. Verify all environment variables are set correctly
4. Try deploying from a clean state (clear cache)

## ✅ Success Indicators

When everything is working correctly:
- ✅ Root (/) redirects to login
- ✅ Protected pages redirect to login when not authenticated
- ✅ Admin can login and access /index.html
- ✅ Clients can login and access /client_dashboard.html
- ✅ Logo has no excessive spacing on all pages
- ✅ Footer scrolls with content (not sticky)
- ✅ All 3 test accounts can login successfully
