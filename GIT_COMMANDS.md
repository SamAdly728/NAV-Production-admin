# Git Commands for Deployment

## First Time Setup

### 1. Initialize Git Repository
```powershell
cd c:\xampp\htdocs\NAV
git init
git branch -M main
```

### 2. Add All Files
```powershell
git add .
```

### 3. Create First Commit
```powershell
git commit -m "Initial commit - NAV Admin Panel for production deployment"
```

### 4. Connect to GitHub
```powershell
git remote add origin https://github.com/SamAdly728/NAV-Production-admin.git
```

### 5. Push to GitHub
```powershell
git push -u origin main
```

**Note:** If you get authentication errors, you may need to use a Personal Access Token:
- Go to GitHub → Settings → Developer settings → Personal access tokens → Generate new token
- Use the token as your password when pushing

---

## Future Updates

### To deploy changes to production:

```powershell
# 1. Check what files changed
git status

# 2. Add all changed files
git add .

# Or add specific files only
git add path/to/file.php

# 3. Commit with a descriptive message
git commit -m "Description of your changes"

# 4. Push to GitHub (Render will auto-deploy)
git push origin main
```

---

## Useful Git Commands

### Check current status
```powershell
git status
```

### View commit history
```powershell
git log --oneline
```

### View differences before committing
```powershell
git diff
```

### Undo local changes (before commit)
```powershell
git checkout -- filename.php
```

### Create a new branch for testing
```powershell
git checkout -b feature-name
```

### Switch back to main branch
```powershell
git checkout main
```

### Pull latest changes from GitHub
```powershell
git pull origin main
```

### View remote repository URL
```powershell
git remote -v
```

---

## Common Scenarios

### Scenario 1: Update a single file
```powershell
# Edit your file
git add path/to/file.php
git commit -m "Updated file.php - fixed bug"
git push origin main
```

### Scenario 2: Add new feature
```powershell
# Add all new files
git add .
git commit -m "Added new feature: user dashboard"
git push origin main
```

### Scenario 3: Update environment variables
```powershell
# Update .env.example (never commit .env)
git add .env.example
git commit -m "Updated environment configuration"
git push origin main
```

### Scenario 4: Update dependencies
```powershell
# After updating composer.json or package.json
git add composer.json package.json
git commit -m "Updated dependencies"
git push origin main
```

---

## Commit Message Best Practices

### Good commit messages:
- ✅ `Added Google OAuth authentication`
- ✅ `Fixed dashboard loading issue`
- ✅ `Updated database configuration for PostgreSQL`
- ✅ `Improved user profile page UI`

### Bad commit messages:
- ❌ `update`
- ❌ `fixes`
- ❌ `changes`
- ❌ `asdf`

### Format:
```
[Type] Short description (50 chars or less)

More detailed explanation if needed (wrap at 72 chars)
```

**Types:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

---

## Emergency Commands

### Undo last commit (keep changes)
```powershell
git reset --soft HEAD~1
```

### Undo last commit (discard changes) ⚠️ DANGEROUS
```powershell
git reset --hard HEAD~1
```

### Force push (if needed) ⚠️ USE WITH CAUTION
```powershell
git push origin main --force
```

---

## Troubleshooting

### Error: "remote origin already exists"
```powershell
git remote remove origin
git remote add origin https://github.com/SamAdly728/NAV-Production-admin.git
```

### Error: "failed to push some refs"
```powershell
git pull origin main --rebase
git push origin main
```

### Error: Authentication failed
Use Personal Access Token instead of password:
1. Generate token: https://github.com/settings/tokens
2. Use token as password when prompted

### Large files causing issues
Add to .gitignore:
```powershell
echo "large-file.zip" >> .gitignore
git rm --cached large-file.zip
git commit -m "Removed large file"
git push origin main
```

---

## Quick Reference

| Command | Description |
|---------|-------------|
| `git status` | Check current status |
| `git add .` | Add all changes |
| `git commit -m "message"` | Commit changes |
| `git push origin main` | Push to GitHub |
| `git pull origin main` | Pull from GitHub |
| `git log` | View history |
| `git diff` | View changes |

---

## Automated Deployment

After pushing to GitHub, Render.com will automatically:
1. Detect the push
2. Pull the latest code
3. Run `build.sh`
4. Restart the application

You can monitor deployment in Render dashboard: https://dashboard.render.com/
