"use client";

import { useState } from "react";
import { LogOut } from "lucide-react";
import { signOut } from "firebase/auth";
import { firebaseClientAuth } from "@/lib/firebase-client";

export default function DashboardLogout() {
  const [busy, setBusy] = useState(false);
  async function logout() {
    setBusy(true);
    await Promise.allSettled([signOut(firebaseClientAuth()), fetch("/api/session", { method: "DELETE" })]);
    window.location.assign("/sign-in");
  }
  return <button type="button" onClick={logout} disabled={busy} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/15 px-5 text-sm font-semibold text-white/80 hover:border-white/30 hover:text-white disabled:opacity-50"><LogOut className="h-4 w-4" />{busy ? "Signing out..." : "Log out"}</button>;
}
