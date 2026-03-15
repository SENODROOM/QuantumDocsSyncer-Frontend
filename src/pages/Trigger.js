import React, { useState } from "react";
import Panel from "../components/Panel";
import { triggerFiles, triggerAll } from "../utils/api";
import { useToast } from "../components/Toast";

const BTN = {
  base:    { padding:"0.6rem 1.2rem", borderRadius:"var(--rsm)", border:"none", fontFamily:"var(--sans)", fontWeight:700, fontSize:"0.82rem", cursor:"pointer", transition:"all .2s" },
  primary: { background:"linear-gradient(135deg,var(--accent),#0099cc)", color:"#000" },
  ghost:   { background:"none", color:"var(--text2)", border:"1px solid var(--border)" },
  danger:  { background:"rgba(255,23,68,.12)", color:"var(--red)", border:"1px solid rgba(255,23,68,.25)" },
};

export default function Trigger({ onTriggered }) {
  const toast = useToast();
  const [input,   setInput]   = useState("");
  const [loadF,   setLoadF]   = useState(false);
  const [loadA,   setLoadA]   = useState(false);
  const [statusF, setStatusF] = useState("");
  const [statusA, setStatusA] = useState("");
  const [progress, setProgress] = useState(null);

  async function handleFiles() {
    const files = input.split(",").map(f => f.trim()).filter(Boolean);
    if (!files.length) { toast("Enter at least one file path", "error"); return; }
    setLoadF(true); setStatusF("Queuing…");
    try {
      const d = await triggerFiles(files);
      if (d.error) { toast(d.error, "error"); setStatusF(d.hint || ""); return; }
      toast(`${d.fileCount} file(s) queued`, "success");
      setStatusF(`${d.fileCount} file(s) queued. A PR will be opened when done.`);
      setProgress({ total: d.fileCount });
      onTriggered?.();
    } catch(e) { toast(e.message, "error"); setStatusF(""); }
    finally { setLoadF(false); }
  }

  async function handleAll() {
    if (!window.confirm("Regenerate docs for ALL files in src/ and include/? This may take several minutes.")) return;
    setLoadA(true); setStatusA("Fetching file list…");
    try {
      const d = await triggerAll();
      toast(`Full scan: ${d.fileCount} files queued`, "info");
      setStatusA(`${d.fileCount} files queued. A PR will be opened when complete.`);
      setProgress({ total: d.fileCount });
      onTriggered?.();
    } catch(e) { toast(e.message, "error"); setStatusA(""); }
    finally { setLoadA(false); }
  }

  return (
    <div className="fade-up">
      <h1 style={S.title}>Trigger</h1>
      <p style={S.desc}>Manually queue files for documentation generation. Only <code style={S.code}>src/</code> and <code style={S.code}>include/</code> folders are processed.</p>

      {progress && (
        <div style={S.progCard}>
          <div style={S.progLabel}>Processing — {progress.total} files queued</div>
          <div style={S.progBar}><div style={{ ...S.progFill, width:"100%" }} /></div>
          <div style={{ fontFamily:"var(--mono)", fontSize:"0.65rem", color:"var(--accent)", marginTop:"0.4rem" }}>Watch the Live Log tab for real-time progress</div>
        </div>
      )}

      <Panel title="Selected Files" style={{ marginBottom:"1.25rem" }}>
        <div style={{ padding:"1.25rem" }}>
          <p style={S.cardDesc}>Enter file paths separated by commas. Examples: <code style={S.code}>include/AST/AST.h</code>, <code style={S.code}>src/lexer/Lexer.cpp</code></p>
          <input style={S.input} value={input} onChange={e => setInput(e.target.value)} placeholder="include/AST/AST.h, src/lexer/Lexer.cpp, src/main/main.cpp, …" onKeyDown={e => e.key === "Enter" && handleFiles()} />
          <div style={{ display:"flex", gap:"0.65rem", flexWrap:"wrap" }}>
            <button style={{ ...BTN.base, ...BTN.primary, opacity: loadF ? .5 : 1 }} onClick={handleFiles} disabled={loadF}>{loadF ? "Queuing…" : "Generate Selected"}</button>
            <button style={{ ...BTN.base, ...BTN.ghost }} onClick={() => setInput("")}>Clear</button>
          </div>
          {statusF && <p style={S.status}>{statusF}</p>}
        </div>
      </Panel>

      <Panel title="Full Repository Scan">
        <div style={{ padding:"1.25rem" }}>
          <p style={S.cardDesc}>Regenerate documentation for every file in <code style={S.code}>src/</code> and <code style={S.code}>include/</code>. HuggingFace free tier processes ~1 file every 2–3s.</p>
          <div style={{ display:"flex", gap:"0.65rem" }}>
            <button style={{ ...BTN.base, ...BTN.danger, opacity: loadA ? .5 : 1 }} onClick={handleAll} disabled={loadA}>{loadA ? "Starting…" : "⚡ Start Full Scan"}</button>
          </div>
          {statusA && <p style={S.status}>{statusA}</p>}
        </div>
      </Panel>
    </div>
  );
}

const S = {
  title:    { fontSize:"1.4rem", fontWeight:900, marginBottom:"0.4rem" },
  desc:     { color:"var(--text2)", fontSize:"0.85rem", marginBottom:"1.5rem", lineHeight:1.7 },
  code:     { fontFamily:"var(--mono)", fontSize:"0.75rem", color:"var(--orange)", background:"rgba(255,109,0,.08)", borderRadius:3, padding:"1px 5px" },
  cardDesc: { fontSize:"0.82rem", color:"var(--text2)", lineHeight:1.7, marginBottom:"1rem" },
  input:    { width:"100%", background:"var(--bg)", border:"1px solid var(--border)", borderRadius:"var(--rsm)", padding:"0.65rem 1rem", color:"var(--text)", fontFamily:"var(--mono)", fontSize:"0.8rem", outline:"none", marginBottom:"0.85rem" },
  status:   { fontFamily:"var(--mono)", fontSize:"0.73rem", color:"var(--text2)", marginTop:"0.65rem" },
  progCard: { background:"var(--surface)", border:"1px solid var(--border)", borderRadius:"var(--rmd)", padding:"1.25rem", marginBottom:"1.25rem" },
  progLabel:{ fontFamily:"var(--mono)", fontSize:"0.72rem", color:"var(--text2)", marginBottom:"0.5rem" },
  progBar:  { height:6, background:"var(--border)", borderRadius:3, overflow:"hidden", marginBottom:"0.5rem" },
  progFill: { height:"100%", background:"linear-gradient(90deg,var(--accent),var(--acc2))", borderRadius:3, transition:"width .4s ease" },
};
