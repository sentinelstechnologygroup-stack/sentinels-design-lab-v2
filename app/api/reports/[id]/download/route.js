import { get as getLegacyBlob } from "@vercel/blob";
import { getOwnedReport } from "@/db/firestore";
import { getSessionUser } from "@/lib/session";
import { readReportPdf } from "@/lib/report-storage";

export const dynamic = "force-dynamic";

export async function GET(_request, { params }) {
  const user = await getSessionUser();
  if (!user) return new Response("Unauthorized", { status: 401 });
  const { id } = await params;
  const report = await getOwnedReport(user.uid, id);
  if (!report || report.status !== "complete" || (!report.storagePath && !report.blobUrl)) return new Response("Report not found", { status: 404 });
  let body;
  let contentType = "application/pdf";
  if (report.storagePath) {
    body = await readReportPdf(report.storagePath);
  } else {
    const legacyBlob = await getLegacyBlob(report.blobUrl, { access: "private" });
    body = legacyBlob?.stream || null;
    contentType = legacyBlob?.contentType || contentType;
  }
  if (!body) return new Response("Report file not found", { status: 404 });
  return new Response(body, {
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `attachment; filename="${report.title.replace(/[^a-z0-9]+/gi, "-")}.pdf"`,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
