import { get } from "@vercel/blob";
import { getOwnedReport } from "@/db/firestore";
import { getSessionUser } from "@/lib/session";

export const dynamic = "force-dynamic";

export async function GET(_request, { params }) {
  const user = await getSessionUser();
  if (!user) return new Response("Unauthorized", { status: 401 });
  const { id } = await params;
  const report = await getOwnedReport(user.uid, id);
  if (!report?.blobUrl || report.status !== "complete") return new Response("Report not found", { status: 404 });
  const blob = await get(report.blobUrl, { access: "private" });
  if (!blob) return new Response("Report file not found", { status: 404 });
  return new Response(blob.stream, {
    headers: {
      "Content-Type": blob.contentType || "application/pdf",
      "Content-Disposition": `attachment; filename="${report.title.replace(/[^a-z0-9]+/gi, "-")}.pdf"`,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
