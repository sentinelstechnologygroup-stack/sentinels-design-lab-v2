import { redirect } from "next/navigation";
import { adminAuth } from "@/lib/firebase-admin";
import { getProfile, listOwned } from "@/db/firestore";
import { getSessionUser } from "@/lib/session";
import CustomerDashboard from "../../components/dashboard/CustomerDashboard";

export const dynamic = "force-dynamic";
export const metadata = { title: "Customer Dashboard | Sentinels Design Lab" };

const serializable = (value) => JSON.parse(JSON.stringify(value));

export default async function DashboardPage({ searchParams }) {
  const session = await getSessionUser();
  if (!session) redirect("/sign-in");
  const params = await searchParams;
  const [user, profile, reports, websites, orders] = await Promise.all([
    adminAuth().getUser(session.uid),
    getProfile(session.uid),
    listOwned("reports", session.uid),
    listOwned("websites", session.uid),
    listOwned("orders", session.uid),
  ]);
  const versionCounts = new Map();
  const versionedReports = [...reports].reverse().map((report) => {
    if (report.reportType !== "free-readiness") return report;
    const key = report.normalizedDomain || report.websiteId || "free-readiness";
    const version = (versionCounts.get(key) || 0) + 1;
    versionCounts.set(key, version);
    return /\sv\d+$/i.test(report.title || "")
      ? report
      : { ...report, title: `${report.title || "Website Readiness Snapshot"} v${version}` };
  }).reverse();

  return <CustomerDashboard initialData={serializable({
    customer: {
      uid: session.uid,
      name: profile?.name || user.displayName || "",
      email: user.email || "",
      emailVerified: user.emailVerified,
      phone: profile?.phone || user.phoneNumber || "",
      businessName: profile?.businessName || websites[0]?.businessName || "",
      website: profile?.website || websites[0]?.url || "",
      serviceArea: profile?.serviceArea || "",
    },
    reports: versionedReports,
    websites,
    orders,
    notice: params?.checkout || params?.created || "",
    view: ["overview", "reports", "order", "accounts", "orders", "settings"].includes(params?.view) ? params.view : "overview",
    connection: params?.connection || "",
    connectionService: params?.service || "",
  })} />;
}
