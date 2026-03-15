import React from "react";

export default function Panel({ title, action, children, style }) {
  return (
    <div style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:"var(--rmd)", overflow:"hidden", ...style }}>
      <div style={{ padding:"0.85rem 1.25rem", borderBottom:"1px solid var(--border)", background:"var(--sur2)", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ fontSize:"0.85rem", fontWeight:700, display:"flex", alignItems:"center", gap:"0.5rem" }}>
          <span style={{ display:"block", width:3, height:14, background:"var(--accent)", borderRadius:2 }} />
          {title}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}
