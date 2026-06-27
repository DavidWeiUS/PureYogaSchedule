require('dotenv').config();
const express = require('express');
const fetch   = (...args) => import('node-fetch').then(({ default: f }) => f(...args));
const path    = require('path');
const crypto  = require('crypto');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Auth config ──────────────────────────────────────────────────
const ACCESS_PASSWORD = process.env.ACCESS_PASSWORD || 'yoga2026';
const validTokens = new Set();

function getCookie(req, name) {
  const raw = req.headers.cookie || '';
  const pair = raw.split(';').map(c => c.trim()).find(c => c.startsWith(name + '='));
  return pair ? decodeURIComponent(pair.slice(name.length + 1)) : null;
}

function isAuth(req) {
  const t = getCookie(req, 'py_token');
  return t && validTokens.has(t);
}

function authGuard(req, res, next) {
  if (req.path === '/login' || req.path === '/login.html') return next();
  if (!isAuth(req)) {
    return req.method === 'GET'
      ? res.redirect('/login.html')
      : res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

// ── Auth routes ──────────────────────────────────────────────────
app.post('/login', (req, res) => {
  if (req.body.password === ACCESS_PASSWORD) {
    const token   = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString();
    validTokens.add(token);
    res.setHeader('Set-Cookie',
      `py_token=${token}; Path=/; HttpOnly; Expires=${expires}; SameSite=Strict`);
    return res.redirect('/');
  }
  res.redirect('/login.html?error=1');
});

app.get('/logout', (req, res) => {
  const t = getCookie(req, 'py_token');
  if (t) validTokens.delete(t);
  res.setHeader('Set-Cookie', 'py_token=; Path=/; HttpOnly; Max-Age=0');
  res.redirect('/login.html');
});

// ── Protected static files & API ────────────────────────────────
app.use(authGuard);
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/generate', async (req, res) => {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'API key not configured' });
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(req.body)
    });
    res.json(await response.json());
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Request failed' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`PureYoga server on http://localhost:${PORT}`));
