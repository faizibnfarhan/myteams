import { authMiddleware } from "@clerk/nextjs/server";

const protectedRoutes = [
  '/dashboard',
  '/upcoming',
  '/completed',
  '/recorded',
  '/personal-room',
  '/meeting(.*)'
];

export default authMiddleware({
  publicRoutes: ['/(.*)'],

});

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)","/",
    "/(api|trpc)(.*)"          
  ],
};
