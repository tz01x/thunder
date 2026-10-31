import { createClient } from '@supabase/supabase-js';

// Checks an HTTP Basic Auth header against ADMIN_USER/ADMIN_PASSWORD. Fails closed if ADMIN_PASSWORD is unset.
export function isAdmin(authorization: string | null) {
  const password = process.env.ADMIN_PASSWORD;
  const [scheme, encoded] = (authorization ?? '').split(' ');
  if (!password || scheme !== 'Basic' || !encoded) return false;
  const [user, ...rest] = atob(encoded).split(':');
  return user === (process.env.ADMIN_USER || 'admin') && rest.join(':') === password;
}

// Secret key bypasses RLS; server-only
export const adminDb = () =>
  createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SECRET_KEY!, {
    auth: { persistSession: false },
  });
