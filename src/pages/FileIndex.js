import React, { useEffect, useState } from "react";
import Panel from "../components/Panel";
import { fetchStats } from "../utils/api";
import { timeAgo } from "../utils/time";

const DOCS_BASE = "https://github.com/SENODROOM/QuantumLangCodeExplaination/blob/main/";

export default function FileIndex() {
  const [all,   setAll]   = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const load = () => { setLoading(true); fetchStats("index").then(d => setAll(d.index||[])).finally(() => setLoading(false)); };
  useEffect(() => { load(); }, []);
  const filtered = all.filter(i => i.filePath.toLowerCase().includes(query.toLowerCase())).sort((a,b) => a.filePath.localeCompare(b.filePath));

  return (
    <div className="fade-up">
      <h1 style={{ fontSize:"1.4rem", fontWeight:900, marginBottom:"0.4rem" }}>File Index</h1>
      <p style={{ color:"var(--text2)", fontSize:"0.85rem", marginBottom:"1.5rem" }}>{all.length} documented files in QuantumLangCodeExplaination.</p>
      <Panel title={`Files (${filtered.length})`} action={<button onClick={load} style={{ fontFamily:"var(--mono)", fontSize:"0.65rem", color:"var(--text3)", background:"none", border:"1px solid var(--border)", borderRadius:5, padding:"3px 9px", cursor:"pointer" }}>↻ refresh</button>}>
        <div style={{ padding:"0.85rem 1.25rem", borderBottom:"1px solid var(--border)", background:"var(--sur2)" }}>
          <input style={{ width:"100%", background:"var(--bg)", border:"1px solid var(--border)", borderRadius:"var(--rsm)", padding:"0.5rem 0.9rem", color:"var(--text)", fontFamily:"var(--mono)", fontSize:"0.78rem", outline:"none" }} placeholder="Filter by path…" value={query} onChange={e => setQuery(e.target.value)} />
        </div>
        <div style={{ overflowX:"auto", maxHeight:540, overflowY:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <thead>
              <tr>{["File Path","Doc","Updated","Commit"].map(h => <th key={h} style={{ fontFamily:"var(--mono)", fontSize:"0.62rem", color:"var(--text3)", textTransform:"uppercase", letterSpacing:"0.8px", fontWeight:400, padding:"0.6rem 1rem", textAlign:"left", borderBottom:"1px solid var(--border)", background:"var(--sur2)", whiteSpace:"nowrap" }}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {loading && [...Array(6)].map((_,i) => <tr key={i}><td colSpan={4} style={{ padding:"0.75rem 1rem" }}><div className="skeleton" style={{ height:16 }} /></td></tr>)}
              {!loading && !filtered.length && <tr><td colSpan={4} style={{ padding:"3rem", textAlign:"center", color:"var(--text3)", fontFamily:"var(--mono)", fontSize:"0.75rem" }}>{query ? "No files match filter." : "No documented files yet. Run a trigger to get started."}</td></tr>}
              {!loading && filtered.map((item,i) => (
                <tr key={i}>
                  <td style={{ padding:"0.65rem 1rem", borderBottom:"1px solid var(--border)", fontFamily:"var(--mono)", fontSize:"0.74rem", color:"var(--orange)", wordBreak:"break-all" }}>{item.filePath}</td>
                  <td style={{ padding:"0.65rem 1rem", borderBottom:"1px solid var(--border)" }}>
                    <a href={`${DOCS_BASE}${item.docPath}`} target="_blank" rel="noreferrer" style={{ fontFamily:"var(--mono)", fontSize:"0.68rem", color:"var(--accent)", background:"rgba(0,229,255,.07)", border:"1px solid rgba(0,229,255,.18)", borderRadius:4, padding:"2px 8px", textDecoration:"none" }}>view →</a>
                  </td>
                  <td style={{ padding:"0.65rem 1rem", borderBottom:"1px solid var(--border)", fontFamily:"var(--mono)", fontSize:"0.68rem", color:"var(--text3)", whiteSpace:"nowrap" }}>{item.updatedAt ? timeAgo(item.updatedAt) : "—"}</td>
                  <td style={{ padding:"0.65rem 1rem", borderBottom:"1px solid var(--border)", fontFamily:"var(--mono)", fontSize:"0.68rem", color:"var(--text3)" }}>{item.lastCommitSha ? item.lastCommitSha.slice(0,7) : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
