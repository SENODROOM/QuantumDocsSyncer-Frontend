import React from "react";
import StatCard from "../components/StatCard";
import Panel from "../components/Panel";
import ActivityFeed from "../components/ActivityFeed";
import LogBox from "../components/LogBox";
import { timeAgo } from "../utils/time";

export default function Overview({ statsData, statsLoading, logs, prs = [] }) {
  const s = statsData?.stats;
  const liveBadge = (
    <span style={{ display:"flex", alignItems:"center", gap:5, fontFamily:"var(--mono)", fontSize:"0.65rem", color:"var(--green)", background:"rgba(0,230,118,0.08)", border:"1px solid rgba(0,230,118,0.2)", borderRadius:20, padding:"2px 9px" }}>
      <span style={{ width:6, height:6, borderRadius:"50%", background:"var(--green)", display:"inline-block", animation:"pulse 2s infinite" }} />
      streaming
    </span>
  );

  return (
    <div className="fade-up">
      <h1 style={S.title}>Overview</h1>

      <div style={S.statsGrid}>
        <StatCard label="Total Updates" value={s?.total}   color="var(--accent)"  loading={statsLoading} sub="all time" />
        <StatCard label="Successful"    value={s?.success} color="var(--green)"   loading={statsLoading} sub="docs written" />
        <StatCard label="Errors"        value={s?.errors}  color="var(--red)"     loading={statsLoading} sub="failed" />
        <StatCard label="Last Update"   value={s?.lastUpdate ? timeAgo(s.lastUpdate) : "Never"} loading={statsLoading} sub={s?.lastUpdate ? new Date(s.lastUpdate).toLocaleDateString() : "—"} />
      </div>

      {prs.length > 0 && (
        <Panel title="Pull Requests Opened" style={{ marginBottom:"1.5rem" }}>
          <div style={{ maxHeight:160, overflowY:"auto" }}>
            {prs.map((pr,i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:"0.65rem", padding:"0.65rem 1.25rem", borderBottom:"1px solid var(--border)" }}>
                <span style={{ flexShrink:0, padding:"2px 7px", borderRadius:4, fontFamily:"var(--mono)", fontSize:"0.6rem", fontWeight:700, background:"rgba(108,71,255,0.15)", color:"var(--acc2)", border:"1px solid rgba(108,71,255,0.25)" }}>PR</span>
                <a href={pr.url} target="_blank" rel="noreferrer" style={{ flex:1, color:"var(--accent)", fontFamily:"var(--mono)", fontSize:"0.72rem", textDecoration:"none", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{pr.url}</a>
                <span style={{ fontFamily:"var(--mono)", fontSize:"0.62rem", color:"var(--text3)", flexShrink:0 }}>{pr.fileCount} files · {timeAgo(pr.ts)}</span>
              </div>
            ))}
          </div>
        </Panel>
      )}

      <div style={S.grid2}>
        <Panel title="Recent Activity"><ActivityFeed items={statsData?.recent} loading={statsLoading} /></Panel>
        <Panel title="Live Log" action={liveBadge}><LogBox logs={logs} height={320} /></Panel>
      </div>
    </div>
  );
}

const S = {
  title:     { fontSize:"1.4rem", fontWeight:900, marginBottom:"1.5rem" },
  statsGrid: { display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"1rem", marginBottom:"1.5rem" },
  grid2:     { display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.5rem" },
};
