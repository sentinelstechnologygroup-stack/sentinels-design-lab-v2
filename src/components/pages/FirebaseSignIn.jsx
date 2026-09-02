"use client";
import { useEffect, useState } from "react";
import { isSignInWithEmailLink, sendSignInLinkToEmail, signInWithEmailLink } from "firebase/auth";
import { firebaseClientAuth } from "@/lib/firebase-client";

export default function FirebaseSignIn() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const auth = firebaseClientAuth();
    if (!isSignInWithEmailLink(auth, window.location.href)) return;
    const saved = window.localStorage.getItem("sdlSignInEmail");
    const address = saved || window.prompt("Confirm the email address that received this link:");
    if (!address) return;
    setBusy(true);
    signInWithEmailLink(auth, address, window.location.href)
      .then(async (credential) => {
        const idToken = await credential.user.getIdToken();
        const response = await fetch("/api/session", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ idToken }) });
        if (!response.ok) throw new Error("Unable to create your secure session.");
        window.localStorage.removeItem("sdlSignInEmail");
        window.location.replace("/dashboard");
      })
      .catch((error) => setMessage(error.message || "That link is invalid or expired."))
      .finally(() => setBusy(false));
  }, []);

  async function submit(event) {
    event.preventDefault(); setBusy(true); setMessage("");
    try {
      const auth = firebaseClientAuth();
      await sendSignInLinkToEmail(auth, email.trim(), { url: `${window.location.origin}/sign-in`, handleCodeInApp: true });
      window.localStorage.setItem("sdlSignInEmail", email.trim());
      setMessage("Check your email for your secure sign-in link. It expires automatically and no password is required.");
    } catch (error) { setMessage(error.message || "We could not send the sign-in link."); }
    finally { setBusy(false); }
  }

  return <div className="w-full max-w-md rounded-2xl border border-white/10 bg-card p-8"><span className="eyebrow">Secure Customer Portal</span><h1 className="mt-5 font-heading text-3xl font-bold">Sign in by email</h1><p className="mt-3 text-sm leading-6 text-muted-foreground">We will email a one-time secure link. Sentinels never asks for or stores your Google password.</p><form onSubmit={submit} className="mt-7"><label className="text-sm font-semibold" htmlFor="email">Email address</label><input id="email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3" /><button disabled={busy} className="btn-primary mt-5 w-full disabled:opacity-60">{busy ? "Please wait…" : "Email my secure sign-in link"}</button></form>{message && <p aria-live="polite" className="mt-5 text-sm leading-6 text-muted-foreground">{message}</p>}</div>;
}
