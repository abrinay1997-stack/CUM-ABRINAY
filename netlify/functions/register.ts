import type { Handler } from "@netlify/functions";
import { getStore } from "@netlify/blobs";
import { Resend } from "resend";

interface Registration {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

const resend = new Resend(process.env.RESEND_API_KEY);

const userEmailHtml = (name: string) => `
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  body { margin:0; padding:0; background:#050505; font-family:'Helvetica Neue',Arial,sans-serif; color:#e0e0e0; }
  .wrap { max-width:520px; margin:40px auto; border:1px solid rgba(0,243,255,0.2); border-radius:16px; overflow:hidden; }
  .header { background:linear-gradient(135deg,#0a0a0a 0%,#1a0a2e 100%); padding:48px 32px 40px; text-align:center; border-bottom:1px solid rgba(188,19,254,0.25); }
  .eyebrow { color:#00f3ff; font-size:10px; letter-spacing:.5em; text-transform:uppercase; margin:0 0 12px; }
  .logo { font-size:52px; font-weight:900; color:#fff; margin:0 0 4px; letter-spacing:.05em; }
  .badge { display:inline-block; background:rgba(0,243,255,.08); border:1px solid rgba(0,243,255,.5); color:#00f3ff; font-size:9px; letter-spacing:.35em; padding:5px 14px; border-radius:100px; margin-top:16px; text-transform:uppercase; }
  .body { background:#0a0a0a; padding:36px 32px; }
  .status { background:rgba(0,243,255,.04); border:1px solid rgba(0,243,255,.15); border-radius:12px; padding:24px; text-align:center; margin-bottom:28px; }
  .status-label { color:#555; font-size:10px; letter-spacing:.4em; text-transform:uppercase; margin:0 0 6px; }
  .status-name { color:#fff; font-size:22px; font-weight:700; margin:0; letter-spacing:.05em; }
  table { width:100%; border-collapse:collapse; }
  td { padding:13px 0; border-bottom:1px solid rgba(255,255,255,.05); font-size:13px; }
  td:last-child { border-bottom:none; }
  .lbl { color:#555; text-transform:uppercase; letter-spacing:.12em; font-size:11px; }
  .val { color:#fff; font-weight:600; text-align:right; }
  .note { margin-top:28px; padding:16px; background:rgba(255,0,255,.04); border-left:2px solid #ff00ff; border-radius:0 8px 8px 0; }
  .note p { margin:0; font-size:12px; color:#888; line-height:1.6; }
  .footer { background:#050505; padding:24px 32px; text-align:center; border-top:1px solid rgba(255,255,255,.04); }
  .footer p { margin:0; color:#333; font-size:11px; letter-spacing:.05em; }
</style>
</head>
<body>
<div class="wrap">
  <div class="header">
    <p class="eyebrow">ABRINAY PRESENTS</p>
    <p class="logo">LICENCIA P</p>
    <div class="badge">✓ ACCESO CONCEDIDO</div>
  </div>
  <div class="body">
    <div class="status">
      <p class="status-label">Usuario verificado</p>
      <p class="status-name">${name}</p>
    </div>
    <table>
      <tr>
        <td class="lbl">Fecha</td>
        <td class="val">7 de Marzo, 2026</td>
      </tr>
      <tr>
        <td class="lbl">Lugar</td>
        <td class="val">Vía Argentina, Panamá</td>
      </tr>
      <tr>
        <td class="lbl">Dress Code</td>
        <td class="val">CYBERPUNK SEXY</td>
      </tr>
      <tr>
        <td class="lbl">Acceso</td>
        <td class="val">Lista VIP · +18</td>
      </tr>
    </table>
    <div class="note">
      <p>Guarda este correo — será tu pase de entrada. Más detalles de ubicación exacta serán enviados próximos al evento.</p>
    </div>
  </div>
  <div class="footer">
    <p>LICENCIA P &nbsp;·&nbsp; 7 MAR 2026 &nbsp;·&nbsp; PTY</p>
  </div>
</div>
</body>
</html>
`;

const adminEmailHtml = (name: string, email: string, total: number) => `
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<style>
  body { margin:0; padding:0; background:#050505; font-family:'Helvetica Neue',Arial,sans-serif; color:#e0e0e0; }
  .wrap { max-width:480px; margin:40px auto; border:1px solid rgba(188,19,254,0.3); border-radius:12px; overflow:hidden; }
  .header { background:#0a0a0a; padding:24px 28px; border-bottom:1px solid rgba(188,19,254,0.15); }
  .header p { margin:0; font-size:11px; color:#bc13fe; letter-spacing:.4em; text-transform:uppercase; }
  .body { background:#0d0d0d; padding:28px; }
  .row { display:flex; justify-content:space-between; padding:10px 0; border-bottom:1px solid rgba(255,255,255,.05); font-size:13px; }
  .row:last-child { border-bottom:none; }
  .lbl { color:#555; text-transform:uppercase; font-size:11px; letter-spacing:.1em; }
  .val { color:#fff; font-weight:600; }
  .total { margin-top:20px; text-align:center; color:#666; font-size:11px; letter-spacing:.2em; text-transform:uppercase; }
</style>
</head>
<body>
<div class="wrap">
  <div class="header"><p>LICENCIA P — NUEVO REGISTRO</p></div>
  <div class="body">
    <div class="row"><span class="lbl">Nombre</span><span class="val">${name}</span></div>
    <div class="row"><span class="lbl">Email</span><span class="val">${email}</span></div>
    <div class="row"><span class="lbl">Fecha</span><span class="val">${new Date().toLocaleString("es-PA", { timeZone: "America/Panama" })}</span></div>
    <p class="total">Total registrados: ${total}</p>
  </div>
</div>
</body>
</html>
`;

const handler: Handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  let name: string, email: string;
  try {
    ({ name, email } = JSON.parse(event.body || "{}"));
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Invalid JSON" }) };
  }

  if (!name?.trim() || !email?.trim()) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Name and email are required" }) };
  }

  // Save to Netlify Blobs
  const store = getStore({
    name: "registrations",
    consistency: "strong",
    siteID: process.env.NETLIFY_SITE_ID!,
    token: process.env.NETLIFY_TOKEN!,
  });
  const existing: Registration[] = (await store.get("all", { type: "json" })) ?? [];

  const newReg: Registration = {
    id: Date.now().toString(),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    createdAt: new Date().toISOString(),
  };

  const updated = [newReg, ...existing];
  await store.setJSON("all", updated);

  // Send emails (awaited so Lambda doesn't terminate before they're sent)
  const emailResults = await Promise.allSettled([
    resend.emails.send({
      from: "LICENCIA P <onboarding@resend.dev>",
      to: newReg.email,
      subject: "ACCESO CONCEDIDO — LICENCIA P · 7 MAR 2026",
      html: userEmailHtml(newReg.name),
    }),
    resend.emails.send({
      from: "LICENCIA P <onboarding@resend.dev>",
      to: process.env.ADMIN_EMAIL!,
      subject: `[LP] Nuevo registro: ${newReg.name}`,
      html: adminEmailHtml(newReg.name, newReg.email, updated.length),
    }),
  ]);
  emailResults.forEach((r) => {
    if (r.status === "rejected") console.error("Email error:", r.reason);
    if (r.status === "fulfilled" && r.value.error) console.error("Email error:", r.value.error);
  });

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ id: newReg.id, name: newReg.name }),
  };
};

export { handler };
