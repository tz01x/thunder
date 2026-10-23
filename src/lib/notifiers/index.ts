import { telegram } from './telegram';

export interface OrderNotice {
  ref: string;
  name: string;
  phone: string;
  location: string;
  city: string;
  address: string;
  items: { name: string; size: string; quantity: number; price: number }[];
  subtotal: number;
}

// A notifier sends one order somewhere. Throw on failure; it gets logged and the others still run.
export type Notifier = (order: OrderNotice) => Promise<void>;

// Add, remove or swap channels here (e.g. email, Slack, SMS)
const NOTIFIERS: Notifier[] = [telegram];

// Never throws: a failed notification must not fail an order that is already saved
export async function notifyOrder(order: OrderNotice) {
  const results = await Promise.allSettled(NOTIFIERS.map((notify) => notify(order)));
  results.forEach((result, i) => {
    if (result.status === 'rejected') console.error(`order notifier ${NOTIFIERS[i].name} failed`, result.reason);
  });
}
