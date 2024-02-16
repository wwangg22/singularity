// import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// import {verify} from "@/components/login-flow/josemethods";

export async function middleware(request:NextRequest){

}
// // This function can be marked `async` if using `await` inside
// export async function middleware(request: NextRequest) {
//   // there are some public paths and there are some protected paths
//   // the public path should not be visible when the user has the token
//   // the private path should not be visible when the user doesn't have the token
//   const path = request.nextUrl.pathname;
//   const publicpaths = ["/", "/signin", "/signup"]
//   const isPublicPath = publicpaths.includes(path);
//   const token = request.cookies.get("token")?.value || ""; // check if the token exists
//   if (token != "")
//   {
//     const pl = await verify(token, process.env.JWT_TOKEN_SECRET);
//     console.log('pl', pl);
//   }
// }
// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - api (API routes)
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      */
//     '/((?!api|_next/static|_next/image|favicon.ico).*)',
//   ],
// }
