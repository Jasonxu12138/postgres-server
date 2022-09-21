module.exports = {


    insertEmployee: function insertemployee(param1, param2, param3, param4, param5) {
        return `create EXTENSION IF NOT EXISTS "uuid-ossp"
        insert into employee(employee_uid, employee_name, email_address, phone, job_title, office_code)
        values (uuid_generate_v4(),${param1},'${param2}','${param3}','${param4}','${param5}')`
    },


    insertCustomers: function insertcustomers(param1, param2, param3, param4, param5) {
        return `create EXTENSION IF NOT EXISTS "uuid-ossp"
        insert into customers(customer_uid, customer_name, phone, address_line, city, postal_code,sales_rep_employee_num, credit)
        values('uuid_generate_v4()','${param1}','${param2}','${param3}','${param4}','${param5}','uuid_generate_v4()',${param5})`
    },


    insertOrderDetails: function insertorderdetails(param1, param2) {
        return `create EXTENSION IF NOT EXISTS "uuid-ossp"
    insert into orderDetails(order_uid, product_code, quantity, unit_price)
    values('uuid_generate_v4()','${param1}','${param2}')`
    },

    insertOrder: function insertOrder(param1, param2, param3, param4) {
        return `create EXTENSION IF NOT EXISTS "uuid-ossp"
    insert into orders(order_uid,order_date,required_date,shipped_date,statues,customer_number)
    values('uuid_generate_v4()','${now()}','2${param1}','${param2}','${param3}','${param4}')`

    },

    insertProduct: function insertProduct(product_name, productcategoryid, brand, quantity_in_stock, unit_price, mainImgUrl, desCimg, level_1_id, level_2_id, color, size) {
        return `insert into product(created_at, updated_at, product_uid, product_name, productcategoryid, brand, quantity_in_stock,unit_price, mainimgurl, descimg, level_1_id,level_2_id, color, size)
    values (now(), now(), uuid_generate_v4(),'${product_name}', '${productcategoryid}', '${brand}', ${quantity_in_stock}, ${unit_price}, '${mainImgUrl}','${desCimg}','${level_1_id}','${level_2_id}','${color}','${size}')`
    },

    listOrderByOrderId: function listOrderByOrderId(request_querystring) {
        return ` select o.customer_number,o.order_number, od.quantity, od.unit_price
            from orders as o
            inner join orderdetails as od
            ON od.order_number = o.order_number
            where o.order_number = (${request_querystring})
    `
    },
    listOrderDetailTotalAmount: function listOrderDetailTotalAmount() {
        return `select unit_price * quantity as total_amount
        from orderdetails`

    },

    listOrdersByCustomerNumber: function listOrdersByCustomerNumber() {
        return `select o.customer_number,o.order_number, od.quantity, od.unit_price, p.product_code, p.product_name
        from orderdetails as od
        inner join orders as o
        ON od.order_number = o.order_number
        inner join products as p
        ON od.product_code = p.product_code
        where customer_number = '101'`
    },

    listUserOrderUpdateStock: function listUserOrderUpdateStock() {
        return `update product
        set quantity_in_stock = quantity_in_stock - (select sum(shipping_quantity)From orderdetials where product.product_id = orderdetails.product_id)`
    },


    insertErpProduct: function insertErpProduct(productID, code, product_name, bar_code, product_weight, mid_qty, props_id, brand_id,
                                                tax_pct, unit) {
        return `insert into ErpProduct(product_id, code, product_name, bar_code, product_weight, 
                mid_qty,props_id, brand_id, tax_pct, unit, created_At, updated_At, is_Processed)
                values ('${productID}', '${code}', '${product_name}', '${bar_code}', '${product_weight}', '${mid_qty}', '${props_id}', '${brand_id}', '${tax_pct}',
                '${unit}', now(), now(), false)`
    },

    updateErpProduct: function updateErpProduct(code, productName, productWeight, mid_qty, props_id, brand_id,
                                                tax_pct, unit, productID) {
        return ` update ErpProduct
                set code = '${code}'
                    productName = '${productName}'
                    productWeight = '${productWeight}'
                    mid_qty = '${mid_qty}'
                    props_id = '${props_id}'
                    brand_id = '${brand_id}'
                    tax_pct = '${tax_pct}'
                    unit = '${unit}'
                    updatedAt = now(),
                    isProcessed = false
                where productID = '${productID}'
                `
    },

    reqErpProduct: function reqErpProduct (){
        return ` select * 
                 from ErpProduct
                 where is_processed = false
        `
    },

    updatedErpProduct: function updatedErpProduct (productID){
        return` update ErpProduct 
                set is_processed = true
                where product_id = '${productID}'
        `
    },

    insertErpProductStock: function insertErpProductStock(productID,stock){
        return` insert into Erp_product_stock(product_id, stock)
                values ('${productID}', '${stock}')
        `
    },

    updateErpProductStock: function updateErpPrdouctStock (stock, productID){
        return` update Erp_product_stock
                set stock = ${stock}
                where product_id = '${productID}'
        `
    },

    reqErpProductStock: function reqErpProductStock (){
        return ` select * 
                 from ErpProduct
                 where is_processed = false
        `
    },

    insertErpProductPrice: function insertErpProductPrice(productID,price0, price1, price2, price3, price4, price5, price6, price7 ){
        return ` insert into Erp_product_price(product_id, price_0, price_1, price_2, price_3, price_4, price_5, price_6, price_7)
                 values ('${productID}', ${price1}, ${price2}, ${price3}, ${price4}, ${price5}, ${price6}, ${price7})
        `
    },


    updateErpProductPrice: function updateErpProductPrice(price0, price1, price2, price3, price4, price5, price6, price7, productID){
        return` update Erp_product_price
                set price_0 = ${price0}
                    price_1 = ${price1}
                    price_2 = ${price2}
                    price_3 = ${price3}
                    price_4 = ${price4}
                    price_5 = ${price5}
                    price_6 = ${price6}
                    price_7 = ${price7}
                where product_id = '${productID}'
                    
        `
    },

    reqErpProductPrice: function reqErpProductPrice (){
        return ` select * 
                 from ErpProduct
                 where is_processed = false
        `
    },

}
