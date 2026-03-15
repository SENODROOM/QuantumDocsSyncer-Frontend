import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar   from "./components/Sidebar";
import { ToastProvider } from "./components/Toast";
import useSSE    from "./hooks/useSSE";
import useStats  from "./hooks/useStats";
import Overview  from "./pages/Overview";
import LiveLog   from "./pages/LiveLog";
import Trigger   from "./pages/Trigger";
import History   from "./pages/History";
import FileIndex from "./pages/FileIndex";
import Setup     from "./pages/Setup";

export default function App() {
  const { logs, queueSize, running, prs } = useSSE();
  const { data, loading, reload }         = useStats(30000);

  return (
    <ToastProvider>
      <div className="grid-bg" style={{ minHeight:"100vh", position:"relative" }}>
        {/* Ambient glow blobs */}
        <div style={{ position:"fixed", width:600, height:600, borderRadius:"50%", background:"var(--acc2)", top:-200, left:-200, filter:"blur(120px)", opacity:.2, pointerEvents:"none", zIndex:0 }} />
        <div style={{ position:"fixed", width:400, height:400, borderRadius:"50%", background:"var(--accent)", bottom:0, right:-100, filter:"blur(120px)", opacity:.15, pointerEvents:"none", zIndex:0 }} />

        <div style={{ display:"flex", minHeight:"100vh", position:"relative", zIndex:1 }}>
          <Sidebar queueSize={queueSize} running={running} />
          <main style={{ flex:1, padding:"2rem 2.5rem", overflowX:"hidden", minWidth:0 }}>
            <Routes>
              <Route path="/"        element={<Overview  statsData={data} statsLoading={loading} logs={logs} prs={prs} />} />
              <Route path="/live"    element={<LiveLog   logs={logs} />} />
              <Route path="/trigger" element={<Trigger   onTriggered={reload} />} />
              <Route path="/history" element={<History />} />
              <Route path="/index"   element={<FileIndex />} />
              <Route path="/setup"   element={<Setup />} />
            </Routes>
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}
