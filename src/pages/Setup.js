import React, { useState } from "react";
import Panel from "../components/Panel";
import { pingHealth } from "../utils/api";
import { useToast } from "../components/Toast";

const CODE = { fontFamily:"var(--mono)", fontSize:"0.75rem", color:"var(--orange)", background:"rgba(255,109,0,.08)", borderRadius:3, padding:"1px 5px" };
const BTN  = { padding:"0.6rem 1.2rem", borderRadius:"var(--rsm)", border:"1px solid var(--border)", background:"none", color:"var(--text2)", fontFamily:"var(--sans)", fontWeight:700, fontSize:"0.82rem", cursor:"pointer" };

export default function Setup() {
  const toast = useToast();
  const [ping, setPing] = useState("");

  async function doPing() {
    setPing("Pinging…");
    try { const d = await pingHealth(); setPing(`✓ Online — queue: ${d.queue}, running: ${d.running}`); toast("Backend online","success"); }
    catch { setPing("✗ Cannot reach backend"); toast("Backend offline","error"); }
  }

  return (
    <div className="fade-up">
      <h1 style={{ fontSize:"1.4rem", fontWeight:900, marginBottom:"0.4rem" }}>Setup Guide</h1>
      <p style={{ color:"var(--text2)", fontSize:"0.85rem", marginBottom:"1.5rem" }}>Configure your environment and GitHub webhook.</p>

      <Panel title="Backend Health" style={{ marginBottom:"1.25rem" }}>
        <div style={{ padding:"1.25rem" }}>
          <p style={{ fontSize:"0.82rem", color:"var(--text2)", lineHeight:1.7, marginBottom:"1rem" }}>The frontend proxies <code style={CODE}>/api/*</code> to the backend on port 5000 via webpack dev server.</p>
          <button style={BTN} onClick={doPing}>Ping Backend</button>
          {ping && <p style={{ fontFamily:"var(--mono)", fontSize:"0.73rem", color:"var(--text2)", marginTop:"0.65rem" }}>{ping}</p>}
        </div>
      </Panel>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem" }}>
        <Panel title="Step 1 — GitHub Webhook">
          <div style={{ padding:"1.1rem", fontSize:"0.8rem", color:"var(--text2)", lineHeight:1.8 }}>
            Go to <strong style={{ color:"var(--text)" }}>Quantum-Language</strong> repo → Settings → Webhooks → Add webhook<br /><br />
            <strong style={{ color:"var(--text)" }}>URL:</strong> <code style={{ ...CODE, wordBreak:"break-all" }}>https://your-backend.vercel.app/api/webhook</code><br />
            <strong style={{ color:"var(--text)" }}>Content type:</strong> application/json<br />
            <strong style={{ color:"var(--text)" }}>Secret:</strong> <code style={CODE}>quantum_webhook_secret_2024</code><br />
            <strong style={{ color:"var(--text)" }}>Events:</strong> Push only
          </div>
        </Panel>

        <Panel title="Step 2 — Docs Repo">
          <div style={{ padding:"1.1rem", fontSize:"0.8rem", color:"var(--text2)", lineHeight:1.8 }}>
            Create a new empty GitHub repo named:<br />
            <code style={{ ...CODE, fontSize:"0.88rem", display:"inline-block", marginTop:"0.4rem" }}>QuantumLangCodeExplaination</code><br /><br />
            The backend will create branches and open PRs there automatically.
          </div>
        </Panel>

        <Panel title="Step 3 — Run Locally">
          <div style={{ padding:"1.1rem" }}>
            <div style={{ background:"var(--bg)", border:"1px solid var(--border)", borderRadius:"var(--rsm)", padding:"0.85rem 1rem", fontFamily:"var(--mono)", fontSize:"0.72rem", color:"var(--green)", lineHeight:2 }}>
              cd backend<br />npm install<br />node index.js<br /><br />cd frontend<br />npm install<br />npm start
            </div>
          </div>
        </Panel>

        <Panel title="Step 4 — HuggingFace Notes">
          <div style={{ padding:"1.1rem", fontSize:"0.8rem", color:"var(--text2)", lineHeight:1.8 }}>
            Model: <code style={CODE}>Mistral-7B-Instruct-v0.3:hf-inference</code><br />
            Endpoint: <code style={{ ...CODE, fontSize:"0.65rem" }}>router.huggingface.co/v1/chat/completions</code><br /><br />
            {["Rate limited ~1 req/sec on free tier","2.5s delay between files built in","429 errors trigger 30s pause","PRs opened after each batch"].map((n,i) => <div key={i} style={{ display:"flex", gap:"0.5rem" }}><span style={{ color:"var(--accent)" }}>→</span>{n}</div>)}
          </div>
        </Panel>

        <Panel title="Environment Variables" style={{ gridColumn:"1 / -1" }}>
          <div style={{ padding:"1.1rem" }}>
            {[
              ["HF_TOKEN",            "hf_BAqUJhgL… (Hugging Face token)"],
              ["GITHUB_TOKEN",        "github_pat_… (needs repo read+write)"],
              ["GITHUB_SOURCE_OWNER", "SENODROOM"],
              ["GITHUB_SOURCE_REPO",  "Quantum-Language"],
              ["GITHUB_DOCS_OWNER",   "SENODROOM"],
              ["GITHUB_DOCS_REPO",    "QuantumLangCodeExplaination"],
              ["MONGO_URI",           "mongodb+srv://…"],
              ["WEBHOOK_SECRET",      "quantum_webhook_secret_2024"],
            ].map(([k,v]) => (
              <div key={k} style={{ display:"flex", gap:"1rem", alignItems:"baseline", padding:"0.3rem 0", borderBottom:"1px solid var(--border)" }}>
                <span style={{ fontFamily:"var(--mono)", fontSize:"0.7rem", color:"var(--accent)", flexShrink:0, minWidth:200 }}>{k}</span>
                <span style={{ fontFamily:"var(--mono)", fontSize:"0.68rem", color:"var(--text3)" }}>{v}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
