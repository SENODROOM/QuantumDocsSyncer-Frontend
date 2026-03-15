import React from "react";

export default function StatCard({ label, value, sub, color = "var(--text)", loading }) {
  return (
    <div style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:"var(--rmd)", padding:"1.25rem 1.5rem", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:"linear-gradient(90deg,var(--accent),var(--acc2))" }} />
      <div style={{ fontFamily:"var(--mono)", fontSize:"0.62rem", color:"var(--text3)", textTransform:"uppercase", letterSpacing:"1px", marginBottom:"0.4rem" }}>{label}</div>
      {loading
        ? <div className="skeleton" style={{ width:60, height:36, marginBottom:4 }} />
        : <div style={{ fontSize:"2.2rem", fontWeight:900, lineHeight:1, color, marginBottom:"0.25rem" }}>{value ?? "—"}</div>
      }
      {sub && <div style={{ fontFamily:"var(--mono)", fontSize:"0.62rem", color:"var(--text3)" }}>{sub}</div>}
    </div>
  );
}
