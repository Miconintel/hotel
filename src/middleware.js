import { auth } from "./lib/auth";

export const middleware = auth;

export const config = {
  matcher: "/account",
};

console.log("middleware");
