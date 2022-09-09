select o.customer_number,o.order_number, od.quantity, od.unit_price
from orders as o
inner join orderdetails as od
ON od.order_number = o.order_number
where o.order_number = (request.querystring)