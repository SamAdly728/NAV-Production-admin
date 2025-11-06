const path = require('path');
const fs = require('fs');

// Decide provider: explicit env STORAGE_PROVIDER (s3|dropbox) or detect by env vars
const provider = (process.env.STORAGE_PROVIDER || (process.env.DROPBOX_ACCESS_TOKEN ? 'dropbox' : (process.env.S3_BUCKET ? 's3' : ''))).toLowerCase();

async function uploadBufferToDropbox(buffer, filename, mimetype) {
  if (!process.env.DROPBOX_ACCESS_TOKEN) throw new Error('DROPBOX_ACCESS_TOKEN not set');
  const token = process.env.DROPBOX_ACCESS_TOKEN;
  const uploadPath = `/nav_media/${Date.now()}_${path.basename(filename)}`;

  // Upload file bytes
  const res = await fetch('https://content.dropboxapi.com/2/files/upload', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/octet-stream',
      'Dropbox-API-Arg': JSON.stringify({ path: uploadPath, mode: 'add', autorename: true, mute: false }),
    },
    body: buffer,
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error('Dropbox upload failed: ' + res.status + ' ' + txt);
  }
  const j = await res.json();

  // Create a shared link so the file is accessible via URL
  const shareRes = await fetch('https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ path: j.path_lower }),
  });

  if (!shareRes.ok) {
    const txt = await shareRes.text();
    throw new Error('Dropbox share failed: ' + shareRes.status + ' ' + txt);
  }
  const sj = await shareRes.json();

  // Convert the Dropbox sharing URL to a direct-download link (dl=1)
  let url = sj.url || '';
  if (url.includes('?')) url = url.replace(/\?.*$/, '?dl=1'); else url = url + '?dl=1';
  return url;
}

// If S3 helpers exist, reuse them
let uploadBuffer;
if (provider === 's3') {
  try {
    const s3mod = require('./s3');
    uploadBuffer = s3mod.uploadBuffer;
  } catch (e) {
    console.warn('S3 provider requested but ./s3 helper not found or failed to load:', e.message || e);
  }
} else if (provider === 'dropbox') {
  uploadBuffer = uploadBufferToDropbox;
}

module.exports = { provider, uploadBuffer };
