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
    const orders = await prisma.order.findMany({ 
      where: { clientId: req.user.id }, 
      include: { 
        media: true,
        project: {
          select: { id: true, title: true, stage: true, progress: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(orders);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'server error' });
  }
});

// GET /api/client/services - list available services
router.get('/services', async (req, res) => {
  try {
    const services = await prisma.service.findMany({
      orderBy: { name: 'asc' }
    });
    res.json({ services });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'server error' });
  }
});

// POST /api/client/bookings - create new booking
router.post('/bookings', authenticate, async (req, res) => {
  try {
    const { serviceId, scheduledAt, location, notes } = req.body;
    
    if (!serviceId || !scheduledAt) {
      return res.status(400).json({ error: 'serviceId and scheduledAt required' });
    }
    
    const booking = await prisma.booking.create({
      data: {
        clientId: req.user.id,
        serviceId,
        scheduledAt: new Date(scheduledAt),
        location,
        notes,
        status: 'scheduled'
      },
      include: { service: true }
    });
    
    res.json({ booking });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'server error' });
  }
});

// GET /api/client/payments - get payments for current user
router.get('/payments', authenticate, async (req, res) => {
  try {
    const payments = await prisma.payment.findMany({
      where: { clientId: req.user.id },
      orderBy: { createdAt: 'desc' }
    });
    res.json({ payments });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'server error' });
  }
});

// POST /api/client/payments - create payment (for adding payment method/making payment)
router.post('/payments', authenticate, async (req, res) => {
  try {
    const { amountCents, paymentMethod, description } = req.body;
    
    if (!amountCents || amountCents <= 0) {
      return res.status(400).json({ error: 'valid amountCents required' });
    }
    
    const payment = await prisma.payment.create({
      data: {
        clientId: req.user.id,
        amountCents,
        currency: 'usd',
        status: 'pending',
        paymentMethod: paymentMethod || 'card',
        description
      }
    });
    
    res.json({ payment });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'server error' });
  }
});

module.exports = router;
