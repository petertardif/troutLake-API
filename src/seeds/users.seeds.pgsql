BEGIN;

TRUNCATE TABLE
  users
  RESTART IDENTITY CASCADE;

INSERT INTO users (last_name, first_name, address, city, state, zip_code, perm_phone_number, email, password,role)
VALUES  
  ('last1','first1','111 address st','1City','CO',14201,'1112223333','email1@test.com','password1','ADMIN'),
  ('last2','first2','222 address st','2City','CO',14202,'2223334444','email2@test.com','password2','OWNER'),
  ('last3','first3','333 address st','3City','CO',14203,'3334445555','email3@test.com','password3','OWNER'),
  ('last4','first4','444 address st','4City','CO',14204,'4445556666','email4@test.com','password4','OWNER');

COMMIT;