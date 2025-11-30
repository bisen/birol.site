import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware((context, next) => {
  const { request, url } = context;
  const pathname = url.pathname;

  // Skip if already on a language-prefixed path
  if (pathname.startsWith('/en') || pathname.startsWith('/tr')) {
    return next();
  }

  // Skip static assets and API routes
  if (
    pathname.startsWith('/_') ||
    pathname.startsWith('/api') ||
    pathname.match(/\.(css|js|jpg|jpeg|png|gif|svg|ico|webp|woff|woff2|ttf|eot)$/i)
  ) {
    return next();
  }

  // Check if user has a language preference cookie
  const cookies = request.headers.get('cookie') || '';
  const langCookie = cookies.match(/preferred-lang=(en|tr)/);
  if (langCookie) {
    const preferredLang = langCookie[1];
    return context.redirect(`/${preferredLang}${pathname}`, 302);
  }

  // Get country from Cloudflare header
  const country = request.headers.get('cf-ipcountry');

  // Redirect Turkish visitors to Turkish version
  if (country === 'TR') {
    return context.redirect(`/tr${pathname}`, 302);
  }

  // Default to English for everyone else
  return context.redirect(`/en${pathname}`, 302);
});
