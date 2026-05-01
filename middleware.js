import { NextResponse } from "next/server";

const caseRedirectMap = {
  "/Home": "/",
  "/About": "/about",
  "/Services": "/services",
  "/Work": "/work",
  "/Pricing": "/pricing",
  "/Blog": "/blog",
  "/Contact": "/contact",
};

export function middleware(request) {
  const { pathname, search } = request.nextUrl;
  const destination = caseRedirectMap[pathname];

  if (!destination) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = destination;
  url.search = search;
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: ["/Home", "/About", "/Services", "/Work", "/Pricing", "/Blog", "/Contact"],
};