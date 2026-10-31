'use client';

import { deleteOrder } from './actions';

export function DeleteButton({ orderRef }: { orderRef: string }) {
  return (
    <form action={deleteOrder}>
      <input type="hidden" name="ref" value={orderRef} />
      <button
        onClick={(e) => {
          if (!confirm(`Are you sure you want to delete order ${orderRef}? This cannot be undone.`)) e.preventDefault();
        }}
        className="border border-red-600 text-red-600 px-2 py-1 uppercase hover:bg-red-600 hover:text-white"
      >
        Delete
      </button>
    </form>
  );
}
