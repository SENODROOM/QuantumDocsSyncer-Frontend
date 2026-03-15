import { useEffect, useRef, useState } from "react";
import { createSSE } from "../utils/api";

export default function useSSE() {
  const [logs,      setLogs]    = useState([]);
  const [queueSize, setQSize]   = useState(0);
  const [running,   setRunning] = useState(false);
  const [prs,       setPRs]     = useState([]);
  const esRef = useRef(null);

  useEffect(() => {
    esRef.current = createSSE(entry => {
      if (entry.level === "queue_size") { setQSize(entry.size);    return; }
      if (entry.level === "running")    { setRunning(entry.value); return; }
      if (entry.level === "pr") {
        setPRs(p => [{ url: entry.url, fileCount: entry.fileCount, ts: entry.ts }, ...p].slice(0, 20));
        setLogs(p => [{ level:"pr", filePath:null, message:`PR opened (${entry.fileCount} files): ${entry.url}`, ts: entry.ts }, ...p].slice(0, 300));
        return;
      }
      setLogs(p => [entry, ...p].slice(0, 300));
    });
    return () => esRef.current?.close();
  }, []);

  return { logs, queueSize, running, prs };
}
