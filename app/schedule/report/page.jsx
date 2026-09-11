"use client";

import { useEffect, useState } from "react";

export default function ReportSchedulePage() {
  const [state, setState] = useState({ loading: true });
  useEffect(() => {
    fetch(`/api/schedule/report${window.location.search}`)
      .then((response) => response.json().then((data) => ({ ok: response.ok, data })))
      .then(({ ok, data }) => setState(ok ? { loading: false, ...data } : { loading: false, error: data.error }))
      .catch(() => setState({ loading: false, error: "We could not load this scheduling link." }));
  }, []);

  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24, background: "#eef2f7", fontFamily: "Arial, sans-serif" }}>
      <section style={{ maxWidth: 560, width: "100%", padding: 36, borderRadius: 18, background: "white", boxShadow: "0 16px 50px rgba(15,23,42,.12)" }}>
        <p style={{ color: "#2f76f6", fontWeight: 700, letterSpacing: ".08em" }}>SENTINELS DESIGN LAB</p>
        <h1>Schedule your report review</h1>
        {state.loading && <p>Loading your secure scheduling invitation...</p>}
        {state.error && <p style={{ color: "#b91c1c" }}>{state.error}</p>}
        {!state.loading && !state.error && (state.calendarConnected ? <p>Calendar availability is connected. Booking options will appear here after the owner calendar setup is completed.</p> : <p>We received your evaluation. Patrick will follow up within 24 to 48 hours. Calendar booking is being connected now; please reply to the report email if you need an immediate appointment.</p>)}
      </section>
    </main>
  );
}
