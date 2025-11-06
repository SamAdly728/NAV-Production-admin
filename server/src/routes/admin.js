const express = require('express');
const router = express.Router();
const { prisma } = require('../config');
const { authenticate, requireRole } = require('../middleware/auth');

// All routes under /api/admin are protected and require admin role
router.use(authenticate, requireRole('admin'));

// GET /api/admin/clients - list users (clients)
router.get('/clients', async (req, res) => {
  try {
    const users = await prisma.user.findMany({ select: { id: true, email: true, name: true, role: true, createdAt: true } });
    res.json({ users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

// GET /api/admin/orders - list orders
router.get('/orders', async (req, res) => {
  try {
    const orders = await prisma.order.findMany({ include: { media: true } , orderBy: { createdAt: 'desc' } });
    res.json({ orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

module.exports = router;
