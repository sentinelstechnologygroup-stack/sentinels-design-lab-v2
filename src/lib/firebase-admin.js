import "server-only";
import { applicationDefault, cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

function credentials() {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    return cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY));
  }
  return applicationDefault();
}

export function getFirebaseAdminApp() {
  return getApps()[0] || initializeApp({
    credential: credentials(),
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "sdl-website-a5f2d",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  });
}

export const adminAuth = () => getAuth(getFirebaseAdminApp());
export const firestore = () => getFirestore(getFirebaseAdminApp());
export const firebaseStorage = () => getStorage(getFirebaseAdminApp());
