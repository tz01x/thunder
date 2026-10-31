'use server';

import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { adminDb, isAdmin } from '@/lib/admin';

// Server actions are callable from any route, so the proxy alone doesn't protect them; re-check auth here.
async function orderRef(form: FormData) {
  if (!isAdmin((await headers()).get('authorization'))) throw new Error('Unauthorized');
  const ref = form.get('ref');
  if (typeof ref !== 'string' || !ref) throw new Error('Missing order ref');
  return ref;
}

export async function confirmOrder(form: FormData) {
  const { error } = await adminDb().from('orders').update({ is_confirm: true }).eq('order_ref', await orderRef(form));
  if (error) throw new Error(error.message);
  revalidatePath('/thunder-admin');
}

export async function deleteOrder(form: FormData) {
  const { error } = await adminDb().from('orders').delete().eq('order_ref', await orderRef(form));
  if (error) throw new Error(error.message);
  revalidatePath('/thunder-admin');
}
