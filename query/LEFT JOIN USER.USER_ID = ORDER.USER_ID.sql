

where sum_total = quantity * unit_price * (100-discount)/100


create view final_join as 
select o.order_id, o.customer_id, o.shipped_postalcode,o.shipped_address,ot.product_id,p.prodcut_name,p.img_url,ot.unit_price,ot.quantity,ot.sum_total
from order_details as ot
inner join orders as o
on ot.order_id = o.order_id
inner join products as p
on ot.product_id = p.product_id 


update products 
set unit_price = 9.00
where product_id = '100201'








