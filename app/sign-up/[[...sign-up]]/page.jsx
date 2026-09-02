import { redirect } from "next/navigation";

export const metadata = { title: "Create Account | Sentinels Design Lab" };

export default function Page() {
  redirect("/sign-in");
}
