import React, { useEffect, useRef } from "react";
import { fmtTime } from "../utils/time";

const CLR = { success:"var(--green)", error:"var(--red)", warn:"var(--yellow)", skip:"var(--yellow)", queue:"var(--accent)", pr:"var(--acc2)", info:"var(--text2)" };

export default function LogBox({ logs, height = 360 }) {
  const ref = useRef(null);
  useEffect(() => { if (ref.current) ref.current.scrollTop = ref.current.scrollHeight; }, [logs]);

  return (
    <div ref={ref} style={{ height, overflowY:"auto", padding:"0.75rem", background:"var(--bg)", fontFamily:"var(--mono)", fontSize:"0.7rem", lineHeight:1.8 }}>
      {!logs.length && <div style={{ color:"var(--text3)", padding:"2rem", textAlign:"center" }}>Waiting for events…</div>}
      {[...logs].reverse().map((l, i) => (
        <div key={i} className="fade-in" style={{ display:"flex", gap:"0.6rem", alignItems:"baseline", padding:"1px 0", borderBottom:"1px solid rgba(255,255,255,0.02)" }}>
          <span style={{ color:"var(--text3)", flexShrink:0, minWidth:80 }}>{l.ts ? fmtTime(l.ts) : ""}</span>
          {l.filePath && <span style={{ color:"var(--orange)", flexShrink:0, maxWidth:160, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{l.filePath.split("/").pop()}</span>}
          <span style={{ flex:1, color: CLR[l.level] || "var(--text2)" }}>{l.message}</span>
        </div>
      ))}
    </div>
  );
}
