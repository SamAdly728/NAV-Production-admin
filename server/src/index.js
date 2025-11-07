const express = require('express');
const cors = require('cors');
const bodyParser = require('express').json;
const path = require('path');
const { PORT, prisma } = require('./config');

const authRoutes = require('./routes/auth');
const healthRoutes = require('./routes/health');
const mediaRoutes = require('./routes/media');
const paymentsRoutes = require('./routes/payments');
const adminRoutes = require('./routes/admin');
const { authenticate } = require('./middleware/auth');

const app = express();

app.use(cors());
app.use(bodyParser());

// Resolve template directory from several likely locations (Render may set different workdir layouts)
const fs = require('fs');
const candidates = [
  path.join(__dirname, '..', '..', 'template'), // projectRoot/template (expected)
  path.join(__dirname, '..', 'template'), // server/template (older layout)
  path.join(process.cwd(), 'template'), // cwd/template
  path.join(__dirname, '..', '..', '..', 'template') // one more up
];
let templateDir = candidates.find(d => {
  try { return fs.existsSync(d); } catch (e) { return false; }
});
if (!templateDir) templateDir = candidates[0];
console.log('Template directory candidates:', candidates);
console.log('Using templateDir:', templateDir, 'exists:', fs.existsSync(templateDir));

// Protect admin template pages: require admin auth for any /admin_*.html or /admin/* routes
app.get(['/admin_*.html', '/admin/*'], authenticate, (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') return res.status(403).send('Forbidden');
  // serve the requested file from templateDir
  const reqPath = req.path.replace(/^\//, '');
  const filePath = path.join(templateDir, reqPath);
  return res.sendFile(filePath, (err) => {
    if (err) next(err);
  });
});

// Serve static assets and template pages
app.use(express.static(templateDir));

// API routes
app.use('/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/payments', paymentsRoutes);
app.use('/api/admin', adminRoutes);
// client routes
const clientRoutes = require('./routes/client');
app.use('/api/client', clientRoutes);

// Serve the main UI at the root so visitors see the template
app.get('/', (req, res) => res.sendFile(path.join(templateDir, 'index.html')));

// A simple route to serve index.html from template
app.get('/app', (req, res) => res.sendFile(path.join(templateDir, 'index.html')));

// Debug endpoints to help diagnose live-site blank pages
const fs = require('fs');
app.get('/_status', (req, res) => {
  try {
    const exists = fs.existsSync(templateDir);
    const indexExists = fs.existsSync(path.join(templateDir, 'index.html'));
    res.json({ ok: true, templateDir, exists, indexExists });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.get('/_debug', (req, res) => {
  // minimal debug page with links to key pages/assets so you can click from the deployed site
  res.send(`<!doctype html><html><head><meta charset="utf-8"><title>Debug</title></head><body>
    <h2>Debug links</h2>
    <ul>
      <li><a href="/">/ (index)</a></li>
      <li><a href="/sign_in.html">/sign_in.html</a></li>
      <li><a href="/client_dashboard.html">/client_dashboard.html</a></li>
      <li><a href="/admin_orders.html">/admin_orders.html</a></li>
      <li><a href="/assets/css/style.css">/assets/css/style.css</a></li>
      <li><a href="/assets/js/script.js">/assets/js/script.js</a></li>
    </ul>
    <p>Open the browser console/network and click each link; copy any 404s or errors and paste here.</p>
  </body></html>`);
});

// Basic error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'internal server error' });
});

async function main() {
  const port = PORT || 3000;
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
