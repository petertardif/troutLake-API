BEGIN;

TRUNCATE TABLE
  sites
  RESTART IDENTITY CASCADE;

INSERT INTO sites (site_number, tl_address, tl_city, tl_state, tl_zip_code, tl_road_side, tl_phone_number, trout_lake_water, land_company, owners_association,user_id)
VALUES  
  (1,'81 Golden Horn Road','Trout Lake','CO',11111,'NORTH','TL12223333',true,'TROUT_LAKE_LAND_COMPANY','TLC_OWNERS_ASSOCIATION',1),
  (2,'82 Golden Horn Road','Trout Lake','CO',22222,'NORTH','TL23334444',true,'TROUT_LAKE_LAND_COMPANY','TLC_OWNERS_ASSOCIATION', 2),
  (3,'83 Golden Horn Road','Trout Lake','CO',33333,'SOUTH','TL34445555',false,'LIZARD_HEAD_LAND_COMPANY','LHLC_OWNERS_ASSOCIATION',3),
  (4,'84 Golden Horn Road','Trout Lake','CO',44444,'SOUTH','TL45556666',false,'LIZARD_HEAD_LAND_COMPANY','LHLC_OWNERS_ASSOCIATION',1);
   

COMMIT;