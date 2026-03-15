const BASE = "/api";

export const fetchStats  = (type) => fetch(type ? `${BASE}/stats?type=${type}` : `${BASE}/stats`).then(r => r.json());
export const pingHealth  = ()     => fetch(`${BASE}/health`).then(r => { if (!r.ok) throw new Error("Offline"); return r.json(); });

export const triggerFiles = (files) =>
  fetch(`${BASE}/trigger`, { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ files }) }).then(r => r.json());

export const triggerAll = () =>
  fetch(`${BASE}/trigger`, { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ all: true }) }).then(r => r.json());

export function createSSE(onMessage) {
  const es = new EventSource(`${BASE}/stream`);
  es.onmessage = e => { try { onMessage(JSON.parse(e.data)); } catch {} };
  es.onerror   = () => { es.close(); setTimeout(() => createSSE(onMessage), 5000); };
  return es;
}
