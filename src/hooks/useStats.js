import { useState, useEffect, useCallback } from "react";
import { fetchStats } from "../utils/api";

export default function useStats(interval = 30000) {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  const load = useCallback(async () => {
    try   { const d = await fetchStats(); setData(d); setError(null); }
    catch (e) { setError(e.message); }
    finally   { setLoading(false); }
  }, []);

  useEffect(() => {
    load();
    const id = setInterval(load, interval);
    return () => clearInterval(id);
  }, [load, interval]);

  return { data, loading, error, reload: load };
}
