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
<html lang="es" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="color-scheme" content="dark">
<meta name="supported-color-schemes" content="dark">
<title>LICENCIA P</title>
</head>
<body style="margin:0;padding:0;background-color:#050505;" bgcolor="#050505">
<!-- outer wrapper: fills full width on desktop -->
<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#050505" style="background-color:#050505;min-height:100%;">
  <tr>
    <td align="center" bgcolor="#050505" style="background-color:#050505;padding:40px 16px;">
      <!-- card -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:520px;border:1px solid #0d3d3d;border-radius:16px;overflow:hidden;">
        <!-- HEADER -->
        <tr>
          <td align="center" bgcolor="#0d0820" style="background-color:#0d0820;padding:48px 32px 40px;border-bottom:1px solid #2a0040;">
            <p style="margin:0 0 12px;color:#00f3ff;font-size:10px;letter-spacing:.5em;text-transform:uppercase;font-family:'Helvetica Neue',Arial,sans-serif;">ABRINAY PRESENTS</p>
            <p style="margin:0 0 4px;font-size:52px;font-weight:900;color:#ffffff;letter-spacing:.05em;font-family:'Helvetica Neue',Arial,sans-serif;">LICENCIA P</p>
            <table cellpadding="0" cellspacing="0" border="0" style="margin:16px auto 0;">
              <tr>
                <td style="background-color:#001a1a;border:1px solid #00f3ff;border-radius:100px;padding:5px 18px;">
                  <span style="color:#00f3ff;font-size:9px;letter-spacing:.35em;text-transform:uppercase;font-family:'Helvetica Neue',Arial,sans-serif;font-weight:700;">&#10003; ACCESO CONCEDIDO</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- BODY -->
        <tr>
          <td bgcolor="#0a0a0a" style="background-color:#0a0a0a;padding:36px 32px;">
            <!-- status box -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #0d3d3d;border-radius:12px;margin-bottom:28px;">
              <tr>
                <td align="center" bgcolor="#050f0f" style="background-color:#050f0f;padding:24px;border-radius:12px;">
                  <p style="margin:0 0 6px;color:#444444;font-size:10px;letter-spacing:.4em;text-transform:uppercase;font-family:'Helvetica Neue',Arial,sans-serif;">Usuario verificado</p>
                  <p style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:.05em;font-family:'Helvetica Neue',Arial,sans-serif;">${name}</p>
                </td>
              </tr>
            </table>
            <!-- event details -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding:13px 0;border-bottom:1px solid #1a1a1a;font-size:11px;color:#555555;text-transform:uppercase;letter-spacing:.12em;font-family:'Helvetica Neue',Arial,sans-serif;">Fecha</td>
                <td align="right" style="padding:13px 0;border-bottom:1px solid #1a1a1a;font-size:13px;color:#ffffff;font-weight:600;font-family:'Helvetica Neue',Arial,sans-serif;">7 de Marzo, 2026</td>
              </tr>
              <tr>
                <td style="padding:13px 0;border-bottom:1px solid #1a1a1a;font-size:11px;color:#555555;text-transform:uppercase;letter-spacing:.12em;font-family:'Helvetica Neue',Arial,sans-serif;">Lugar</td>
                <td align="right" style="padding:13px 0;border-bottom:1px solid #1a1a1a;font-size:13px;color:#ffffff;font-weight:600;font-family:'Helvetica Neue',Arial,sans-serif;">Vía Argentina, Panamá</td>
              </tr>
              <tr>
                <td style="padding:13px 0;font-size:11px;color:#555555;text-transform:uppercase;letter-spacing:.12em;font-family:'Helvetica Neue',Arial,sans-serif;">Acceso</td>
                <td align="right" style="padding:13px 0;font-size:13px;color:#ffffff;font-weight:600;font-family:'Helvetica Neue',Arial,sans-serif;">Lista VIP · +18</td>
              </tr>
            </table>
            <!-- note -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:28px;">
              <tr>
                <td style="border-left:2px solid #ff00ff;padding:14px 16px;background-color:#0d050d;border-radius:0 8px 8px 0;">
                  <p style="margin:0;font-size:12px;color:#999999;line-height:1.7;font-family:'Helvetica Neue',Arial,sans-serif;">Guarda este correo — será tu pase de entrada. Más detalles de ubicación exacta serán enviados próximos al evento.</p>
                </td>
              </tr>
            </table>
            <!-- buttons -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:28px;">
              <tr>
                <td align="center" style="padding-bottom:12px;">
                  <a href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=LICENCIA+P&dates=20260307/20260308&details=Mi+acceso+est%C3%A1+confirmado.+Lugar%3A+V%C3%ADa+Argentina%2C+Panam%C3%A1&location=V%C3%ADa+Argentina%2C+Panam%C3%A1" target="_blank" style="display:inline-block;background-color:#001a1a;border:1px solid #00f3ff;color:#00f3ff;font-size:11px;letter-spacing:.2em;padding:13px 28px;border-radius:100px;text-decoration:none;text-transform:uppercase;font-weight:700;font-family:'Helvetica Neue',Arial,sans-serif;">&#128197; Añadir al Calendario</a>
                </td>
              </tr>
              <tr>
                <td align="center">
                  <a href="https://chat.whatsapp.com/Io8EZhVs2yYEZgVYLaRIQJ?mode=gi_t" target="_blank" style="display:inline-block;background-color:#001a0d;border:1px solid #25d366;color:#25d366;font-size:11px;letter-spacing:.2em;padding:13px 28px;border-radius:100px;text-decoration:none;text-transform:uppercase;font-weight:700;font-family:'Helvetica Neue',Arial,sans-serif;">&#128172; Unirse al Grupo</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- FOOTER -->
        <tr>
          <td align="center" bgcolor="#050505" style="background-color:#050505;padding:24px 32px;border-top:1px solid #111111;">
            <p style="margin:0;color:#333333;font-size:11px;letter-spacing:.05em;font-family:'Helvetica Neue',Arial,sans-serif;">LICENCIA P &nbsp;·&nbsp; 7 MAR 2026 &nbsp;·&nbsp; PTY</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>
`;

const adminEmailHtml = (name: string, email: string, total: number) => `
<!DOCTYPE html>
<html lang="es" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Nuevo Registro</title>
</head>
<body style="margin:0;padding:0;background-color:#050505;" bgcolor="#050505">
<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#050505" style="background-color:#050505;">
  <tr>
    <td align="center" bgcolor="#050505" style="background-color:#050505;padding:40px 16px;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:480px;border:1px solid #2a0040;border-radius:12px;overflow:hidden;">
        <tr>
          <td bgcolor="#0a0a0a" style="background-color:#0a0a0a;padding:24px 28px;border-bottom:1px solid #1a001a;">
            <p style="margin:0;font-size:11px;color:#bc13fe;letter-spacing:.4em;text-transform:uppercase;font-family:'Helvetica Neue',Arial,sans-serif;">LICENCIA P — NUEVO REGISTRO</p>
          </td>
        </tr>
        <tr>
          <td bgcolor="#0d0d0d" style="background-color:#0d0d0d;padding:28px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #1a1a1a;font-size:11px;color:#555555;text-transform:uppercase;letter-spacing:.1em;font-family:'Helvetica Neue',Arial,sans-serif;">Nombre</td>
                <td align="right" style="padding:10px 0;border-bottom:1px solid #1a1a1a;font-size:13px;color:#ffffff;font-weight:600;font-family:'Helvetica Neue',Arial,sans-serif;">${name}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #1a1a1a;font-size:11px;color:#555555;text-transform:uppercase;letter-spacing:.1em;font-family:'Helvetica Neue',Arial,sans-serif;">Email</td>
                <td align="right" style="padding:10px 0;border-bottom:1px solid #1a1a1a;font-size:13px;color:#ffffff;font-weight:600;font-family:'Helvetica Neue',Arial,sans-serif;">${email}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;font-size:11px;color:#555555;text-transform:uppercase;letter-spacing:.1em;font-family:'Helvetica Neue',Arial,sans-serif;">Fecha</td>
                <td align="right" style="padding:10px 0;font-size:13px;color:#ffffff;font-weight:600;font-family:'Helvetica Neue',Arial,sans-serif;">${new Date().toLocaleString("es-PA", { timeZone: "America/Panama" })}</td>
              </tr>
            </table>
            <p style="margin:20px 0 0;text-align:center;color:#555555;font-size:11px;letter-spacing:.2em;text-transform:uppercase;font-family:'Helvetica Neue',Arial,sans-serif;">Total registrados: ${total}</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
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
      from: "LICENCIA P <noreply@bukoflow.com>",
      reply_to: "abrinay1997@gmail.com",
      to: newReg.email,
      subject: "Tu acceso a LICENCIA P — 7 de Marzo 2026",
      html: userEmailHtml(newReg.name),
      text: `Hola ${newReg.name},\n\nTu registro para LICENCIA P ha sido confirmado.\n\nFecha: 7 de Marzo, 2026\nLugar: Vía Argentina, Panamá\nDress Code: Cyberpunk Sexy\nAcceso: Lista VIP · +18\n\nGuarda este correo, será tu pase de entrada. Los detalles exactos de ubicación serán enviados próximos al evento.\n\nLICENCIA P · 7 MAR 2026 · PTY`,
    }),
    resend.emails.send({
      from: "LICENCIA P <noreply@bukoflow.com>",
      to: process.env.ADMIN_EMAIL!,
      subject: `Nuevo registro: ${newReg.name}`,
      html: adminEmailHtml(newReg.name, newReg.email, updated.length),
      text: `Nuevo registro en LICENCIA P\n\nNombre: ${newReg.name}\nEmail: ${newReg.email}\nFecha: ${new Date().toLocaleString("es-PA", { timeZone: "America/Panama" })}\n\nTotal registrados: ${updated.length}`,
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
