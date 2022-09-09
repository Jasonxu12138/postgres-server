select o.customer_number,o.order_number, od.quantity, od.unit_price, p.product_code, p.product_name
from orderdetails as od
inner join orders as o
ON od.order_number = o.order_number
inner join products as p
ON od.product_code = p.product_code
where customer_number = '101'