update product
set quantity_in_stock = quantity_in_stock - (select sum(shipping_quantity)From orderdetials where product.product_id = orderdetails.product_id)
