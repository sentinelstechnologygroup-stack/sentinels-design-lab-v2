"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  LogOut,
  LoaderCircle,
  ShieldCheck,
} from "lucide-react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  updateProfile,
} from "firebase/auth";
import { firebaseClientAuth } from "@/lib/firebase-client";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  businessName: "",
  website: "",
  primaryService: "",
  location: "",
  password: "",
  confirmPassword: "",
  company: "",
  concerns: [],
};

const CONCERNS = [
  ["leads", "Not receiving enough leads"],
  ["search", "Not appearing in Google"],
  ["functionality", "Broken links, buttons, or forms"],
  ["mobile", "Mobile usability"],
  ["speed", "Website speed"],
  ["content", "Outdated or inaccurate information"],
  ["trust", "Customer trust and credibility"],
  ["security", "Privacy, security, or compliance"],
  ["local", "Local / Google Business visibility"],
  ["advertising", "Advertising and landing pages"],
];

export default function Evaluation() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [signedIn, setSignedIn] = useState(false);
  const [sessionEmail, setSessionEmail] = useState("");
  const [switchingAccount, setSwitchingAccount] = useState(false);

  useEffect(() => {
    fetch("/api/session", { cache: "no-store" })
      .then((response) => response.json())
      .then(async (session) => {
        if (session.authenticated) {
          setSignedIn(true);
          setSessionEmail(session.email || "your existing account");
          const [profileResponse, websitesResponse] = await Promise.all([
            fetch("/api/profile", { cache: "no-store" }),
            fetch("/api/websites", { cache: "no-store" }),
          ]);
          const profile = profileResponse.ok ? await profileResponse.json() : {};
          const websitesPayload = websitesResponse.ok
            ? await websitesResponse.json()
            : { websites: [] };
          const website = websitesPayload.websites?.[0] || {};
          setForm((current) => ({
            ...current,
            name: profile.name || current.name,
            email: profile.email || session.email || current.email,
            phone: profile.phone || current.phone,
            businessName:
              profile.businessName || website.businessName || current.businessName,
            website: profile.website || website.url || current.website,
            primaryService: website.primaryService || current.primaryService,
            location:
              profile.serviceArea || website.location || current.location,
          }));
        }
      })
      .catch(() => null);
  }, []);

  function update(event) {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  }

  function toggleConcern(key) {
    setForm((current) => {
      const selected = current.concerns.includes(key);
      if (!selected && current.concerns.length >= 3) return current;
      return {
        ...current,
        concerns: selected
          ? current.concerns.filter((item) => item !== key)
          : [...current.concerns, key],
      };
    });
  }

  async function useDifferentAccount() {
    setSwitchingAccount(true);
    setError("");
    await Promise.allSettled([
      signOut(firebaseClientAuth()),
      fetch("/api/session", { method: "DELETE" }),
    ]);
    setForm(initialForm);
    setSignedIn(false);
    setSessionEmail("");
    setSwitchingAccount(false);
  }

  async function generateReport() {
    const response = await fetch("/api/evaluation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const payload = await response.json();
    if (!response.ok)
      throw new Error(
        payload.error || "The evaluation could not be completed.",
      );
    const delivery = payload.delivery?.sent ? "sent" : "failed";
    window.location.assign(
      `/dashboard?created=1&report=${encodeURIComponent(payload.report.id)}&delivery=${delivery}`,
    );
  }

  async function submit(event) {
    event.preventDefault();
    if (form.company) return;
    setLoading(true);
    setError("");

    try {
      if (!signedIn) {
        const email = form.email.trim().toLowerCase();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
          throw new Error(
            "Enter a complete email address, including the domain ending (for example, name@business.com).",
          );
        if (form.password.length < 12)
          throw new Error("Use a password with at least 12 characters.");
        if (form.password !== form.confirmPassword)
          throw new Error("The passwords do not match.");
        const credential = await createUserWithEmailAndPassword(
          firebaseClientAuth(),
          email,
          form.password,
        );
        await updateProfile(credential.user, { displayName: form.name.trim() });
        const sessionResponse = await fetch("/api/session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            idToken: await credential.user.getIdToken(true),
          }),
        });
        if (!sessionResponse.ok)
          throw new Error(
            "Your account was created, but the secure session could not start. Please sign in.",
          );
        const verificationResponse = await fetch("/api/auth/verification", {
          method: "POST",
        });
        if (!verificationResponse.ok) {
          await sendEmailVerification(credential.user, {
            url: `${window.location.origin}/dashboard`,
          });
        }
        setSignedIn(true);
      }
      await generateReport();
    } catch (submissionError) {
      const accountErrors = {
        "auth/email-already-in-use":
          "An account already exists for this email. Sign in to request another report.",
        "auth/invalid-email":
          "Enter a complete email address, including the domain ending (for example, name@business.com).",
        "auth/weak-password":
          "Use a stronger password with at least 12 characters.",
        "auth/too-many-requests":
          "Account creation is temporarily paused after repeated attempts. If this account was already created, sign in instead; otherwise wait a few minutes before retrying.",
      };
      setError(accountErrors[submissionError.code] || submissionError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen pt-28 pb-20">
      <section className="mx-auto max-w-6xl px-6">
        <div className="mb-12 max-w-3xl">
          <span className="eyebrow mb-5">Sentinels Intelligence Suite</span>
          <h1 className="font-heading text-4xl font-bold text-foreground sm:text-5xl">
            Get your free website readiness snapshot
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            Get an evidence-adjusted public website readiness rating, category
            scores, critical failures, and the SEO, traffic, local, paid-media,
            and conversion areas that still require verification.
          </p>
        </div>

        <div className="grid gap-8">
          <EvaluationPreview />
          <form
            onSubmit={submit}
            autoComplete="off"
            className="rounded-2xl border border-border/50 bg-card p-6 sm:p-8"
          >
            <div className="mb-6 border-b border-border/50 pb-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Evaluation information
              </p>
              <h2 className="mt-2 font-heading text-2xl font-bold text-foreground">
                Tell us about your business and website
              </h2>
            </div>
            {signedIn && (
              <div className="mb-6 flex flex-col gap-4 rounded-xl border border-primary/25 bg-primary/[0.07] p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    You are signed in as {sessionEmail}.
                  </p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    Password creation is only shown when creating a new reports
                    account.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={useDifferentAccount}
                  disabled={switchingAccount}
                  className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg border border-primary/35 px-4 text-sm font-semibold text-primary transition hover:bg-primary/10 disabled:opacity-60"
                >
                  <LogOut className="h-4 w-4" />
                  {switchingAccount
                    ? "Switching accounts..."
                    : "Use a different account"}
                </button>
              </div>
            )}
            <input
              name="company"
              value={form.company}
              onChange={update}
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Full name"
                name="name"
                placeholder="Jane Smith"
                value={form.name}
                onChange={update}
                required
              />
              <Field
                label="Business name"
                name="businessName"
                placeholder="Smith Home Services"
                value={form.businessName}
                onChange={update}
                required
              />
              <Field
                label="Email"
                name="email"
                type="email"
                placeholder="jane@smithhomeservices.com"
                value={form.email}
                onChange={update}
                required
              />
              <Field
                label="Phone"
                name="phone"
                type="tel"
                placeholder="(555) 123-4567"
                value={form.phone}
                onChange={update}
              />
              <div className="sm:col-span-2">
                <Field
                  label="Website address"
                  name="website"
                  placeholder="https://yourbusiness.com"
                  value={form.website}
                  onChange={update}
                  required
                />
              </div>
              <Field
                label="Primary service"
                name="primaryService"
                placeholder="What do customers hire you for?"
                value={form.primaryService}
                onChange={update}
                required
              />
              <Field
                label="City / service area"
                name="location"
                placeholder="Houston, TX"
                value={form.location}
                onChange={update}
              />
              <fieldset className="sm:col-span-2">
                <legend className="text-sm font-medium text-foreground">
                  What are you most concerned about?{" "}
                  <span className="font-normal text-muted-foreground">
                    Select up to three.
                  </span>
                </legend>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {CONCERNS.map(([key, label]) => {
                    const checked = form.concerns.includes(key);
                    const disabled = !checked && form.concerns.length >= 3;
                    return (
                      <label
                        key={key}
                        className={`flex cursor-pointer items-start gap-3 rounded-lg border px-3 py-3 text-sm transition ${checked ? "border-primary/50 bg-primary/[0.08]" : "border-border/50 bg-secondary/30"} ${disabled ? "cursor-not-allowed opacity-45" : ""}`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          disabled={disabled}
                          onChange={() => toggleConcern(key)}
                          className="mt-0.5 h-4 w-4 accent-blue-500"
                        />
                        <span>{label}</span>
                      </label>
                    );
                  })}
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Your selections prioritize relevant findings; they never
                  change the objective score.
                </p>
              </fieldset>
              {!signedIn && (
                <>
                  <Field
                    label="Create password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="At least 12 characters"
                    minLength={12}
                    value={form.password}
                    onChange={update}
                    required
                  />
                  <Field
                    label="Verify password"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Enter the same password again"
                    minLength={12}
                    value={form.confirmPassword}
                    onChange={update}
                    required
                  />
                </>
              )}
            </div>
            {error && (
              <p className="mt-5 rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary mt-6 inline-flex w-full items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <LoaderCircle className="h-4 w-4 animate-spin" /> Preparing
                  your report
                </>
              ) : signedIn ? (
                <>
                  Get My Free Report <ArrowRight className="h-4 w-4" />
                </>
              ) : (
                <>
                  Create My Account & Free Report{" "}
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
            {!signedIn && (
              <p className="mt-4 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/sign-in" className="font-semibold text-primary">
                  Sign in to my reports
                </Link>
              </p>
            )}
            <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4" /> Your information is protected
              and used only to provide requested reports and services. We do not
              sell customer data or contact information.{" "}
              <Link href="/privacy" className="font-semibold text-primary">
                Privacy policy
              </Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}

function Field({ label, ...props }) {
  return (
    <label className="block text-sm font-medium text-foreground">
      {label}
      {props.required && <span className="text-primary"> *</span>}
      <input
        {...props}
        className="mt-2 w-full rounded-lg border border-border/60 bg-secondary/50 px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/60 focus:border-primary/60"
      />
    </label>
  );
}

function EvaluationPreview() {
  return (
    <aside className="rounded-2xl border border-border/50 bg-card p-6 sm:p-8">
      <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
        <div>
          <BadgeCheck
            aria-hidden="true"
            strokeWidth={1.8}
            className="h-11 w-11 text-primary"
          />
          <h2 className="mt-5 max-w-lg font-heading text-2xl font-bold sm:text-3xl">
            A truthful snapshot backed by visible evidence
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">
            See what the evaluation checks, what it can verify publicly, and
            where additional access is required before you submit your details.
          </p>
        </div>
        <ul className="grid gap-4 text-sm text-muted-foreground sm:grid-cols-2">
          {[
            "Seven independent homepage-readiness scores",
            "Broken links, dead controls, and contact-path checks",
            "Visible security, risk, and outdated-content warnings",
            "Exact page, evidence, test time, and verification steps",
            "Clear list of what was not measured",
            "Branded PDF and formatted email",
          ].map((item) => (
            <li key={item} className="flex gap-3">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-8 grid gap-5 border-t border-white/10 pt-6 md:grid-cols-2">
        <div className="text-sm leading-6 text-muted-foreground">
          <strong className="text-foreground">Important:</strong> This free
          snapshot samples selected public pages and customer paths. It is not a
          full-site crawl, compliance opinion, or security penetration test.
          Anything not directly verified is labeled accordingly.
        </div>
        <div className="rounded-xl border border-primary/20 bg-black/10 p-4 text-sm leading-6 text-muted-foreground">
          <strong className="text-foreground">
            Connect accounts for additional free insight.
          </strong>{" "}
          Supported customer-owned data may add limited context beyond the
          ordinary free snapshot. It will never equal the depth, cross-source
          validation, recommendations, or 30 / 60 / 90 / 120-day plan included
          in a paid advanced report.{" "}
          <a
            href="/dashboard#connections"
            className="font-semibold text-primary"
          >
            Connect supported accounts
          </a>
          .
        </div>
      </div>
    </aside>
  );
}
