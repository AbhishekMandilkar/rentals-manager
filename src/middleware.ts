import { clerkMiddleware } from "@clerk/nextjs/server";
import {NextResponse} from "next/server";

export default clerkMiddleware(async (auth, req) => {
  const userId = (await auth()).userId;
  const requestHeaders = new Headers(req.headers);

  const response = NextResponse.next({
    request: {
      // New request headers
      headers: requestHeaders,
    },
  })
 
  response.headers.set('userId', userId as string);
  return response

});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};