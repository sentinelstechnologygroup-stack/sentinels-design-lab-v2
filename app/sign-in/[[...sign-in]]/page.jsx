import FirebaseSignIn from "@/components/pages/FirebaseSignIn";

export const metadata = { title: "Sign In | Sentinels Design Lab" };

export default function Page() {
  return <main className="flex min-h-screen items-center justify-center px-6 pb-20 pt-32"><FirebaseSignIn /></main>;
}
