const express = require('express');
const { authenticate } = require('../middleware/auth');
const { prisma } = require('../config');

const router = express.Router();

// GET /api/client/bookings - bookings for current user
router.get('/bookings', authenticate, async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      where: { clientId: req.user.id },
      include: { service: true, order: true }
    });
    const out = bookings.map(b => ({ id: b.id, scheduledAt: b.scheduledAt, location: b.location, notes: b.notes, status: b.status, serviceName: b.service ? b.service.name : null, orderId: b.orderId }));
    res.json(out);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'server error' });
  }
});

// GET /api/client/orders - orders for current user
router.get('/orders', authenticate, async (req, res) => {
  try {
    const orders = await prisma.order.findMany({ where: { clientId: req.user.id }, include: { media: true } });
    res.json(orders);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'server error' });
  }
});

module.exports = router;
