const express = require('express');
const router = express.Router();
const { prisma } = require('../config');
const { authenticate, requireRole } = require('../middleware/auth');

// All routes under /api/admin are protected and require admin role
router.use(authenticate, requireRole('admin'));

// GET /api/admin/clients - list users (clients)
// GET /api/admin/clients - list users (clients)
// supports ?q=search&page=1&limit=20
router.get('/clients', async (req, res) => {
  try {
    const q = req.query.q || undefined;
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(200, parseInt(req.query.limit) || 50);
    const skip = (page - 1) * limit;

    const where = q
      ? {
          OR: [
            { email: { contains: q, mode: 'insensitive' } },
            { name: { contains: q, mode: 'insensitive' } },
          ],
        }
      : {};

    const [users, total] = await Promise.all([
      prisma.user.findMany({ where, select: { id: true, email: true, name: true, role: true, createdAt: true }, skip, take: limit, orderBy: { createdAt: 'desc' } }),
      prisma.user.count({ where }),
    ]);

    res.json({ users, total, page, limit });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

// GET /api/admin/orders - list orders with optional search & pagination
router.get('/orders', async (req, res) => {
  try {
    const q = req.query.q || undefined;
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(200, parseInt(req.query.limit) || 50);
    const skip = (page - 1) * limit;

    const where = q
      ? {
          OR: [
            { id: { contains: q } },
            { description: { contains: q, mode: 'insensitive' } },
          ],
        }
      : {};

    const [orders, total] = await Promise.all([
      prisma.order.findMany({ where, include: { media: true, client: { select: { id: true, email: true, name: true } } }, orderBy: { createdAt: 'desc' }, skip, take: limit }),
      prisma.order.count({ where }),
    ]);

    res.json({ orders, total, page, limit });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

// GET /api/admin/orders/:id - get single order with media and client
router.get('/orders/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const order = await prisma.order.findUnique({ where: { id }, include: { media: true, client: { select: { id: true, email: true, name: true } } } });
    if (!order) return res.status(404).json({ error: 'not found' });
    res.json({ order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

// PUT /api/admin/orders/:id - update order status (admin only)
router.put('/orders/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;
    if (!status) return res.status(400).json({ error: 'status required' });
    const allowed = ['new', 'in_progress', 'completed', 'cancelled'];
    if (!allowed.includes(status)) return res.status(400).json({ error: 'invalid status' });

    const order = await prisma.order.update({ where: { id }, data: { status } });
    res.json({ order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

module.exports = router;
