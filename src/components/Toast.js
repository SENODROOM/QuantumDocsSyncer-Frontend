import React, { createContext, useContext, useState, useCallback } from "react";

const Ctx = createContext(null);
const COLORS = { info:"var(--accent)", success:"var(--green)", error:"var(--red)", warn:"var(--yellow)" };

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const add = useCallback((msg, type="info") => {
    const id = Date.now();
    setToasts(p => [{ id, msg, type }, ...p]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 5000);
  }, []);
  return (
    <Ctx.Provider value={add}>
      {children}
      <div style={{ position:"fixed", bottom:"1.5rem", right:"1.5rem", zIndex:9999, display:"flex", flexDirection:"column", gap:"0.5rem" }}>
        {toasts.map(t => (
          <div key={t.id} className="fade-in" style={{ background:"var(--sur2)", border:`1px solid var(--border)`, borderLeft:`3px solid ${COLORS[t.type]}`, borderRadius:"var(--rsm)", padding:"0.7rem 1.1rem", fontFamily:"var(--mono)", fontSize:"0.78rem", maxWidth:340, boxShadow:"0 4px 24px rgba(0,0,0,.5)" }}>
            {t.msg}
          </div>
        ))}
      </div>
    </Ctx.Provider>
  );
}

export const useToast = () => useContext(Ctx);
