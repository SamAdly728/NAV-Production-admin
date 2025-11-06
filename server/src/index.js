const express = require('express');
const cors = require('cors');
const bodyParser = require('express').json;
const { PORT, prisma } = require('./config');

const authRoutes = require('./routes/auth');
const healthRoutes = require('./routes/health');
const mediaRoutes = require('./routes/media');
const paymentsRoutes = require('./routes/payments');
const adminRoutes = require('./routes/admin');

const app = express();

app.use(cors());
app.use(bodyParser());

app.get('/', (req, res) => res.send('NAV Productions API'));
app.use('/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/payments', paymentsRoutes);
app.use('/api/admin', adminRoutes);

// Serve the admin template statically from the template folder
const path = require('path');
const templateDir = path.join(__dirname, '..', 'template');
app.use(express.static(templateDir));

// A simple route to serve index.html from template
app.get('/app', (req, res) => res.sendFile(path.join(templateDir, 'index.html')));

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
