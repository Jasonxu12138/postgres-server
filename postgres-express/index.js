const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const {v4: uuidv4, stringify} = require('uuid');
const uuid = require('uuid');
const pg = require('pg');

const POSTGRES = require('./posgres-lib')


app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)


let dbName = 'DB'
// let dbName = 'jason'
// let dbName = 'HomeHome'

let dbConnection = POSTGRES.devDbConnection(dbName)
// let dbConnection = POSTGRES.prodDbConnection(dbName)


app.post("/init-table", async function (req, res) {
    let result = {}
    let tableName = req.params.tableName
    try {
        let createTableResult1 = await dbConnection.query(POSTGRES.createHHErpProductTable())
        let createTableResult2 = await dbConnection.query(POSTGRES.createHHErpProductStockTable())
        let createTableResult3 = await dbConnection.query(POSTGRES.createHHErpProductPriceTable())
        console.log(createTableResult1)
        console.log(createTableResult2)
        console.log(createTableResult3)
        result.createTableResult1 = createTableResult1
        result.createTableResult2 = createTableResult2
        result.createTableResult3 = createTableResult3
    } catch (e) {
        result.error = "internal server error"
        result.errorCode = "pg-386"
        result.errorMessage = e.message
        res.status(500)
    }
    return res.send(result)
})

app.post("/rebuild-table/:tableName", async function (req, res) {
    // table name: Erp_Product, Erp_product_stock, Erp_product_price, homehome_branch
    let result = {}
    let tableName = req.params.tableName
    try {
        console.log("Dropping table: ", tableName)
        let createTableResult = await dbConnection.query(POSTGRES.dropTable(tableName))
        console.log(createTableResult)
        console.log("finished Dropping table: ", tableName)
        console.log("creating table: ", tableName)
        if (tableName === "Erp_Product") {
            let createTableResult = await dbConnection.query(POSTGRES.createHHErpProductTable())
            console.log(createTableResult)
        } else if (tableName === "Erp_product_stock") {
            let createTableResult = await dbConnection.query(POSTGRES.createHHErpProductStockTable())
            console.log(createTableResult)
        } else if (tableName === "Erp_product_price") {
            let createTableResult = await dbConnection.query(POSTGRES.createHHErpProductPriceTable())
            console.log(createTableResult)
        } else if (tableName === "homehome_branch") {
            let createTableResult = await dbConnection.query(POSTGRES.createHHBranchTable())
            console.log(createTableResult)
        }
    } catch (e) {
        result.error = "internal server error"
        result.errorCode = "pg-345"
        result.errorMessage = e.message
        res.status(500)
    }
    return res.send(result)
})

app.post("/rebuild-all-table", async function (req, res) {
    // table name: Erp_Product, Erp_product_stock, Erp_product_price, homehome_branch
    let result = {}
    let tableName = req.params.tableName
    try {
        console.log("Dropping table")
        let dropTableResult1 = await dbConnection.query(POSTGRES.dropTable("Erp_Product"))
        let dropTableResult2 = await dbConnection.query(POSTGRES.dropTable("Erp_product_stock"))
        let dropTableResult3 = await dbConnection.query(POSTGRES.dropTable("Erp_product_price"))
        let dropTableResult4 = await dbConnection.query(POSTGRES.dropTable("homehome_branch"))
        console.log("finished Dropping table")
        console.log("creating table")
        let createTableResult1 = await dbConnection.query(POSTGRES.createHHErpProductTable())
        console.log(createTableResult1)
        let createTableResult2 = await dbConnection.query(POSTGRES.createHHErpProductStockTable())
        console.log(createTableResult2)
        let createTableResult3 = await dbConnection.query(POSTGRES.createHHErpProductPriceTable())
        console.log(createTableResult3)
        let createTableResult4 = await dbConnection.query(POSTGRES.createHHBranchTable())
        console.log(createTableResult4)
    } catch (e) {
        result.error = "internal server error"
        result.errorCode = "pg-345"
        result.errorMessage = e.message
        res.status(500)
    }
    return res.send(result)
})

app.post("/create-table", async function (req, res) {
    // table name: Erp_Product, Erp_product_stock, Erp_product_price, homehome_branch
    let result = {}
    try {
        let createTableResult1 = await dbConnection.query(POSTGRES.createHHOrderTable())
        console.log(createTableResult1)
    } catch (e) {
        result.error = "internal server error"
        result.errorCode = "pg-345"
        result.errorMessage = e.message
        res.status(500)
    }
    return res.send(result)
})

app.post("/create-table-order-detail", async function (req, res) {
    // table name: Erp_Product, Erp_product_stock, Erp_product_price, homehome_branch
    let result = {}
    try {
        let createTableResult1 = await dbConnection.query(POSTGRES.createHHOrderDetailTable())
        console.log(createTableResult1)
    } catch (e) {
        result.error = "internal server error"
        result.errorCode = "pg-345"
        result.errorMessage = e.message
        res.status(500)
    }
    return res.send(result)
})



app.get('/', (request, response) => {
    response.json({info: 'Node.js, Express, and Postgres APIIIIIIIIIIIIII'})
})


app.post("/create-order", async function (req, res) {
    // table name: Erp_Product, Erp_product_stock, Erp_product_price, homehome_branch
    let result = {}
    try {
        let o_id = uuid.v1().replace(/-/g, '')
        let order_id = o_id
        let user_id = req.body.user_id
        let wxopen_id = req.body.wxopen_id
        let user_name = req.body.user_name
        let order_total = req.body.order_total
        let branch_id = req.body.branch_id
        let shipment_id = req.body.shipment_id
        let membership_level = req.body.membership_level
        let payment_time = req.body.payment_time
        let pickup_time = req.body.pickup_time
        let product_id = req.body.product_id
        let qty = req.body.qty
        let unit_price = req.body.unit_price
        let coupon_id = req.body.coupon_id

        let createTableResult1 = await dbConnection.query(POSTGRES.insertOrderAndOrderDetail(
            order_id,
            user_id,
            wxopen_id,
            user_name,
            order_total,
            branch_id,
            shipment_id,
            membership_level,
            payment_time,
            pickup_time,
            product_id,
            qty,
            unit_price,
            coupon_id))
    } catch (e) {
        result.error = "internal server error"
        result.errorCode = "pg-345"
        result.errorMessage = e.message
        res.status(500)
    }
    return res.send(result)
})

app.post("/erp-data-pipe", async function (req, res) {
    let responseObject = {
        "success": true,
        "msg": "",
    }
    if (req.query.action === "UpdErpProduct") {
        console.log("updating product")
    } else if (req.query.action === "SaveErpProductStock") {
        console.log("updating stock")
    } else if (req.query.action === "SaveErpProductPrice") {
        console.log("updating price")
    } else if (req.query.action === "ClearErpProductStock") {
        console.log("ClearErpProductStock")
    } else if (req.query.action === "SaveErpCardType") {
        console.log("updating card")
    }
    return res.status(200).send(responseObject)
})

app.post("/upsert-ErpProduct", async function (req, res) {
    let result = {}
    let successCount = 0
    let failCount = 0
    let failCountIdArr = []
    let data = req.body.data

    try {
        if (!Array.isArray(data) || data.length === 0) {
            result.error = "invalid request product array."
            result.errorCode = "pg-77"
            res.status(400)
        } else {
            for (let singleData of data) {
                let productID = singleData.id
                let code = singleData.code
                let product_name = singleData.name
                let bar_code = singleData.barcode
                let product_weight = singleData.weight
                let mid_qty = singleData.mid_qty
                let props_id = singleData.props_id
                let brand_id = singleData.brand_id
                let tax_pct = singleData.tax_pct
                let unit = singleData.unit
                let is_new = singleData.is_new
                let queryRes = await dbConnection.query(POSTGRES.upsertErpProduct(productID, code, product_name, bar_code, product_weight, mid_qty, props_id, brand_id, tax_pct, unit, is_new))
                if (queryRes.rowCount === 1) {
                    successCount = successCount + 1
                } else if (queryRes.rowCount === 0) {
                    failCount = failCount + 1
                    failCountIdArr.push(productID)
                } else {
                    console.log(queryRes)
                    throw new Error("exception other than 0 and 1")
                }
            }
            console.log(successCount)
            console.log(failCount)
            console.log(failCountIdArr)
            result.successCount = successCount
            result.failCount = failCount
            result.failedID = failCountIdArr
            res.status(201)
        }
    } catch (e) {
        result.error = "internal server error"
        result.errorCode = "pg-115"
        // console.log(e)
        result.errorMessage = e.message
        res.status(500)
    }
    return res.send(result)
})

app.post("/processed-erp-product", async function (req, res) {
    let result = {}
    let productsArr = req.body.productID
    let successCount = 0
    let failCount = 0
    let failCountIdArr = []
    try {
        if (!Array.isArray(productsArr) || productsArr.length === 0) {
            result.error = "invalid request product array."
            result.errorCode = "pg-128"
            res.status(400)
        } else {
            for (let i = 0; i < productsArr.length; i++) {
                let productID = req.body.productID[i]
                let queryRes = await dbConnection.query(POSTGRES.processedErpProduct(productID))
                if (queryRes.rowCount === 1) {
                    successCount = successCount + 1
                } else if (queryRes.rowCount === 0) {
                    failCount += 1
                    failCountIdArr.push(productID)
                } else {
                    throw new Error("exception other than 0 and 1")
                }
            }
            console.log(successCount)
            console.log(failCount)
            console.log(failCountIdArr)
            result.successCount = successCount
            result.failCount = failCount
            result.failedID = failCountIdArr
            res.status(201)
        }
    } catch (e) {
        result.error = "internal server error"
        result.errorCode = "pg-159"
        result.errorMessage = e.message
        res.status(500)
    }
    return res.send(result)
})

app.get("/req-erp-product", async function (req, res) {
    let result = {}
    try {
        let queryRes = await dbConnection.query(POSTGRES.reqErpProduct())
        let queryRow = queryRes.rows
        result.data = queryRow
        result.totalCount = queryRow.length
        res.status(200)
    } catch (e) {
        result.error = "internal server error"
        result.errorCode = "pg-179"
        console.log(e)
        result.errorMessage = e.message
        res.status(500)
    }

    return res.send(result)
})

app.post("/upsert-erp-product-price", async function (req, res) {
    let result = {}
    let successCount = 0
    let failCount = 0
    let failCountIdArr = []
    let data = req.body.data

    try {
        if (!Array.isArray(data) || data.length === 0) {
            result.error = "invalid request product array."
            result.errorCode = "pg-198"
            res.status(400)
        } else {
            for (let singleData of data) {
                let productID = singleData.id
                let price0 = singleData.price0
                let price1 = singleData.price1
                let price2 = singleData.price2
                let price3 = singleData.price3
                let price4 = singleData.price4
                let price5 = singleData.price5
                let price6 = singleData.price6
                let price7 = singleData.price7
                // console.log(price5, price6, price7)

                console.log(singleData)
                let queryRes = await dbConnection.query(POSTGRES.upsertErpProductPrice(productID, price0, price1, price2, price3, price4, price5, price6, price7))
                if (queryRes.rowCount === 1)
                    successCount = successCount + 1
                else if (queryRes.rowCount === 0) {
                    failCount = failCount + 1
                    failCountIdArr.push(productID)
                } else {
                    console.log(queryRes)
                    throw new Error("exception other than 0 and 1")
                }
            }
            console.log(successCount)
            console.log(failCount)
            console.log(failCountIdArr)
            result.successCount = successCount
            result.failCount = failCount
            result.failedID = failCountIdArr
            res.status(201)
        }
    } catch (e) {
        result.error = "internal server error"
        result.errorCode = "pg-236"
        // console.log(e)
        result.errorMessage = e.message
        res.status(500)
    }
    return res.send(result)
})

app.get("/req-erp-product-price", async function (req, res) {
    let result = {}
    let productID = req.body.id
    try {
        let queryRes = await dbConnection.query(POSTGRES.reqErpProductPrice(productID))
        let queryRow = queryRes.rows
        result.data = queryRow
        result.totalCount = queryRow.length
        res.status(200)
    } catch (e) {
        result.error = "internal server error"
        result.errorCode = "pg-256"
        console.log(e)
        result.errorMessage = e.message
        res.status(500)
    }

    return res.send(result)
})

app.post("/upsert-erp-product-Stock", async function (req, res) {
    let result = {}
    let successCount = 0
    let failCount = 0
    let failCountIdArr = []
    let data = req.body.data

    try {
        if (!Array.isArray(data) || data.length === 0) {
            result.error = "invalid request product array."
            result.errorCode = "pg-275"
            res.status(400)
        } else {
            for (let singleData of data) {
                let productID = singleData.id
                let branchID = singleData.branchID
                let stock = singleData.stock

                console.log(singleData)
                let queryRes = await dbConnection.query(POSTGRES.upsertErpProductStock(productID, branchID, stock))
                if (queryRes.rowCount === 1)
                    successCount = successCount + 1
                else if (queryRes.rowCount === 0) {
                    failCount = failCount + 1
                    failCountIdArr.push(productID)
                } else {
                    console.log(queryRes)
                    throw new Error("exception other than 0 and 1")
                }
            }
            console.log(successCount)
            console.log(failCount)
            console.log(failCountIdArr)
            result.successCount = successCount
            result.failCount = failCount
            result.failedID = failCountIdArr
            res.status(201)
        }
    } catch (e) {
        result.error = "internal server error"
        result.errorCode = "pg-115"
        // console.log(e)
        result.errorMessage = e.message
        res.status(500)
    }
    return res.send(result)
})

app.get("/req-erp-product-stock/:productID", async function (req, res) {
    let result = {}
    let productID = req.params.productID
    try {
        let queryRes = await dbConnection.query(POSTGRES.reqErpProductStock(productID))
        let queryRow = queryRes.rows
        result.data = queryRow
        result.totalCount = queryRow.length
        res.status(200)
    } catch (e) {
        result.error = "internal server error"
        result.errorCode = "pg-327"
        console.log(e)
        result.errorMessage = e.message
        res.status(500)
    }

    return res.send(result)
})

app.get("/req-erp-product-with-stock/:productID", async function (req, res) {
    let result = {}
    let productID = req.params.productID
    try {
        let queryRes = await dbConnection.query(POSTGRES.getProductStock(productID))
        let queryRow = queryRes.rows
        result.data = queryRow
        result.totalCount = queryRow.length
        res.status(200)
        console.log(queryRow)
    } catch (e) {
        result.error = "internal server error"
        result.errorCode = "pg-332"
        console.log(e)
        result.errorMessage = e.message
        res.status(500)
    }

    return res.send(result)
})

app.get("/req-erp-product-with-price/:productID", async function (req, res) {
    let result = {}
    let productID = req.params.productID
    try {
        let queryRes = await dbConnection.query(POSTGRES.getProductPrice(productID))
        let queryRow = queryRes.rows
        result.data = queryRow
        result.totalCount = queryRow.length
        res.status(200)
        console.log(queryRow)
    } catch (e) {
        result.error = "internal server error"
        result.errorCode = "pg-332"
        console.log(e)
        result.errorMessage = e.message
        res.status(500)
    }

    return res.send(result)
})

app.get("/req-erp-product-with-price-and-stock/:productID", async function (req, res) {
    let result = {}
    let productID = req.params.productID
    try {
        let queryRes = await dbConnection.query(POSTGRES.getProductStockPrice(productID))
        let queryRow = queryRes.rows
        result.data = queryRow
        result.totalCount = queryRow.length
        res.status(200)
        console.log(queryRow)
    } catch (e) {
        result.error = "internal server error"
        result.errorCode = "pg-332"
        console.log(e)
        result.errorMessage = e.message
        res.status(500)
    }

    return res.send(result)
})


app.post("/insert-erp-sample", async function (req, res) {
    let result = {}
    let sampleErpProduct = {
        "productId": "",
        "code": "test-code",
        "name": "", ///lv包0-4/雪糕0-4/hermes包0-4
        "pinyin": "MKBKB",
        "weight": 2,
        "mid_qty": null,
        "props_id": 38749,
        "brand_id": null,
        "tax_pct": null,
        "barcode": ""
    }
    try {
        let sampleName = ["MK贝壳包", "lv包", "雪糕", "hermes包"]
        for (let i = 0; i < 5; i++) {
            sampleErpProduct.productId = 173270 + i
            sampleErpProduct.name = sampleName[0] + JSON.stringify(i)
            sampleErpProduct.code = "test-code" + i
            sampleErpProduct.barcode = "test-barcode" + i
            let queryRes = await dbConnection.query(POSTGRES.upsertErpProduct(
                sampleErpProduct.productId,
                sampleErpProduct.code,
                sampleErpProduct.name,
                sampleErpProduct.barcode,
                sampleErpProduct.weight,
                sampleErpProduct.mid_qty,
                sampleErpProduct.props_id,
                sampleErpProduct.brand_id,
                sampleErpProduct.tax_pct,
                sampleErpProduct.unit))

            console.log(queryRes)
        }
        for (let i = 0; i < 5; i++) {
            sampleErpProduct.productId = 1732711 + i
            sampleErpProduct.name = sampleName[1] + i
            sampleErpProduct.code = "test-code" + i
            sampleErpProduct.barcode = "test-barcode" + i
            let queryRes = await dbConnection.query(POSTGRES.upsertErpProduct(
                sampleErpProduct.productId,
                sampleErpProduct.code,
                sampleErpProduct.name,
                sampleErpProduct.barcode,
                sampleErpProduct.weight,
                sampleErpProduct.mid_qty,
                sampleErpProduct.props_id,
                sampleErpProduct.brand_id,
                sampleErpProduct.tax_pct,
                sampleErpProduct.unit))


            console.log(sampleErpProduct)
        }
        for (let i = 0; i < 5; i++) {
            sampleErpProduct.productId = 1732722 + i
            sampleErpProduct.name = sampleName[2] + i
            sampleErpProduct.code = "test-code" + i
            sampleErpProduct.barcode = "test-barcode" + i
            let queryRes = await dbConnection.query(POSTGRES.upsertErpProduct(
                sampleErpProduct.productId,
                sampleErpProduct.code,
                sampleErpProduct.name,
                sampleErpProduct.barcode,
                sampleErpProduct.weight,
                sampleErpProduct.mid_qty,
                sampleErpProduct.props_id,
                sampleErpProduct.brand_id,
                sampleErpProduct.tax_pct,
                sampleErpProduct.unit))

            console.log(sampleErpProduct)
        }
        for (let i = 0; i < 5; i++) {
            sampleErpProduct.productId = 1732733 + i
            sampleErpProduct.name = sampleName[3] + i
            sampleErpProduct.code = "test-code" + i
            sampleErpProduct.barcode = "test-barcode" + i
            let queryRes = await dbConnection.query(POSTGRES.upsertErpProduct(
                sampleErpProduct.productId,
                sampleErpProduct.code,
                sampleErpProduct.name,
                sampleErpProduct.barcode,
                sampleErpProduct.weight,
                sampleErpProduct.mid_qty,
                sampleErpProduct.props_id,
                sampleErpProduct.brand_id,
                sampleErpProduct.tax_pct,
                sampleErpProduct.unit))

            console.log(sampleErpProduct)
        }
        // let queryRow = queryRes.rows
        // result.data = queryRow
        // result.totalCount = queryRow.length
        res.status(200)
        // console.log(queryRow)
    } catch (e) {
        result.error = "internal server error"
        result.errorCode = "pg-332"
        console.log(e)
        result.errorMessage = e.message
        res.status(500)
    }

    return res.send(result)
})

app.get("/insert-hh-branch", async function (req, res) {
    let result = {}
    let sampleHHB = {
        "branch_id": "hhb-001",
        "branch_name": "亮美嘉HomeHome分店-001",
    }
    try {
        let queryRes = await dbConnection.query(POSTGRES.getProductStockPrice(productID))
        let queryRow = queryRes.rows
    } catch (e) {
        result.error = "internal server error"
        result.errorCode = "pg-332"
        console.log(e)
        result.errorMessage = e.message
        res.status(500)
    }

    return res.send(result)
})

app.post("/insert-erp-stock-sample", async function (req, res) {
    let result = {}

    // hermes: no stock and price
    // lv no stock
    // ice cream no price
    let sampleErpProductStock = {
        "product_id": "",
        "branch_id": "hhb-001",
        "stock": ""
    }
    try {
        for (let i = 0; i < 5; i++) {
            sampleErpProductStock.productId = 173270 + i
            sampleErpProductStock.stock = 100
            let queryRes = await dbConnection.query(POSTGRES.upsertErpProductStock(
                sampleErpProductStock.productId,
                sampleErpProductStock.branch_id,
                sampleErpProductStock.stock
        ))

            console.log(queryRes)
        }
        for (let i = 0; i < 5; i++) {
            sampleErpProductStock.productId = 1732711 + i
            sampleErpProductStock.stock = 100
            let queryRes = await dbConnection.query(POSTGRES.upsertErpProductStock(
                sampleErpProductStock.productId,
                sampleErpProductStock.branch_id,
                sampleErpProductStock.stock
            ))

            console.log(queryRes)
        }

        for (let i = 0; i < 5; i++) {
            sampleErpProductStock.productId = 1732722 + i
            sampleErpProductStock.stock = 100
            let queryRes = await dbConnection.query(POSTGRES.upsertErpProductStock(
                sampleErpProductStock.productId,
                sampleErpProductStock.branch_id,
                sampleErpProductStock.stock
            ))

            console.log(queryRes)
        }for (let i = 0; i < 5; i++) {
            sampleErpProductStock.productId = 1732733 + i
            sampleErpProductStock.stock = 100
            let queryRes = await dbConnection.query(POSTGRES.upsertErpProductStock(
                sampleErpProductStock.productId,
                sampleErpProductStock.branch_id,
                sampleErpProductStock.stock
            ))

            console.log(queryRes)
        }
        // let queryRes = await dbConnection.query(POSTGRES.upsertErpProductStock(
        //     sampleErpProductStock.productId,
        //     sampleErpProductStock.branch_id,
        //     sampleErpProductStock.stock))
        // let queryRow = queryRes.rows
        // result.data = queryRow
        // result.totalCount = queryRow.length
        // res.status(200)
        // console.log(queryRow)
    } catch (e) {
        result.error = "internal server error"
        result.errorCode = "pg-332"
        console.log(e)
        result.errorMessage = e.message
        res.status(500)
    }

    return res.send(result)
})


app.post("/insert-erp-price-sample", async function (req, res) {
    let result = {}
    let sampleErpProductPrice = {
        "product_id": "",
        "price0": "null", ///lv包0-4/雪糕0-4/hermes包0-4
        "price1": "null",
        "price2": "null",
        "price3": "null",
        "price4": "null",
        "price5": "null",
        "price6": 100.00,
        "price7": "null"
    }
    try {
        for (let i = 0; i < 5; i++) {
            sampleErpProductPrice.productId = 173270 + i
            let queryRes = await dbConnection.query(POSTGRES.upsertErpProductPrice(
                sampleErpProductPrice.productId,
                sampleErpProductPrice.price0,
                sampleErpProductPrice.price1,
                sampleErpProductPrice.price2,
                sampleErpProductPrice.price3,
                sampleErpProductPrice.price4,
                sampleErpProductPrice.price5,
                sampleErpProductPrice.price6,
                sampleErpProductPrice.price7,
            ))

            console.log(queryRes)
        }
        for (let i = 0; i < 5; i++) {
            sampleErpProductPrice.productId = 1732711 + i

            let queryRes = await dbConnection.query(POSTGRES.upsertErpProductPrice(
                sampleErpProductPrice.productId,
                sampleErpProductPrice.price0,
                sampleErpProductPrice.price1,
                sampleErpProductPrice.price2,
                sampleErpProductPrice.price3,
                sampleErpProductPrice.price4,
                sampleErpProductPrice.price5,
                sampleErpProductPrice.price6,
                sampleErpProductPrice.price7,
            ))

            console.log(queryRes)
        }for (let i = 0; i < 5; i++) {
            sampleErpProductPrice.productId = 1732722 + i
            let queryRes = await dbConnection.query(POSTGRES.upsertErpProductPrice(
                sampleErpProductPrice.productId,
                sampleErpProductPrice.price0,
                sampleErpProductPrice.price1,
                sampleErpProductPrice.price2,
                sampleErpProductPrice.price3,
                sampleErpProductPrice.price4,
                sampleErpProductPrice.price5,
                sampleErpProductPrice.price6,
                sampleErpProductPrice.price7,
            ))

            console.log(queryRes)
        }for (let i = 0; i < 5; i++) {
            sampleErpProductPrice.productId = 1732733 + i
            let queryRes = await dbConnection.query(POSTGRES.upsertErpProductPrice(
                sampleErpProductPrice.productId,
                sampleErpProductPrice.price0,
                sampleErpProductPrice.price1,
                sampleErpProductPrice.price2,
                sampleErpProductPrice.price3,
                sampleErpProductPrice.price4,
                sampleErpProductPrice.price5,
                sampleErpProductPrice.price6,
                sampleErpProductPrice.price7,
            ))

            console.log(queryRes)
        }
        // let queryRes = await dbConnection.query(POSTGRES.getProductStockPrice(productID))
        // let queryRow = queryRes.rows
        // result.data = queryRow
        // result.totalCount = queryRow.length
        // res.status(200)
        // console.log(queryRow)
    } catch (e) {
        result.error = "internal server error"
        result.errorCode = "pg-332"
        console.log(e)
        result.errorMessage = e.message
        res.status(500)
    }

    return res.send(result)
})


app.get('/test', async function (req, res) {
    let ress = 9
    if (ress === 9) {
        console.log(res)
    }
    console.log("gg")
})

const port = 9999
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
