import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const middleware = async (request: NextRequest) => {
  const { cookies } = request;
  const jwt = cookies.get("bop-token");
  const url = request.nextUrl.clone();

  if (url.pathname.startsWith("/auth")) {
    if (jwt) {
      const mainUrl = new URL("/", request.url);
      return NextResponse.redirect(mainUrl);
    }
    return NextResponse.next();
  }
  //   else if (url.pathname.startsWith("/")) {
  //     if (jwt) {
  //       return NextResponse.next();
  //     } else {
  //       const loginUrl = new URL("/auth/login", request.url);
  //       return NextResponse.redirect(loginUrl);
  //     }
  //   }
};
