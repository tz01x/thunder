-- Run once in Supabase SQL editor.
create table public.orders (
  id uuid not null default gen_random_uuid (),
  order_ref text not null,
  customer_name text not null,
  phone text not null,
  location text not null,
  city text not null,
  address text not null,
  payment_method text not null default 'COD'::text,
  items jsonb not null,
  subtotal integer not null,
  status text not null default 'pending'::text,
  created_at timestamp with time zone not null default now(),
  is_confirm boolean not null default false,
  constraint orders_pkey primary key (id),
  constraint orders_order_ref_key unique (order_ref),
  constraint orders_location_check check (
    (
      location = any (
        array['INSIDE_DHAKA'::text, 'OUTSIDE_DHAKA'::text]
      )
    )
  )
) TABLESPACE pg_default;
