// Vercel serverless function — contact form handler
// Sends to kaysawatsky@outlook.com via Resend
//
// Setup:
//   1. Sign up at resend.com (free — 3,000 emails/month)
//   2. Add a sending domain OR use onboarding@resend.dev for testing
//   3. In Vercel dashboard → Project → Settings → Environment Variables:
//      Add  RESEND_API_KEY = re_xxxxxxxxxxxx
//      Add  FROM_EMAIL = noreply@yourdomain.com  (or leave unset to use Resend default)

const TO_EMAIL = 'kaysawatsky@outlook.com';
const FROM_NAME = 'Beyond the Call';
const FROM_FALLBACK = 'onboarding@resend.dev';

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildHtml(name, email, role, message) {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f8f6f2;font-family:'Inter',Arial,sans-serif;">
  <div style="max-width:600px;margin:40px auto;background:#ffffff;border-top:4px solid #c19a6b;">
    <div style="padding:32px 40px 0;">
      <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#c19a6b;font-weight:600;">Beyond the Call</p>
      <h1 style="margin:0 0 24px;font-size:22px;color:#11181c;font-weight:600;">New Contact Message</h1>
    </div>
    <div style="padding:0 40px;">
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr style="border-bottom:1px solid #e6dfd2;">
          <td style="padding:12px 0;color:#888;width:80px;vertical-align:top;">Name</td>
          <td style="padding:12px 0;color:#11181c;font-weight:500;">${escapeHtml(name)}</td>
        </tr>
        <tr style="border-bottom:1px solid #e6dfd2;">
          <td style="padding:12px 0;color:#888;vertical-align:top;">Email</td>
          <td style="padding:12px 0;">
            <a href="mailto:${escapeHtml(email)}" style="color:#c19a6b;text-decoration:none;">${escapeHtml(email)}</a>
          </td>
        </tr>
        <tr style="border-bottom:1px solid #e6dfd2;">
          <td style="padding:12px 0;color:#888;vertical-align:top;">Role</td>
          <td style="padding:12px 0;color:#11181c;">${escapeHtml(role || 'Not specified')}</td>
        </tr>
      </table>
      <div style="margin:24px 0;padding:20px 24px;background:#f8f6f2;border-left:3px solid #c19a6b;">
        <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#888;">Message</p>
        <p style="margin:0;font-size:15px;color:#1a2429;line-height:1.7;white-space:pre-wrap;">${escapeHtml(message)}</p>
      </div>
      <a href="mailto:${escapeHtml(email)}"
         style="display:inline-block;margin-bottom:32px;padding:12px 28px;background:#c19a6b;color:#11181c;text-decoration:none;font-size:13px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;">
        Reply to ${escapeHtml(name)}
      </a>
    </div>
    <div style="padding:20px 40px;background:#11181c;">
      <p style="margin:0;font-size:12px;color:rgba(241,236,226,0.4);">
        Beyond the Call &middot; beyondthecallco@gmail.com
      </p>
    </div>
  </div>
</body>
</html>`;
}

module.exports = async function handler(req, res) {
  // CORS preflight
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, email, role, message } = req.body || {};

  // Validate
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }
  if (message.trim().length < 10) {
    return res.status(400).json({ error: 'Message is too short.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY not set');
    return res.status(503).json({ error: 'Email service not configured. Please contact beyondthecallco@gmail.com directly.' });
  }

  const fromEmail = process.env.FROM_EMAIL || FROM_FALLBACK;
  const from = `${FROM_NAME} <${fromEmail}>`;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [TO_EMAIL],
        reply_to: email.trim(),
        subject: `New message from ${name.trim()}`,
        html: buildHtml(name.trim(), email.trim(), role, message.trim()),
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Resend error:', response.status, err);
      return res.status(502).json({ error: 'Failed to send. Please email us directly at beyondthecallco@gmail.com' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Contact handler error:', err);
    return res.status(500).json({ error: 'Server error. Please email beyondthecallco@gmail.com directly.' });
  }
};
