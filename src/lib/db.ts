import { adminDb } from './admin';

// Touches the database so the free Supabase project doesn't pause after ~a week of inactivity.
// The count is never used; any query counts as activity.
export async function pingDb() {
  const { error } = await adminDb()
    .from('orders')
    .select('id', { count: 'exact', head: true });
  if (error) console.error('db ping failed', error);
}
