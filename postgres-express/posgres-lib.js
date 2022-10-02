const {Pool} = require("pg");
const pool = new Pool()
module.exports = {

    //
    // insertEmployee: function insertemployee(param1, param2, param3, param4, param5) {
    //     return `create EXTENSION IF NOT EXISTS "uuid-ossp"
    //     insert into employee(employee_uid, employee_name, email_address, phone, job_title, office_code)
    //     values (uuid_generate_v4(),${param1},'${param2}','${param3}','${param4}','${param5}')`
    // },
    //
    //
    // insertCustomers: function insertcustomers(param1, param2, param3, param4, param5) {
    //     return `create EXTENSION IF NOT EXISTS "uuid-ossp"
    //     insert into customers(customer_uid, customer_name, phone, address_line, city, postal_code,sales_rep_employee_num, credit)
    //     values('uuid_generate_v4()','${param1}','${param2}','${param3}','${param4}','${param5}','uuid_generate_v4()',${param5})`
    // },
    //
    //
    // insertOrderDetails: function insertorderdetails(param1, param2) {
    //     return `create EXTENSION IF NOT EXISTS "uuid-ossp"
    // insert into orderDetails(order_uid, product_code, quantity, unit_price)
    // values('uuid_generate_v4()','${param1}','${param2}')`
    // },
    //
    // insertOrder: function insertOrder(param1, param2, param3, param4) {
    //     return `create EXTENSION IF NOT EXISTS "uuid-ossp"
    // insert into orders(order_uid,order_date,required_date,shipped_date,statues,customer_number)
    // values('uuid_generate_v4()','${now()}','2${param1}','${param2}','${param3}','${param4}')`
    //
    // },
    //
    // insertProduct: function insertProduct(product_name, productcategoryid, brand, quantity_in_stock, unit_price, mainImgUrl, desCimg, level_1_id, level_2_id, color, size) {
    //     return `insert into product(created_at, updated_at, product_uid, product_name, productcategoryid, brand, quantity_in_stock,unit_price, mainimgurl, descimg, level_1_id,level_2_id, color, size)
    // values (now(), now(), uuid_generate_v4(),'${product_name}', '${productcategoryid}', '${brand}', ${quantity_in_stock}, ${unit_price}, '${mainImgUrl}','${desCimg}','${level_1_id}','${level_2_id}','${color}','${size}')`
    // },
    //
    // listOrderByOrderId: function listOrderByOrderId(request_querystring) {
    //     return ` select o.customer_number,o.order_number, od.quantity, od.unit_price
    //         from orders as o
    //         inner join orderdetails as od
    //         ON od.order_number = o.order_number
    //         where o.order_number = (${request_querystring})
    // `
    // },
    // listOrderDetailTotalAmount: function listOrderDetailTotalAmount() {
    //     return `select unit_price * quantity as total_amount
    //     from orderdetails`
    //
    // },
    //
    // listOrdersByCustomerNumber: function listOrdersByCustomerNumber() {
    //     return `select o.customer_number,o.order_number, od.quantity, od.unit_price, p.product_code, p.product_name
    //     from orderdetails as od
    //     inner join orders as o
    //     ON od.order_number = o.order_number
    //     inner join products as p
    //     ON od.product_code = p.product_code
    //     where customer_number = '101'`
    // },
    //
    // listUserOrderUpdateStock: function listUserOrderUpdateStock() {
    //     return `update product
    //     set quantity_in_stock = quantity_in_stock - (select sum(shipping_quantity)From orderdetials where product.product_id = orderdetails.product_id)`
    // },


    upsertErpProduct: function upsertErpProduct(productID,
                                                code,
                                                product_name,
                                                barcode,
                                                product_weight,
                                                mid_qty,
                                                props_id,
                                                brand_id,
                                                tax_pct,
                                                unit) {
        return `insert into erp_product(product_id, code, product_name, barcode, product_weight, mid_qty, props_id,
                                        brand_id, tax_pct,
                                        unit, created_At, updated_At, is_Processed, is_new)
                values ('${productID}', '${code}', '${product_name}', '${barcode}', '${product_weight}', '${mid_qty}',
                        '${props_id}',
                        '${brand_id}', '${tax_pct}', '${unit}', now(), now(), false, true) ON conflict (product_id) DO
        update set code = '${code}',
            product_name = '${product_name}',
            barcode = '${barcode}',
            product_weight = '${product_weight}',
            mid_qty = '${mid_qty}',
            props_id = '${props_id}',
            brand_id = '${brand_id}',
            tax_pct = '${tax_pct}',
            unit = '${unit}',
            updated_At = now(),
            is_Processed = false,
            is_new = false
        `
    }
    ,


    //
    //
    //   upsertErpProduct: function upsertErpProduct(productID, code, product_name, bar_code, product_weight, mid_qty, props_id, brand_id,
    //                                               tax_pct, unit) {
    //       return `DO $$
    //   BEGIN
    //       IF EXISTS
    //           ( SELECT product_id
    //             FROM   Erp_product
    //             WHERE  product_id='${productID}'
    //           )
    // //       THEN
    // //           UPDATE Erp_product
    // //           SET  code='${code}',
    // //                product_name = '${product_name}',
    // //                bar_code='${bar_code}',
    // //                product_weight = '${product_weight}',
    // //                mid_qty = '${mid_qty}',
    // //                props_id = '${props_id}',
    // //                brand_id = '${brand_id}',
    // //                tax_pct = '${tax_pct}',
    // //                unit = '${unit}',
    // //                updated_at = now()
    // //           WHERE product_id='${productID}';
    // //       ELSE
    // //           INSERT INTO Erp_product
    // //           (product_id, code, product_name, bar_code, product_weight, mid_qty, props_id, brand_id, tax_pct, unit, created_At, updated_At, is_Processed, is_new)
    // //           values ('${productID}', '${code}', '${product_name}', '${bar_code}', '${product_weight}','${mid_qty}','${props_id}','${brand_id}','${tax_pct}','${unit}',now(),now(),false, true);
    // //       END IF ;
    // //   END
    // // $$ ;`
    // //   },
    //
    // updateErpProduct: function updateErpProduct(code, productName, productWeight, mid_qty, props_id, brand_id,
    //                                             tax_pct, unit, productID) {
    //     // TODO UPDATED DOC === DB DOC BEHAVIOUR
    //     // TODO NO NEED TO DO TRANSACTION HERE
    //     return `
    //     begin
    //                 begin try
    //                     begin transaction
    //                          update Erp_Product
    //                              set code = '${code}'
    //                              product_name = '${productName}'
    //                              product_weight = '${productWeight}'
    //                              mid_qty = '${mid_qty}'
    //                              props_id = '${props_id}'
    //                              brand_id = '${brand_id}'
    //                              tax_pct = '${tax_pct}'
    //                              unit = '${unit}'
    //                              updatedAt = now(),
    //                              is_Processed = false
    //                              is_new = false
    //                          where productID = '${productID}'
    //                     commit transaction
    //                 end try
    //                 begin catch
    //                     rollback transaction
    //                 end catch
    //     end
    //
    //             `
    // },
    processedErpProduct: function processedErpProduct(productID) {
        // TODO: RENAME FUNCTION
        return ` update Erp_Product
                 set is_processed = true is_new = false
                 where product_id = '${productID}'
        `
    },

    reqErpProduct: function reqErpProduct() {
        return ` select *
                 from Erp_Product
                 where is_processed = false `
    },


    listBetweenErpProduct: function listBetweenErpProduct(timestamp1, timestamp2) {
        return ` select *
                 from Erp_product
                 where between UNIXTIME(${timestamp1})
                   and UNIXTIME(${timestamp2})`
    },

    listToNowErpProduct: function listToNowErpProduct(time_field1) {
        return ` select *
                 from Erp_product
                 where between UNIXTIME(${time_field1}) and now()
        `
    },


    upsertErpProductStock: function upsertErpProductStock(productID, branchID, stock) {
        return ` insert into Erp_product_stock(product_id, branch_id, stock)
                 values ('${productID}', '${branchID}', '${stock}') on conflict (product_id, branch_id) 
                Do
        update set
            product_id = '${productID}',
            branch_id = '${branchID}' ,
            stock = '${stock}'
        `
    },
    //
    // updateErpProductStock: function updateErpPrdouctStock (stock, productID, branchID){
    //     return` update Erp_product_stock
    //             set stock = ${stock}
    //             where product_id = '${productID}' and '${branchID}'
    //     `
    // },

    reqErpProductStock: function reqErpProductStock(productID, branchID) {
        return ` select *
                 from ErpProduct
                 where product_id = '${productID}'
                   and branch_id = '${branchID}'
        `
    },

    upsertErpProductPrice: function upsertErpProductPrice(productID, price0, price1, price2, price3, price4, price5, price6, price7) {
        return ` insert into erp_product_price (product_id, price_0, price_1, price_2, price_3, price_4, price_5,
                                                price_6, price_7)
                 values ('${productID}', ${price0}, ${price1}, ${price2}, ${price3}, ${price4}, ${price5}, ${price6},
                         ${price7}) ON conflict (product_id) 
                 DO
        update set
            price_0 = ${price0},
            price_1 = ${price1},
            price_2 = ${price2},
            price_3 = ${price3},
            price_4 = ${price4},
            price_5 = ${price5},
            price_6 = ${price6},
            price_7 = ${price7};
        `
    },
    getProductStock: function getProductStock() {
        return `select *
                from Erp_product as ep
                         full outer join erp_product_stock as eps
                                         ON ep.product_id = eps.product_id
        `
    },

    getProductPrice: function getProductPrice() {
        return `select *
                from Erp_product as ep
                         full outer join erp_product_price as epp
                                         ON ep.product_id = epp.product_id
        `
    },

    getProductStockPrice: function getProductStockPrice() {
        return `select *
                from Erp_product as ep
                         full outer join erp_product_price as epp
                                         ON ep.product_id = epp.product_id
                         full outer join erp_product_price as epp
                                         ON ep.product_id = epp.product_id
        `
    },


    // updateErpProductPrice: function updateErpProductPrice(price0, price1, price2, price3, price4, price5, price6, price7, productID){
    //
    //     return`
    //                 update Erp_product_price
    //                 set price_0 = ${price0}
    //                     price_1 = ${price1}
    //                     price_2 = ${price2}
    //                     price_3 = ${price3}
    //                     price_4 = ${price4}
    //                     price_5 = ${price5}
    //                     price_6 = ${price6}
    //                     price_7 = ${price7}
    //                 where product_id = '${productID}'
    //     `
    // },

    reqErpProductPrice: function reqErpProductPrice(productID) {
        return ` select *
                 from Erp_Product
                 where product_id = '${productID}'
        `
    },
    createHHErpProductTable: function createHHErpProductTable() {
        return `create table Erp_Product
                (
                    product_id     varchar(100) not null primary key,
                    product_name   varchar(50)  not null,
                    code           varchar(50),
                    barcode        varchar(50),
                    product_weight decimal(10, 2),
                    mid_qty        varchar(50),
                    props_id       varchar(50),
                    brand_id       varchar(50),
                    tax_pct        varchar(50),
                    unit           varchar(50),
                    created_At     timestamp,
                    updated_At     timestamp,
                    is_Processed   boolean,
                    is_new         boolean
                )`
    },
    createHHErpProductStockTable: function createHHErpProductStockTable() {
        return `create table Erp_product_stock
                (
                    product_id varchar(100) not null,
                    branch_id  varchar(100) not null,
                    stock      int          not null,
                    primary key (product_id, branch_id)
                )
        `
    },
    createHHErpProductPriceTable: function createHHErpProductPriceTable() {
        return `create table Erp_product_price
                (
                    product_id varchar(100) not null primary key,
                    price_0    decimal(10, 2),
                    price_1    decimal(10, 2),
                    price_2    decimal(10, 2),
                    price_3    decimal(10, 2),
                    price_4    decimal(10, 2),
                    price_5    decimal(10, 2),
                    price_6    decimal(10, 2),
                    price_7    decimal(10, 2)
                )
        `
    },


    createHHBranchTable: function createHHBranchTable() {
        return `create table homehome_branch
                (
                    branch_id           varchar(100) not null primary key,
                    branch_name         varchar(100) not null,
                    branch_address      varchar(100),
                    branch_phone_number varchar(100),
                    branch_region       varchar(100)
                )
        `
    },

    dropTable: function dropTable(tableName) {
        return `Drop table if exists ${tableName}`
    },


    devDbConnection: function dbConnection(dbName) {
        return new Pool({
            user: 'jason',
            host: 'localhost',
            database: dbName,
            password: 'jasonsql',
            port: 5432,
        })
    },


    prodDbConnection: function dbConnection(dbName) {
        return new Pool({
            user: 'postgres',
            host: '47.104.211.31',
            database: dbName,
            password: 'baddbg',
            port: 5432,
        })
    },

    createHHOrderTable: function createHHOrderTable() {
        return `create table orders
                (
                    order_id         varchar(100)   not null primary key,
                    created_at       timestamp      not null,
                    user_id          varchar(50)    not null,
                    is_active        boolean        not null,
                    wxopen_id        varchar(100),
                    user_name        varchar(10)    not null,
                    order_total      decimal(10, 2) not null,
                    branch_id        varchar(50),
                    shipment_id      varchar(100),
                    membership_level int,
                    payment_time     timestamp,
                    pickup_time      time,
                    order_status     int
                )
        `
    },

    createHHOrderDetailTable: function createHHOrderDetailTable() {
        return `create table order_detail
                (
                    order_id   varchar(100)   not null,
                    product_id varchar(50)    not null,
                    qty        int            not null,
                    created_at timestamp      not null,
                    unit_price decimal(10, 2) not null,
                    coupon_id  varchar(100),
                    primary key (order_id, product_id)
                )
        `
    },
//     insertOrderAndOrderDetail: function insertOrderAndOrderDetail(
//       order_id,
//       user_id,
//       wxopen_id,
//       user_name,
//       order_total,
//       branch_id,
//       shipment_id,
//       membership_level,
//       payment_time,
//       pickup_time,
//       product_id,
//       qty,
//       unit_price,
//       coupon_id)  {
//         return `begin
//                     begin try
//                         begin transaction
//                              insert into order(
//                     order_id,
//                     created_at,
//                     user_id,
//                     is_active,
//                     wxopen_id,
//                     user_name,
//                     order_total,
//                     branch_id,
//                     shipment_id,
//                     membership_level,
//                     payment_time,
//                     pickup_time,
//                     order_status
//                     )
//                 values ('${order_id}', now(),'${user_id}', true, '${wxopen_id}', '${order_total}', '${branch_id}',
//                         '${shipment_id}','${membership_level}', '${payment_time}', '${pickup_time}', 0
//                 )
//                  insert into order_detail(
//                 order_id,
//                 product_id,
//                 qty,
//                 created_at,
//                 unit_price,
//                 coupon_id)
//                 values('${order_id}',
//                        '${product_id}',
//                        ${qty},
//                        now(),
//                        '${unit_price}',
//                        '${coupon_id}'
//                        )
//                     commit transaction
//                 end try
//             begin catch
//                 rollback transaction
//             end catch
//             end`
//     }
// }

    insertOrderAndOrderDetail: async function insertOrderAndOrderDetail(
        order_id, user_id, wxopen_id, user_name, order_total,
        branch_id, shipment_id, membership_level, payment_time,
        pickup_time, product_id, qty, unit_price, coupon_id) {
        let client = await pool.connect()
        try {
            client.query('BEGIN')
            const queryText = 'INSERT INTO users(name) VALUES($1) RETURNING id'
            let queryRes = client.query(queryText, ['brianc'])
            const insertPhotoText = 'INSERT INTO photos(user_id, photo_url) VALUES ($1, $2)'
            const insertPhotoValues = [queryRes.rows[0].id, 's3.bucket.foo']
            client.query(insertPhotoText, insertPhotoValues)
            client.query('COMMIT')
        } catch (e) {
            await client.query('ROLLBACK')
            throw e

        } finally {
            console.log('We do cleanup here');
            client.release()
        }
    },


    updateStockAfterPayment: function updateStockAfterPayment() {
        return ` begin
                    begin try
                        begin transaction
                        update orders
                   set order_status = 1,
                       payment_time = now()
                 update erp_product_stock
                    set stock = stock - od.qty
                    from order_detail
                    where erp_product_stock.product_id = order_detail.product_id
                    stock <= 0
        `
    }
}
