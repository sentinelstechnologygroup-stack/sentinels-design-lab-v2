import { NextResponse } from "next/server";

export default function proxy(request) {
  if (request.headers.get("host")?.split(":")[0].toLowerCase() === "www.sentinelsdesignlab.com") {
    const url = request.nextUrl.clone();
    url.hostname = "sentinelsdesignlab.com";
    return NextResponse.redirect(url, 308);
  }
  const path = request.nextUrl.pathname;
  const protectedPage = path.startsWith("/dashboard") || path.startsWith("/advanced-reports");
  if (protectedPage && !request.cookies.get("__session")?.value) {
    const url = new URL("/sign-in", request.url);
    url.searchParams.set("next", `${path}${request.nextUrl.search}`);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
