-- Run once in Supabase SQL editor.
create table public.orders (
  id uuid primary key default gen_random_uuid(),
  order_ref text not null unique,
  customer_name text not null,
  phone text not null,
  location text not null check (location in ('INSIDE_DHAKA', 'OUTSIDE_DHAKA')),
  city text not null,
  address text not null,
  payment_method text not null default 'COD',
  items jsonb not null, -- [{ product_id, name, size, quantity, price }]
  subtotal integer not null, -- BDT
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

-- RLS on with no policies: anon/publishable key can't read or write.
-- Only the server action (secret key) inserts orders.
alter table public.orders enable row level security;
