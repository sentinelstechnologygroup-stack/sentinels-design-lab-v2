"use client";

import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { firebaseClientAuth } from "@/lib/firebase-client";

export default function DashboardProfile({ initialProfile }) {
  const [profile, setProfile] = useState(initialProfile);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function save(event) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    const response = await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });
    const payload = await response.json();
    setMessage(
      response.ok
        ? "Profile saved."
        : payload.error || "Profile could not be saved.",
    );
    setBusy(false);
  }

  async function resetPassword() {
    setBusy(true);
    setMessage("");
    try {
      await sendPasswordResetEmail(firebaseClientAuth(), profile.email);
      setMessage("Password reset email sent.");
    } catch {
      setMessage(
        "Password reset email could not be sent. Please try again later.",
      );
    }
    setBusy(false);
  }

  return (
    <section id="profile" className="mt-16 scroll-mt-28">
      <span className="eyebrow mb-4">Account Profile</span>
      <div className="grid gap-6 rounded-2xl border border-white/10 bg-card p-6 md:grid-cols-[1fr_.55fr]">
        <form onSubmit={save}>
          <h2 className="font-heading text-2xl font-bold">Personal details</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="text-sm">
              Full name
              <input
                required
                value={profile.name}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
                className="mt-2 w-full rounded-lg border border-white/10 bg-secondary/50 px-4 py-3"
              />
            </label>
            <label className="text-sm">
              Phone
              <input
                value={profile.phone}
                onChange={(e) =>
                  setProfile({ ...profile, phone: e.target.value })
                }
                className="mt-2 w-full rounded-lg border border-white/10 bg-secondary/50 px-4 py-3"
              />
            </label>
            <label className="text-sm sm:col-span-2">
              Email
              <input
                disabled
                value={profile.email}
                className="mt-2 w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-muted-foreground"
              />
            </label>
          </div>
          <button disabled={busy} className="btn-primary mt-5">
            {busy ? "Saving..." : "Save profile"}
          </button>
        </form>
        <div className="border-t border-white/10 pt-6 md:border-l md:border-t-0 md:pl-6 md:pt-0">
          <h3 className="font-semibold">Security</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Send a secure password-reset link to your account email.
          </p>
          <button
            type="button"
            onClick={resetPassword}
            disabled={busy}
            className="mt-4 rounded-lg border border-white/15 px-4 py-2 text-sm font-semibold"
          >
            Reset password
          </button>
          {message && <p className="mt-4 text-sm text-primary">{message}</p>}
        </div>
      </div>
    </section>
  );
}
