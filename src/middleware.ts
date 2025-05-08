/**
 * import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
 * import { NextResponse } from "next/server";
 *
 * //TODO: Role-based route matchers
 * const isAdminRoute = createRouteMatcher(["/admin/(.*)"]);
 * const isSellerRoute = createRouteMatcher(["/seller/(.*)"]);
 * const isUserRoute = createRouteMatcher(["/user/(.*)"]);
 *
 * // Public route matcher
 * const isPublicRoute = createRouteMatcher([
 *     "/",
 *     "/sign-in",
 *     "/sign-up",
 *     "/unauthorized",
 *     "/404",
 *     "/about",
 *     "/contact",
 *     "/home",
 *     "/products(.*)",
 *     "/cart",
 *     "/privacy-policy",
 *     "/licensing",
 * ]);
 *
 * export default clerkMiddleware(async (auth, req) => {
 *     const { userId, sessionClaims } = await auth();
 *     // const url = new URL(req.url);
 *
 *     // 1. Allow unauthenticated users to access only public routes
 *     if (!userId && !isPublicRoute(req)) {
 *         return NextResponse.redirect(new URL("/sign-in", req.url));
 *     }
 *     if (userId && isPublicRoute(req)) {
 *         return NextResponse.redirect(new URL("/home", req.url));
 *     }
 *
 *     // 2.TODO: If authenticated, check for role-based access
 *     /*     if (userId) {
 *         const role =
 *             (sessionClaims?.metadata as { role?: "seller" | "buyer" | "admin" })
 *                 ?.role || "seller";
 *
 *         if (isUserRoute(req) && role !== "buyer") {
 *             return NextResponse.redirect(new URL("/unauthorized", req.url));
 *         }
 *
 *         if (isSellerRoute(req) && role !== "seller") {
 *             return NextResponse.redirect(new URL("/unauthorized", req.url));
 *         }
 *
 *         if (isAdminRoute(req) && role !== "admin") {
 *             return NextResponse.redirect(new URL("/unauthorized", req.url));
 *         }
 *     }
 *
 *     return NextResponse.next();
 * });
 *
 * export const config = {
 *     matcher: [
 *         // Match all routes except static files or Next.js internals
 *         "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
 *         "/(api|trpc)(.*)", // Always match API routes
 *     ],
 * };
 *
 * @format
 */

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
export default clerkMiddleware(async (auth, req) => {
    NextResponse.next();
});
