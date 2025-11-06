const express = require('express');
const Stripe = require('stripe');
const { prisma } = require('../config');

const stripe = new Stripe(process.env.STRIPE_SECRET || '', { apiVersion: '2023-08-16' });
const router = express.Router();

// Create Payment Intent for an order
router.post('/create-payment-intent', async (req, res) => {
  try {
    const { orderId } = req.body;
    if (!orderId) return res.status(400).json({ error: 'orderId required' });

    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) return res.status(404).json({ error: 'order not found' });

    const amount = order.totalCents || 0;
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      metadata: { orderId },
    });

    // Save payment intent id to order
    await prisma.order.update({ where: { id: orderId }, data: { stripePaymentIntentId: paymentIntent.id } });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'stripe error' });
  }
});

// Webhook endpoint (stub) - configure webhook secret in STRIPE_WEBHOOK_SECRET
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event;
  try {
    if (webhookSecret) {
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } else {
      // If no webhook secret configured, parse body directly
      event = JSON.parse(req.body.toString());
    }
  } catch (err) {
    console.error('Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const pi = event.data.object;
      const orderId = pi.metadata.orderId;
      if (orderId) {
        prisma.order.update({ where: { id: orderId }, data: { paymentStatus: 'paid' } }).catch(console.error);
      }
      break;
    case 'payment_intent.payment_failed':
      // handle failed
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
});

module.exports = router;
