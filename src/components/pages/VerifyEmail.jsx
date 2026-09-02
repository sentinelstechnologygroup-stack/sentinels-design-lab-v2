"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { applyActionCode } from "firebase/auth";
import { CheckCircle2, CircleAlert, LoaderCircle } from "lucide-react";
import { firebaseClientAuth } from "@/lib/firebase-client";

export default function VerifyEmail() {
  const [state, setState] = useState({ status: "working", message: "Verifying your email address..." });

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("oobCode");
    if (!code) { setState({ status: "error", message: "This verification link is incomplete." }); return; }
    applyActionCode(firebaseClientAuth(), code)
      .then(() => setState({ status: "complete", message: "Your email address is verified. Your report account is ready." }))
      .catch(() => setState({ status: "error", message: "This verification link is invalid or has expired. Sign in to request a new one." }));
  }, []);

  return <main className="min-h-screen px-6 pb-24 pt-32"><section className="mx-auto max-w-xl rounded-3xl border border-white/10 bg-card p-8 text-center sm:p-12">
    {state.status === "working" && <LoaderCircle className="mx-auto h-12 w-12 animate-spin text-primary" />}
    {state.status === "complete" && <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-300" />}
    {state.status === "error" && <CircleAlert className="mx-auto h-12 w-12 text-amber-300" />}
    <span className="eyebrow mt-7">Secure Customer Portal</span>
    <h1 className="mt-5 font-heading text-3xl font-bold">{state.status === "complete" ? "Email verified" : state.status === "error" ? "Verification needs attention" : "Confirming your account"}</h1>
    <p className="mt-4 leading-7 text-muted-foreground">{state.message}</p>
    {state.status !== "working" && <Link href={state.status === "complete" ? "/dashboard" : "/sign-in"} className="btn-primary mt-8 inline-flex">{state.status === "complete" ? "Open My Reports" : "Sign In"}</Link>}
  </section></main>;
}
