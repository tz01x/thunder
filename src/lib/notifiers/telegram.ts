import type { Notifier, OrderNotice } from './index';

const LOCATION_LABEL: Record<string, string> = { INSIDE_DHAKA: 'Inside Dhaka', OUTSIDE_DHAKA: 'Outside Dhaka' };
const bdt = (amount: number) => `BDT ${amount.toLocaleString('en-US')}`;

// Plain text (no parse_mode), so customer input needs no escaping
export function formatOrder(order: OrderNotice) {
  return [
    `NEW ORDER ${order.ref}`,
    '',
    `Name: ${order.name}`,
    `Phone: ${order.phone}`,
    `Area: ${LOCATION_LABEL[order.location] ?? order.location}`,
    `City: ${order.city}`,
    `Address: ${order.address}`,
    '',
    ...order.items.map((item) => `• ${item.name} (${item.size}) x${item.quantity} = ${bdt(item.price * item.quantity)}`),
    '',
    `Subtotal: ${bdt(order.subtotal)}`,
    'Payment: Cash on delivery',
  ]
    .join('\n')
    .slice(0, 4096); // Telegram message limit
}

// Needs TELEGRAM_BOT_TOKEN (from @BotFather) and TELEGRAM_CHAT_ID (user, group or channel the bot can post to)
export const telegram: Notifier = async function telegram(order) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) throw new Error('TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set');

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: formatOrder(order) }),
  });
  if (!res.ok) throw new Error(`Telegram ${res.status}: ${await res.text()}`);
};
