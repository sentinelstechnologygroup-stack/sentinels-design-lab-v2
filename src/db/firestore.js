import "server-only";
import { randomUUID } from "node:crypto";
import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { firestore } from "@/lib/firebase-admin";

const clean = (value) => value instanceof Timestamp ? value.toDate() : value;
const record = (snapshot) => ({ id: snapshot.id, ...Object.fromEntries(Object.entries(snapshot.data()).map(([key, value]) => [key, clean(value)])) });

export async function upsertProfile(uid, values) {
  const ref = firestore().collection("profiles").doc(uid);
  const exists = (await ref.get()).exists;
  await ref.set({ ...values, uid, updatedAt: FieldValue.serverTimestamp(), ...(!exists && { createdAt: FieldValue.serverTimestamp() }) }, { merge: true });
}
export async function createWebsite(uid, values) {
  const id = randomUUID();
  await firestore().collection("websites").doc(id).set({ ...values, id, uid, createdAt: FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp() });
  return id;
}
export async function createReport(uid, values) {
  const id = randomUUID();
  await firestore().collection("reports").doc(id).set({ ...values, id, uid, generatedAt: FieldValue.serverTimestamp() });
  return id;
}
export async function updateReport(id, values) { await firestore().collection("reports").doc(id).update(values); }
export async function getOwnedReport(uid, id) { const snap = await firestore().collection("reports").doc(id).get(); return snap.exists && snap.data().uid === uid ? record(snap) : null; }
export async function listOwned(collection, uid) { const snap = await firestore().collection(collection).where("uid", "==", uid).get(); return snap.docs.map(record).sort((a, b) => Number(new Date(b.generatedAt || b.createdAt || 0)) - Number(new Date(a.generatedAt || a.createdAt || 0))); }
export async function createOrder(uid, values) { const id = randomUUID(); await firestore().collection("orders").doc(id).set({ ...values, id, uid, createdAt: FieldValue.serverTimestamp() }); return id; }
export async function updateOrderBySession(stripeSessionId, values) { const snap = await firestore().collection("orders").where("stripeSessionId", "==", stripeSessionId).limit(1).get(); if (!snap.empty) await snap.docs[0].ref.update(values); }
