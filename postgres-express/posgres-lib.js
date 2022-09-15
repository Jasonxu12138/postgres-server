module.exports = {




    insertEmployee: function insertEmployee(param1, param2, param3, param4, param5) {
        return `insert into employee(employee_uid, employee_name, email_address, phone, job_title, office_code)
        values (uuid_generate_v4(),${param1},'${param2}','${param3}','${param4}','${param5}')`
},


    insertCustomers: function insertCustomers(param1, param2) {
        return `insert into customers(customer_uid, customer_name, phone, address_line, city, postal_code,sales_rep_employee_num, credit)
        values('uuid_generate_v4()','${param1}','${param2}','${param3}','${param4}','${param5}','uuid_generate_v4()',${param5})`
},


    insertOrderDetails: function insertOrderDetails(param1, param2) {
    return `insert into orderdetails(order_uid, product_code, quantity, unit_price)
    values('uuid_generate_v4()','${param1}','${param2}')`
},

    insertOrder: function insertOrder(param1, param2, param3, param4) {
    return `insert into orders(order_uid,order_date,required_date,shipped_date,statues,customer_number)
    values                    ('${uuid_generate_v4()}','${now()}','2${param1}','${param2}','${param3}','${param4}')`
    
},

    insertProduct: function insertProduct(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10, param11) {
    return `insert into product(created_at, updated_at, product_uid, product_name, productcategoryid, brand, quantity_in_stock, unit_price, mainimgurl, descimg, level_1_id,level_2_id, color,size)
    values ('now()', 'now()', '${uuid_generate_v4()}','${param1}', '${param2}', '${param3}', ${param4}, ${param5}, '${param6}','${param7}','${param8}','${param9}','${param10}','${param11}')`
},

    insertCustomers: function insertCustomers(param1, param2, param3) {
    return `insert into orderdetails(order_number, product_code, quantity, unit_price)
    values('${param1}','${param2}',${param3})`
},




}