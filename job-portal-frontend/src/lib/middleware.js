// lib/middleware.js
export function middleware(req) {
  const { cookies } = req;
  if (!cookies.get("authToken")) {
    return new Response("Unauthorized", { status: 401 });
  }
}
