-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.appointment_services (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  appointment_id uuid NOT NULL,
  service_id uuid NOT NULL,
  price_at_time numeric NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT appointment_services_pkey PRIMARY KEY (id),
  CONSTRAINT as_appointment_id_fkey FOREIGN KEY (appointment_id) REFERENCES public.appointments(id),
  CONSTRAINT as_service_id_fkey FOREIGN KEY (service_id) REFERENCES public.services(id)
);
CREATE TABLE public.appointments (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  client_id uuid,
  barber_id uuid,
  branch_id uuid,
  price numeric NOT NULL,
  appointment_date date NOT NULL,
  appointment_time time without time zone NOT NULL,
  status text DEFAULT 'pending'::text CHECK (status = ANY (ARRAY['pending'::text, 'confirmed'::text, 'completed'::text, 'cancelled'::text, 'no_show'::text])),
  notes text,
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  total_duration_minutes integer DEFAULT 0,
  CONSTRAINT appointments_pkey PRIMARY KEY (id),
  CONSTRAINT appointments_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.profiles(id),
  CONSTRAINT appointments_barber_id_fkey FOREIGN KEY (barber_id) REFERENCES public.barbers(id),
  CONSTRAINT appointments_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(id)
);
CREATE TABLE public.barbers (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  profile_id uuid,
  branch_id uuid,
  nickname text NOT NULL,
  commission_rate numeric DEFAULT 50.00,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  base_quota_cuts integer DEFAULT 10,
  specialty text DEFAULT 'Barbero'::text,
  schedule jsonb DEFAULT '{"endTime": "20:00", "workDays": [1, 2, 3, 4, 5, 6], "startTime": "10:00"}'::jsonb,
  CONSTRAINT barbers_pkey PRIMARY KEY (id),
  CONSTRAINT barbers_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profiles(id),
  CONSTRAINT barbers_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(id)
);
CREATE TABLE public.branches (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  address text NOT NULL,
  phone text,
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT branches_pkey PRIMARY KEY (id)
);
CREATE TABLE public.profiles (
  id uuid NOT NULL,
  first_name text,
  phone character varying,
  role text DEFAULT 'client'::text CHECK (role = ANY (ARRAY['client'::text, 'barber'::text, 'owner'::text, 'admin'::text])),
  level text DEFAULT 'Bronce'::text CHECK (level = ANY (ARRAY['Bronce'::text, 'Plata'::text, 'Oro'::text])),
  points integer DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  email text,
  wants_promos boolean DEFAULT true,
  visits integer DEFAULT 0,
  CONSTRAINT profiles_pkey PRIMARY KEY (id),
  CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id)
);
CREATE TABLE public.services (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  category text NOT NULL CHECK (category = ANY (ARRAY['cortes'::text, 'barba'::text, 'facial'::text, 'combos'::text])),
  name character varying NOT NULL,
  price numeric NOT NULL DEFAULT 0.00,
  duration_minutes integer NOT NULL DEFAULT 30,
  is_featured boolean DEFAULT false,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  discount_type text CHECK (discount_type = ANY (ARRAY['fixed'::text, 'percentage'::text])),
  discount_value numeric DEFAULT 0,
  display_order integer DEFAULT 0,
  description character varying,
  exclusion_group integer,
  package_includes ARRAY,
  CONSTRAINT services_pkey PRIMARY KEY (id)
);
CREATE TABLE public.transactions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  appointment_id uuid,
  branch_id uuid,
  amount numeric NOT NULL,
  type text DEFAULT 'income'::text CHECK (type = ANY (ARRAY['income'::text, 'expense'::text])),
  description text,
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT transactions_pkey PRIMARY KEY (id),
  CONSTRAINT transactions_appointment_id_fkey FOREIGN KEY (appointment_id) REFERENCES public.appointments(id),
  CONSTRAINT transactions_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(id)
);