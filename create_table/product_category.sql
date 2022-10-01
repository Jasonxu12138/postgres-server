-- SELECT * FROM Erp_product;
-- insert into Erp_product(product_id ,code, product_name, bar_code, product_weight, mid_qty,props_id, brand_id, tax_pct, unit, created_At, updated_At, is_Processed, is_new)
-- VALUES ('11111', '1111', 'sb', 's1l','10101010101001010101', '2313', 'asdda','asdad', 'asdasd','100', now(), now(), false, true);
--
--



SELECT * FROM Erp_product;
INSERT INTO Erp_Product VALUES ('11111', '11111', 'sb', 's1l',
        '10101010101001010101', '2313', '','', '',
         '100', now(), now(), false, true);
ON conflict(product_id);
DO UPDATE SET code = '1asda11', product_name = '2323',
                                 product_weight = '134232',
                                 mid_qty = '2',
                                 props_id = '2',
                                 brand_id = '0',
                                 tax_pct = 'null',
                                 unit = '29',
                                 updatedAt = now(),
                                 is_Processed = false,
                                 is_new = false;


--
-- insert into Erp_product(product_id ,code, product_name, bar_code, product_weight, mid_qty,props_id, brand_id, tax_pct, unit, created_At, updated_At, is_Processed, is_new)
-- VALUES ('11111', '1111', 'sb', 's1l','10101010101001010101', '2313', 'asdda','asdad', 'asdasd','100', now(), now(), false, true);