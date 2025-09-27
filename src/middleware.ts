import { NextRequest, NextResponse } from 'next/server';

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const isLoginPage = pathname.startsWith('/login');
  const isAdminPage = pathname.startsWith('/admin');
  const isGetRequest = request.method === 'GET';

  const shouldAuthenticate = isAdminPage && !isLoginPage;
  const shouldRedirectToLogin = shouldAuthenticate && isGetRequest;

  if (!shouldRedirectToLogin) {
    return NextResponse.next();
  }

  const key = process.env.LOGIN_COOCKIE_NAME || 'loginSession';

  const jwtSession = request.cookies.get(key)?.value;

  const isAuthenticated = !!jwtSession;

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
};

export const config = {
  matcher: ['/admin/:path*'],
};
