BEGIN;

TRUNCATE TABLE
  bills
  RESTART IDENTITY CASCADE;

INSERT INTO bills (year, bill_amount, bill_type, bill_due_date, bill_status, site_id)
VALUES  
  (2021,'40.75','WATER','2021-04-01','DUE',1),
  (2021,'40.75','WATER','2021-04-01','DUE',2),
  (2021,'40.75','WATER','2021-04-01','DUE',3),
  (2021,'40.75','WATER','2021-04-01','DUE',4),
  (2020,'40.75','WATER','2020-04-01','OVERDUE',1),
  (2020,'40.75','WATER','2020-04-01','PAID',2),
  (2020,'40.75','WATER','2020-04-01','PAID',3),
  (2020,'40.75','WATER','2020-04-01','PAID',4);
  

COMMIT;