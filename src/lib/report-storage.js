import "server-only";
import { get, put } from "@vercel/blob";
import { firebaseStorage } from "@/lib/firebase-admin";

const VERCEL_BLOB_PREFIX = "vercel-blob:";

function bucket() {
  return firebaseStorage().bucket(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET);
}

export async function storeReportPdf({ uid, reportId, pdf }) {
  const objectPath = `reports/${uid}/${reportId}.pdf`;
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(objectPath, Buffer.from(pdf), {
      access: "private",
      addRandomSuffix: false,
      contentType: "application/pdf",
    });
    return `${VERCEL_BLOB_PREFIX}${blob.url}`;
  }
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
  if (objectPath?.startsWith(VERCEL_BLOB_PREFIX)) {
    const blob = await get(objectPath.slice(VERCEL_BLOB_PREFIX.length), { access: "private" });
    if (!blob) return null;
    return Buffer.from(await new Response(blob.stream).arrayBuffer());
  }
  if (!objectPath?.startsWith("reports/")) return null;
  const file = bucket().file(objectPath);
  const [exists] = await file.exists();
  if (!exists) return null;
  const [contents] = await file.download();
  return contents;
}
