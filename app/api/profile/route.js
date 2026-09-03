import { NextResponse } from "next/server";
import { getProfile, upsertProfile } from "@/db/firestore";
import { adminAuth } from "@/lib/firebase-admin";
import { getSessionUser } from "@/lib/session";

export async function GET() {
  const session = await getSessionUser();
  if (!session)
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  const [user, profile] = await Promise.all([
    adminAuth().getUser(session.uid),
    getProfile(session.uid),
  ]);
  return NextResponse.json({
    name: profile?.name || user.displayName || "",
    phone: profile?.phone || user.phoneNumber || "",
    email: user.email || "",
  });
}

export async function PATCH(request) {
  const session = await getSessionUser();
  if (!session)
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  const body = await request.json().catch(() => ({}));
  const name = String(body.name || "")
    .trim()
    .slice(0, 100);
  const phone = String(body.phone || "")
    .trim()
    .slice(0, 30);
  if (!name)
    return NextResponse.json(
      { error: "Your name is required." },
      { status: 400 },
    );
  await Promise.all([
    upsertProfile(session.uid, { name, phone }),
    adminAuth().updateUser(session.uid, { displayName: name }),
  ]);
  return NextResponse.json({ ok: true, name, phone });
}
