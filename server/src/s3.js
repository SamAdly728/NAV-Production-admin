const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const crypto = require('crypto');

const REGION = process.env.S3_REGION;
const BUCKET = process.env.S3_BUCKET;

let s3 = null;
if (process.env.S3_ACCESS_KEY_ID && process.env.S3_SECRET_ACCESS_KEY && REGION) {
  s3 = new S3Client({
    region: REGION,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });
}

async function uploadBuffer(buffer, filename, contentType) {
  if (!s3) throw new Error('S3 not configured');
  const key = `${Date.now()}-${crypto.randomBytes(6).toString('hex')}-${filename}`;
  const cmd = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: buffer,
    ContentType: contentType,
  });
  await s3.send(cmd);
  // Return public URL (assuming bucket is public or behind CDN). Adjust as needed.
  return `https://${BUCKET}.s3.${REGION}.amazonaws.com/${key}`;
}

module.exports = { uploadBuffer, s3 };
