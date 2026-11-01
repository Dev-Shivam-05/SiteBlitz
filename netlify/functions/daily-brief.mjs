// Netlify Scheduled Function: the 08:00 IST Telegram brief (02:30 UTC). On Vercel the same endpoint is called by
// the "crons" entry in vercel.json, so only one of the two runs, depending on the host.
// Scheduled functions run only on published production deploys and must finish within 30 s.
export default async () => {
  const base = process.env.URL;
  const secret = process.env.CRON_SECRET;
  if (!base || !secret) return new Response("missing URL or CRON_SECRET", { status: 500 });
  const res = await fetch(`${base}/api/cron/brief`, { headers: { authorization: `Bearer ${secret}` } });
  return new Response(null, { status: res.ok ? 200 : 502 });
};

export const config = { schedule: "30 2 * * *" };
