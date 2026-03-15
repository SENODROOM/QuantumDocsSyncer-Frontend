import React, { useState } from "react";
import Panel from "../components/Panel";
import LogBox from "../components/LogBox";

const LEVELS = ["all","success","error","info","warn","skip","queue","pr"];

export default function LiveLog({ logs }) {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? logs : logs.filter(l => l.level === filter);

  return (
    <div className="fade-up">
      <h1 style={S.title}>Live Log</h1>
      <p style={S.desc}>Real-time stream of all documentation processing events.</p>
      <Panel title={`Events (${filtered.length})`}>
        <div style={{ display:"flex", gap:"0.4rem", padding:"0.75rem 1rem", borderBottom:"1px solid var(--border)", flexWrap:"wrap" }}>
          {LEVELS.map(lv => (
            <button key={lv} onClick={() => setFilter(lv)} style={{ fontFamily:"var(--mono)", fontSize:"0.65rem", background: filter===lv ? "rgba(0,229,255,0.1)" : "none", border: filter===lv ? "1px solid rgba(0,229,255,0.3)" : "1px solid var(--border)", borderRadius:5, padding:"3px 10px", cursor:"pointer", color: filter===lv ? "var(--accent)" : "var(--text3)", transition:"all .15s" }}>
              {lv}
            </button>
          ))}
        </div>
        <LogBox logs={filtered} height={560} />
      </Panel>
    </div>
  );
}

const S = { title:{ fontSize:"1.4rem", fontWeight:900, marginBottom:"0.4rem" }, desc:{ color:"var(--text2)", fontSize:"0.85rem", marginBottom:"1.5rem" } };
