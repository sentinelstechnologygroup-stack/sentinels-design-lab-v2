import "server-only";
import { firebaseStorage } from "@/lib/firebase-admin";

function bucket() {
  return firebaseStorage().bucket(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET);
}

export async function storeReportPdf({ uid, reportId, pdf }) {
  const objectPath = `reports/${uid}/${reportId}.pdf`;
  const file = bucket().file(objectPath);
  await file.save(Buffer.from(pdf), {
    resumable: false,
    contentType: "application/pdf",
    metadata: {
      cacheControl: "private, no-store, max-age=0",
      metadata: { ownerUid: uid, reportId },
    },
  });
  return objectPath;
}

export async function readReportPdf(objectPath) {
  if (!objectPath?.startsWith("reports/")) return null;
  const file = bucket().file(objectPath);
  const [exists] = await file.exists();
  if (!exists) return null;
  const [contents] = await file.download();
  return contents;
}
