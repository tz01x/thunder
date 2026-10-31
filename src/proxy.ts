import { NextResponse, type NextRequest } from 'next/server';
import { isAdmin } from '@/lib/admin';

// HTTP Basic Auth for the admin page
export function proxy(request: NextRequest) {
  if (isAdmin(request.headers.get('authorization'))) return NextResponse.next();
  return new NextResponse('Authentication required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="thunder-admin"' },
  });
}

export const config = { matcher: '/thunder-admin/:path*' };
