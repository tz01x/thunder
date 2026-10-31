import type { Metadata } from 'next';
import { adminDb } from '@/lib/admin';
import { confirmOrder } from './actions';
// import { DeleteButton } from './DeleteButton';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Orders', robots: { index: false, follow: false } };

interface Order {
  order_ref: string;
  customer_name: string;
  phone: string;
  location: string;
  city: string;
  address: string;
  items: { name: string; size: string; quantity: number; price: number }[];
  subtotal: number;
  status: string;
  is_confirm: boolean;
  created_at: string;
}

// "5m ago" / "3h ago" / "2 days ago", computed at request time
function ago(iso: string) {
  const mins = Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / 60000));
  if (mins < 60) return `${mins}m ago`;
  if (mins < 1440) return `${Math.floor(mins / 60)}h ago`;
  const days = Math.floor(mins / 1440);
  return `${days} day${days === 1 ? '' : 's'} ago`;
}

// Protected by HTTP Basic Auth in src/proxy.ts
export default async function AdminPage() {
  // ponytail: latest 500, no pagination; add .range() paging when order count outgrows it
  const { data, error } = await adminDb()
    .from('orders')
    .select('order_ref, customer_name, phone, location, city, address, items, subtotal, status, is_confirm, created_at')
    .order('created_at', { ascending: false })
    .limit(500);
  const orders = (data ?? []) as Order[];

  return (
    <div className="px-4 md:px-10 pt-32 pb-20 font-space text-xs">
      <h1 className="text-2xl font-bold uppercase mb-6">Orders ({orders.length})</h1>
      {error && <p className="text-red-600 mb-4">FAILED TO LOAD ORDERS: {error.message}</p>}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b-2 border-black uppercase">
              {['Ref', 'Date', 'Customer', 'Phone', 'Delivery', 'Items', 'Subtotal', 'Status', ''].map((h) => (
                <th key={h} className="py-2 pr-4 whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.order_ref} className="border-b border-black/20 align-top">
                <td className="py-2 pr-4 whitespace-nowrap font-bold">{o.order_ref}</td>
                <td className="py-2 pr-4 whitespace-nowrap">
                  <time
                    dateTime={o.created_at}
                    title={new Date(o.created_at).toLocaleString('en-GB', { timeZone: 'Asia/Dhaka' })}
                    className="cursor-help"
                  >
                    {ago(o.created_at)}
                  </time>
                </td>
                <td className="py-2 pr-4">{o.customer_name}</td>
                <td className="py-2 pr-4 whitespace-nowrap">{o.phone}</td>
                <td className="py-2 pr-4 min-w-48">
                  {o.address}, {o.city}
                  <div className="opacity-50">{o.location.replace('_', ' ')}</div>
                </td>
                <td className="py-2 pr-4 min-w-48">
                  {o.items.map((i, n) => (
                    <div key={n}>
                      {i.quantity}× {i.name} ({i.size})
                    </div>
                  ))}
                </td>
                <td className="py-2 pr-4 whitespace-nowrap">৳{o.subtotal.toLocaleString()}</td>
                <td className="py-2 pr-4 uppercase whitespace-nowrap">
                  {o.is_confirm ? <span className="font-bold">Confirmed</span> : <span className="opacity-50">{o.status}</span>}
                </td>
                <td className="py-2 whitespace-nowrap">
                  <div className="flex gap-2 items-start">
                    {!o.is_confirm && (
                      <form action={confirmOrder}>
                        <input type="hidden" name="ref" value={o.order_ref} />
                        <button className="border border-black px-2 py-1 uppercase hover:bg-black hover:text-white">Confirm</button>
                      </form>
                    )}
                    {/* Delete hidden for now; uncomment to bring back */}
                    {/* <DeleteButton orderRef={o.order_ref} /> */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
