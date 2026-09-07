import { NextResponse } from "next/server";

export function middleware(request) {
  if (request.headers.get("host")?.split(":")[0].toLowerCase() !== "www.sentinelsdesignlab.com")
    return NextResponse.next();
  const url = request.nextUrl.clone();
  url.hostname = "sentinelsdesignlab.com";
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
