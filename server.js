const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const publicDir = path.join(__dirname, 'public');

const blockedPathPatterns = [
  /^\/\.env(?:\.|\/|$)/i,
  /^\/\.git(?:\/|$)/i,
  /^\/\.aws(?:\/|$)/i,
  /^\/(?:api\/)?\.env(?:\.|\/|$)/i,
  /^\/(?:laravel|vendor|server|home)(?:\/|$)/i,
  /^\/(?:wp-|wordpress|phpmyadmin|pma)(?:\/|$)/i,
  /^\/(?:wp-config\.php|phpinfo(?:\.php)?|info\.php)$/i,
  /^\/(?:config|credentials)\.(?:json|ya?ml|ini|php)$/i
];

app.use((req, res, next) => {
  const pathname = req.path || '/';

  if (blockedPathPatterns.some((pattern) => pattern.test(pathname))) {
    res.set('Cache-Control', 'public, max-age=86400');
    return res.status(404).end();
  }

  return next();
});

app.use(express.static(publicDir, {
  etag: true,
  immutable: true,
  maxAge: '30d',
  setHeaders(res, filePath) {
    if (filePath.endsWith('.html')) {
      res.set('Cache-Control', 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400');
    }
  }
}));

app.get('/', (_req, res) => {
  res.set('Cache-Control', 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400');
  res.sendFile(path.join(publicDir, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Glas Transport running on http://localhost:${PORT}`);
});
