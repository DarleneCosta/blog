import { NextRequest, NextResponse } from 'next/server';
import { verifyJwt } from './lib/login/manage-login';

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const isLoginPage = pathname.startsWith('/admin/login');
  const isAdminPage = pathname.startsWith('/admin');
  const isGetRequest = request.method === 'GET';

  const shouldAuthenticate = isAdminPage && !isLoginPage;
  const shouldRedirectToLogin = shouldAuthenticate && isGetRequest;

  if (!shouldRedirectToLogin) {
    return NextResponse.next();
  }

  const jwtSession = request.cookies.get(
    process.env.LOGIN_COOCKIE_NAME || 'login-session',
  )?.value;

  const isAuthenticated = jwtSession && (await verifyJwt(jwtSession));
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
};

export const config = {
  matcher: ['/admin/:path*'],
};
