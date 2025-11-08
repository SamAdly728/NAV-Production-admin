const jwt = require('jsonwebtoken');
const { prisma, JWT_SECRET } = require('../config');

async function authenticate(req, res, next) {
  const auth = req.headers.authorization || req.headers.Authorization;
  let token;
  if (auth && auth.startsWith('Bearer ')) {
    token = auth.split(' ')[1];
  } else if (req.cookies && req.cookies.nav_token) {
    token = req.cookies.nav_token;
  } else if (req.headers.cookie && req.headers.cookie.includes('nav_token=')) {
    // fallback: parse cookie header for nav_token
    const m = req.headers.cookie.split(';').map(s=>s.trim()).find(s=>s.startsWith('nav_token='));
    if (m) token = m.split('=')[1];
  }
  if (!token) return res.status(401).json({ error: 'missing token' });
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const user = await prisma.user.findUnique({ where: { id: payload.sub } });
    if (!user) return res.status(401).json({ error: 'invalid token' });
    req.user = { id: user.id, email: user.email, name: user.name, role: user.role };
    next();
  } catch (err) {
    console.error('auth error', err.message);
    return res.status(401).json({ error: 'invalid token' });
  }
}

// Middleware for HTML pages - redirects to login instead of JSON error
async function authenticateHTML(req, res, next) {
  const auth = req.headers.authorization || req.headers.Authorization;
  let token;
  if (auth && auth.startsWith('Bearer ')) {
    token = auth.split(' ')[1];
  } else if (req.cookies && req.cookies.nav_token) {
    token = req.cookies.nav_token;
  } else if (req.headers.cookie && req.headers.cookie.includes('nav_token=')) {
    // fallback: parse cookie header for nav_token
    const m = req.headers.cookie.split(';').map(s=>s.trim()).find(s=>s.startsWith('nav_token='));
    if (m) token = m.split('=')[1];
  }
  if (!token) return res.redirect('/sign_in.html');
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const user = await prisma.user.findUnique({ where: { id: payload.sub } });
    if (!user) return res.redirect('/sign_in.html');
    req.user = { id: user.id, email: user.email, name: user.name, role: user.role };
    next();
  } catch (err) {
    console.error('auth error', err.message);
    return res.redirect('/sign_in.html');
  }
}

function requireRole(role) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'not authenticated' });
    if (req.user.role !== role) return res.status(403).json({ error: 'forbidden' });
    next();
  };
}

module.exports = { authenticate, authenticateHTML, requireRole };
