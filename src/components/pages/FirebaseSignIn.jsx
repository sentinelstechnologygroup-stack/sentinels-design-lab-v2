"use client";
import { useState } from "react";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseClientAuth } from "@/lib/firebase-client";

export default function FirebaseSignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function createServerSession(user) {
    const response = await fetch("/api/session", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ idToken: await user.getIdToken() }) });
    if (!response.ok) throw new Error("Unable to create your secure session.");
  }

  async function submit(event) {
    event.preventDefault(); setBusy(true); setMessage("");
    try {
      const credential = await signInWithEmailAndPassword(firebaseClientAuth(), email.trim(), password);
      await createServerSession(credential.user);
      window.location.replace("/dashboard");
    } catch { setMessage("The email or password was not accepted. Use Forgot password if you need a reset link."); }
    finally { setBusy(false); }
  }

  async function resetPassword() {
    if (!email.trim()) { setMessage("Enter your email address first, then select Forgot password."); return; }
    setBusy(true); setMessage("");
    try { await sendPasswordResetEmail(firebaseClientAuth(), email.trim()); setMessage("If an account exists for that email, Firebase has sent a password-reset link."); }
    catch { setMessage("We could not send a reset link right now. Please try again shortly."); }
    finally { setBusy(false); }
  }

  return <div className="w-full max-w-md rounded-2xl border border-white/10 bg-card p-8"><span className="eyebrow">Secure Customer Portal</span><h1 className="mt-5 font-heading text-3xl font-bold">Sign in to my reports</h1><p className="mt-3 text-sm leading-6 text-muted-foreground">Use the account created with your free website evaluation. Sentinels never receives or stores your password.</p><form onSubmit={submit} className="mt-7 space-y-5"><label className="block text-sm font-semibold" htmlFor="email">Email address<input id="email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3" /></label><label className="block text-sm font-semibold" htmlFor="password">Password<input id="password" type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3" /></label><button disabled={busy} className="btn-primary w-full disabled:opacity-60">{busy ? "Please wait…" : "Sign in"}</button></form><button type="button" onClick={resetPassword} disabled={busy} className="mt-4 text-sm font-semibold text-primary">Forgot password?</button>{message && <p aria-live="polite" className="mt-5 text-sm leading-6 text-muted-foreground">{message}</p>}</div>;
}
