const express = require('express');
const multer = require('multer');
const { uploadBuffer, s3 } = require('../s3');
const { prisma } = require('../config');
const { authenticate } = require('../middleware/auth');

const upload = multer();
const router = express.Router();

// POST /api/media/upload - multipart form 'file' and optional orderId
// Requires authentication. If `orderId` is provided, only the order owner or an admin may attach media.
router.post('/upload', authenticate, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'file required' });

    const { originalname, buffer, mimetype } = req.file;
  // Accept orderId from form body or an X-Order-Id header (helps some clients)
  const { kind } = req.body;
  const orderId = req.body.orderId || req.headers['x-order-id'];

    // If an orderId was provided, ensure the user owns the order or is an admin
    console.log('media.upload called; orderId=', orderId, 'user=', req.user && req.user.id);
    if (orderId) {
      const order = await prisma.order.findUnique({ where: { id: orderId } });
      console.log('found order for id=', orderId, '->', !!order);
      if (!order) return res.status(400).json({ error: 'invalid orderId' });
      if (order.clientId !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({ error: 'not authorized to attach media to this order' });
      }
    }

    let url;
    console.log('proceeding to upload to S3? s3=', !!s3);
    if (s3) {
      url = await uploadBuffer(buffer, originalname, mimetype);
    } else {
      return res.status(500).json({ error: 'S3 not configured; set S3_* env vars' });
    }
    const media = await prisma.media.create({
      data: {
        url,
        kind: kind || (mimetype.startsWith('image/') ? 'image' : 'other'),
        order: orderId ? { connect: { id: orderId } } : undefined,
      },
    });

    res.json({ media });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'upload error' });
  }
});

module.exports = router;
