BEGIN;

TRUNCATE TABLE
  payments
  RESTART IDENTITY CASCADE;

INSERT INTO payments (amount, payment_date, payment_type, payment_status, paid_by, bill_id)
VALUES  
  ('40.75','2021-04-01','BALANCE','PAID_IN_FULL',1,1),
  ('40.75','2021-04-01','BALANCE','PAID_IN_FULL',2,2),
  ('40.75','2021-04-01','BALANCE','PAID_IN_FULL',3,3),
  ('20.50','2021-02-01','BALANCE','PARTIAL_PAYMENT',4,4),
  ('20.25','2021-03-01','BALANCE','PARTIAL_PAYMENT',4,4),
  ('40.75','2021-04-01','ADVANCE','PAID_IN_FULL',4,8);
  

COMMIT;