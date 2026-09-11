"use client";

import { useEffect, useState } from "react";

export default function ReportSchedulePage() {
  const [state, setState] = useState({ loading: true });
  const [slots, setSlots] = useState([]);
  const [booking, setBooking] = useState(null);
  useEffect(() => {
    fetch(`/api/schedule/report${window.location.search}`)
      .then((response) => response.json().then((data) => ({ ok: response.ok, data })))
      .then(async ({ ok, data }) => {
        if (!ok) return setState({ loading: false, error: data.error });
        setState({ loading: false, ...data });
        if (!data.calendarConnected) return;
        const token = new URLSearchParams(window.location.search).get("token");
        const candidates = [];
        for (let day = 1; day <= 7; day += 1) for (const hour of [9, 11, 13, 15]) { const date = new Date(); date.setDate(date.getDate() + day); if (date.getDay() !== 0 && date.getDay() !== 6) { date.setHours(hour, 0, 0, 0); candidates.push({ start: date.toISOString(), end: new Date(date.getTime() + 30 * 60000).toISOString() }); } }
        const checked = await Promise.all(candidates.slice(0, 12).map(async (slot) => { const query = new URLSearchParams({ token, start: slot.start, end: slot.end }); const response = await fetch(`/api/schedule/report?${query}`); const result = await response.json(); return result.available ? slot : null; }));
        setSlots(checked.filter(Boolean));
      })
      .catch(() => setState({ loading: false, error: "We could not load this scheduling link." }));
  }, []);

  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24, background: "#eef2f7", fontFamily: "Arial, sans-serif" }}>
      <section style={{ maxWidth: 560, width: "100%", padding: 36, borderRadius: 18, background: "white", boxShadow: "0 16px 50px rgba(15,23,42,.12)" }}>
        <p style={{ color: "#2f76f6", fontWeight: 700, letterSpacing: ".08em" }}>SENTINELS DESIGN LAB</p>
        <h1>Schedule your report review</h1>
        {state.loading && <p>Loading your secure scheduling invitation...</p>}
        {state.error && <p style={{ color: "#b91c1c" }}>{state.error}</p>}
        {!state.loading && !state.error && (state.calendarConnected ? <><p>Select an available 30-minute review time.</p><div style={{ display: "grid", gap: 10, marginTop: 18 }}>{slots.map((slot) => <button key={slot.start} disabled={booking} onClick={async () => { setBooking(slot.start); const response = await fetch("/api/schedule/report", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token: new URLSearchParams(window.location.search).get("token"), ...slot }) }); const result = await response.json(); setState(response.ok ? { loading: false, ...result.appointment, booked: true } : { ...state, error: result.error }); setBooking(null); }} style={{ padding: 12, borderRadius: 10, border: "1px solid #cbd5e1", background: "#f8fafc", textAlign: "left" }}>{new Date(slot.start).toLocaleString([], { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}</button>)}</div>{state.booked && <p style={{ color: "#047857", marginTop: 18 }}>Your review is confirmed. Check your email for the meeting link.</p>}</> : <p>We received your evaluation. Patrick will follow up within 24 to 48 hours. Calendar booking is being connected now; please reply to the report email if you need an immediate appointment.</p>)}
      </section>
    </main>
  );
}
