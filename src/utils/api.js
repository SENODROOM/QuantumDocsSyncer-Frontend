/* global __BACKEND_URL__ __IS_PROD__ */

// In production: BACKEND_URL env var baked in at build time by webpack DefinePlugin
// In development: empty string — webpack proxy handles /api → localhost:5000
const BASE = (typeof __BACKEND_URL__ !== "undefined" && __BACKEND_URL__)
  ? `${__BACKEND_URL__}/api`
  : "/api";

export const fetchStats = (type) =>
  fetch(type ? `${BASE}/stats?type=${type}` : `${BASE}/stats`).then(r => r.json());

export const pingHealth = () =>
  fetch(`${BASE}/health`).then(r => { if (!r.ok) throw new Error("Offline"); return r.json(); });

export const triggerFiles = (files) =>
  fetch(`${BASE}/trigger`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ files }),
  }).then(r => r.json());

export const triggerAll = () =>
  fetch(`${BASE}/trigger`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ all: true }),
  }).then(r => r.json());

// SSE works locally, polling works on Vercel (serverless can't hold SSE connections)
export function createSSE(onMessage) {
  const isProd = typeof __IS_PROD__ !== "undefined" && __IS_PROD__;

  if (isProd) {
    // Polling mode for Vercel — hits /api/logs every 3s
    let lastTs = new Date(Date.now() - 5000).toISOString();
    const poll = async () => {
      try {
        const r = await fetch(`${BASE}/logs?since=${encodeURIComponent(lastTs)}`);
        const d = await r.json();
        if (d.logs?.length) {
          d.logs.reverse().forEach(onMessage);
          lastTs = d.ts;
        }
      } catch {}
      setTimeout(poll, 3000);
    };
    poll();
    // Return fake SSE object so calling code doesn't break
    return { close: () => {} };
  }

  // SSE mode for local development
  const es = new EventSource(`${BASE}/stream`);
  es.onmessage = e => { try { onMessage(JSON.parse(e.data)); } catch {} };
  es.onerror   = () => { es.close(); setTimeout(() => createSSE(onMessage), 5000); };
  return es;
}