import React from "react";
import { NavLink } from "react-router-dom";

const NAV = [
  { to:"/",        icon:"⬡", label:"Overview"  },
  { to:"/live",    icon:"◉", label:"Live Log"   },
  { to:"/trigger", icon:"▷", label:"Trigger"    },
  { to:"/history", icon:"≡", label:"History"    },
  { to:"/index",   icon:"◫", label:"File Index" },
  { to:"/setup",   icon:"⚙", label:"Setup"      },
];

export default function Sidebar({ queueSize, running }) {
  return (
    <aside style={S.aside}>
      <div style={S.logo}>
        <div style={S.logoBox}>QDS</div>
        <div>
          <div style={S.logoText}>QuantumDocs<span style={{ color:"var(--accent)" }}>Syncer</span></div>
          <div style={S.logoSub}>Documentation Engine</div>
        </div>
      </div>

      <div style={S.statusCard}>
        <div style={{ display:"flex", alignItems:"center", gap:"0.5rem" }}>
          <span style={{ width:8, height:8, borderRadius:"50%", background: running ? "var(--green)" : "var(--text3)", display:"inline-block", animation: running ? "pulse 2s infinite" : "none" }} />
          <span style={S.statusLabel}>{running ? "Processing" : "Idle"}</span>
        </div>
        {queueSize > 0 && <div style={S.queueBadge}>{queueSize} in queue</div>}
      </div>

      <nav style={{ flex:1, display:"flex", flexDirection:"column", gap:2 }}>
        <div style={S.navLabel}>Navigation</div>
        {NAV.map(({ to, icon, label }) => (
          <NavLink key={to} to={to} end={to==="/"} style={({ isActive }) => ({ ...S.navItem, ...(isActive ? S.navActive : {}) })}>
            <span style={{ fontSize:13, width:18, textAlign:"center" }}>{icon}</span>
            {label}
          </NavLink>
        ))}
      </nav>

      <div style={{ marginTop:"auto", paddingTop:"1rem", borderTop:"1px solid var(--border)" }}>
        <div style={{ fontFamily:"var(--mono)", fontSize:"0.6rem", color:"var(--text3)", textAlign:"center" }}>
          v1.0.0 · HF + GitHub + Mongo
        </div>
      </div>
    </aside>
  );
}

const S = {
  aside:      { width:240, minHeight:"100vh", background:"var(--bg2)", borderRight:"1px solid var(--border)", display:"flex", flexDirection:"column", padding:"1.5rem 1rem", position:"sticky", top:0, height:"100vh", overflow:"hidden", flexShrink:0 },
  logo:       { display:"flex", alignItems:"center", gap:"0.65rem", marginBottom:"1.5rem", paddingBottom:"1.5rem", borderBottom:"1px solid var(--border)" },
  logoBox:    { width:38, height:38, borderRadius:10, background:"linear-gradient(135deg,var(--accent),var(--acc2))", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"var(--mono)", fontWeight:700, fontSize:11, color:"#000", flexShrink:0, letterSpacing:1 },
  logoText:   { fontWeight:800, fontSize:"0.85rem", lineHeight:1.2 },
  logoSub:    { fontFamily:"var(--mono)", fontSize:"0.6rem", color:"var(--text3)", marginTop:2 },
  statusCard: { background:"var(--surface)", border:"1px solid var(--border)", borderRadius:"var(--rmd)", padding:"0.75rem 1rem", marginBottom:"1.25rem" },
  statusLabel:{ fontFamily:"var(--mono)", fontSize:"0.72rem", color:"var(--text2)" },
  queueBadge: { marginTop:"0.4rem", fontFamily:"var(--mono)", fontSize:"0.65rem", color:"var(--accent)", background:"rgba(0,229,255,0.08)", borderRadius:4, padding:"2px 7px", display:"inline-block" },
  navLabel:   { fontFamily:"var(--mono)", fontSize:"0.6rem", color:"var(--text3)", textTransform:"uppercase", letterSpacing:"1px", padding:"0 0.5rem", marginBottom:"0.4rem" },
  navItem:    { display:"flex", alignItems:"center", gap:"0.6rem", padding:"0.55rem 0.75rem", borderRadius:"var(--rsm)", fontSize:"0.85rem", fontWeight:500, color:"var(--text2)", textDecoration:"none", transition:"all 0.15s", border:"1px solid transparent" },
  navActive:  { background:"rgba(0,229,255,0.07)", color:"var(--accent)", fontWeight:700, borderColor:"rgba(0,229,255,0.15)" },
};
