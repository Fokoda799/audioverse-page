import { locales, defaultLocale } from "./lib/i18n";

const PUBLIC_FILE = /\.[^/]+$/;

export default function middleware(request: Request) {
  const url = new URL(request.url);
  const { pathname, search } = url;

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return;
  }

  const pathnameLocale = locales.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (pathnameLocale === defaultLocale) {
    url.pathname = pathname.replace(`/${defaultLocale}`, "") || "/";
    return Response.redirect(url, 307);
  }

  if (pathnameLocale) {
    return;
  }

  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  url.search = search;

  return new Response(null, {
    headers: {
      "x-middleware-rewrite": url.toString(),
    },
  });
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
