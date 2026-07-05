-- Optional development seed data. DO NOT run in production.
-- Creates three sample projects across the pipeline so the CRM has content.

select public.submit_consultation(
  'Andi Wijaya', 'andi@example.com', 'PT Maju Bersama', '+628123456789',
  '{"packageId":"umkm","businessType":"startup","goals":["website","seo"],"timeline":"asap","budget":"1to3","meeting":"gmeet","message":"Seed data"}'::jsonb
);

select public.submit_consultation(
  'Siti Rahma', 'siti@example.com', 'Yayasan Cahaya', '+628198765432',
  '{"packageId":"community","businessType":"ngo","goals":["website","dashboard"],"timeline":"1month","budget":"3to10","meeting":"zoom","message":"Seed data"}'::jsonb
);

select public.submit_consultation(
  'Budi Santoso', 'budi@example.com', 'Dinas Kominfo Palu', '+628112223334',
  '{"packageId":"institution","businessType":"government","goals":["internal","erp"],"timeline":"flexible","budget":"10to25","meeting":"offline","message":"Seed data"}'::jsonb
);

-- Advance the last two through the pipeline (requires an admin session,
-- or run as service role which bypasses the is_admin() check via RLS —
-- in the SQL editor you are the service role, so update directly):
update public.projects set status = 'meeting'     where client_email = 'siti@example.com';
update public.projects set status = 'development' where client_email = 'budi@example.com';
