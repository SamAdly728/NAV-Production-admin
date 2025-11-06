const express = require('express');
const multer = require('multer');
const { uploadBuffer, s3 } = require('../s3');
const { prisma } = require('../config');

const upload = multer();
const router = express.Router();

// POST /api/media/upload - multipart form 'file' and optional orderId
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'file required' });

    const { originalname, buffer, mimetype } = req.file;
    let url;
    if (s3) {
      url = await uploadBuffer(buffer, originalname, mimetype);
    } else {
      return res.status(500).json({ error: 'S3 not configured; set S3_* env vars' });
    }

    const { orderId, kind } = req.body;
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
