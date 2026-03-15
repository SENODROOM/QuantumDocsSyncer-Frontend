import React from "react";
import { timeAgo } from "../utils/time";

const BADGE = { success:{ bg:"rgba(0,230,118,.1)", color:"var(--green)" }, error:{ bg:"rgba(255,23,68,.1)", color:"var(--red)" }, skipped:{ bg:"rgba(255,214,0,.1)", color:"var(--yellow)" } };

export default function ActivityFeed({ items, maxHeight = 360, loading }) {
  if (loading) return <div style={{ padding:"1rem" }}>{[...Array(5)].map((_,i)=><div key={i} className="skeleton" style={{ height:44, marginBottom:8 }} />)}</div>;
  if (!items?.length) return <div style={{ padding:"3rem 1.5rem", textAlign:"center", color:"var(--text3)", fontFamily:"var(--mono)", fontSize:"0.75rem", lineHeight:1.8 }}>No activity yet.</div>;
  return (
    <div style={{ maxHeight, overflowY:"auto" }}>
      {items.map((item,i) => {
        const b = BADGE[item.status] || BADGE.skipped;
        return (
          <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:"0.65rem", padding:"0.75rem 1.25rem", borderBottom:"1px solid var(--border)", fontSize:"0.82rem" }}>
            <span style={{ flexShrink:0, padding:"2px 8px", borderRadius:4, fontFamily:"var(--mono)", fontSize:"0.6rem", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.5px", marginTop:2, background:b.bg, color:b.color }}>{item.status}</span>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontFamily:"var(--mono)", fontSize:"0.75rem", color:"var(--orange)", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{item.filePath}</div>
              {item.error && <div style={{ fontFamily:"var(--mono)", fontSize:"0.62rem", color:"var(--red)", opacity:.8, marginTop:2 }}>{item.error.slice(0,80)}</div>}
            </div>
            <span style={{ fontFamily:"var(--mono)", fontSize:"0.62rem", color:"var(--text3)", flexShrink:0, whiteSpace:"nowrap" }}>{timeAgo(item.timestamp)}</span>
          </div>
        );
      })}
    </div>
  );
}
