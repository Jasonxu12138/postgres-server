const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const { v4: uuidv4 } = require('uuid');

const db = require('./queries')
const Pool = require('pg').Pool

const POSTGRES = require('./posgres-lib')
const {listBetweenErpProduct} = require("./posgres-lib");
const Console = require("console");


app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

let dbName = 'DB'
let dbConnection = POSTGRES.devDbConnection(dbName)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres APIIIIIIIIIIIIII' })
})

app.post("/erp-data-pipe", async function (req, res) {
  let responseObject =  {
      "success": true,
      "msg": "",
  }
  if (req.query.action === "UpdErpProduct"){
      console.log("updating product")
  }
  else if (req.query.action === "SaveErpProductStock"){
      console.log("updating stock")
  }
  else if (req.query.action === "SaveErpProductPrice"){
      console.log("updating price")
  }
  else if (req.query.action === "ClearErpProductStock"){
      console.log("ClearErpProductStock")
  }
  else if (req.query.action === "SaveErpCardType"){
      console.log("updating card")
  }
  return res.status(200).send(responseObject)
})

app.post("/upsert-ErpProduct",async function(req, res){
    let result = {}
    let successCount = 0
    let failCount = 0
    let failCountIdArr = []
    let data =  req.body.data

    try {
        if (!Array.isArray(data) || data.length === 0) {
            result.error = "invalid request product array."
            result.errorCode = "pg-77"
            res.status(400)
        }
        else {
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
                if (queryRes.rowCount === 1){
                    successCount = successCount + 1
                }
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
    }
    catch (e) {
        result.error = "internal server error"
        result.errorCode = "pg-115"
        // console.log(e)
        result.errorMessage = e.message
        res.status(500)
    }
    return res.send(result)
})

app.post("/processed-erp-product",async function(req, res){
    let result = {}
    let productsArr = req.body.productID
    let successCount = 0
    let failCount = 0
    let failCountIdArr = []
    try{
        if (!Array.isArray(productsArr) || productsArr.length === 0) {
            result.error = "invalid request product array."
            result.errorCode = "pg-128"
            res.status(400)
        }
        else {
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
    }
    catch(e){
        result.error = "internal server error"
        result.errorCode = "pg-159"
        result.errorMessage = e.message
        res.status(500)
    }
    return res.send(result)
})

app.get("/req-erp-product",async function(req, res){
    let result = {}
    try {
        let queryRes = await dbConnection.query(POSTGRES.reqErpProduct())
        let queryRow = queryRes.rows
        result.data = queryRow
        result.totalCount = queryRow.length
        res.status(200)
    }
    catch(e){
        result.error = "internal server error"
        result.errorCode = "pg-179"
        console.log(e)
        result.errorMessage = e.message
        res.status(500)
    }

    return res.send(result)
})

app.post("/upsert-erp-product-price",async function(req, res){
    let result = {}
    let successCount = 0
    let failCount = 0
    let failCountIdArr = []
    let data =  req.body.data

    try {
        if (!Array.isArray(data) || data.length === 0) {
            result.error = "invalid request product array."
            result.errorCode = "pg-198"
            res.status(400)
        }
        else {
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
    }
    catch (e) {
        result.error = "internal server error"
        result.errorCode = "pg-236"
        // console.log(e)
        result.errorMessage = e.message
        res.status(500)
    }
    return res.send(result)
})

app.get("/req-erp-product-price",async function(req, res){
    let result = {}
    let productID = req.body.id
    try {
        let queryRes = await dbConnection.query(POSTGRES.reqErpProductPrice(productID))
        let queryRow = queryRes.rows
        result.data = queryRow
        result.totalCount = queryRow.length
        res.status(200)
    }
    catch(e){
        result.error = "internal server error"
        result.errorCode = "pg-256"
        console.log(e)
        result.errorMessage = e.message
        res.status(500)
    }

    return res.send(result)
})

app.post("/upsert-erp-product-Stock",async function(req, res){
    let result = {}
    let successCount = 0
    let failCount = 0
    let failCountIdArr = []
    let data =  req.body.data

    try {
        if (!Array.isArray(data) || data.length === 0) {
            result.error = "invalid request product array."
            result.errorCode = "pg-275"
            res.status(400)
        }
        else {
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
    }
    catch (e) {
        result.error = "internal server error"
        result.errorCode = "pg-115"
        // console.log(e)
        result.errorMessage = e.message
        res.status(500)
    }
    return res.send(result)
})

app.get("/req-erp-product-stock/:productID",async function(req, res){
    let result = {}
    let productID = req.params.productID
    try {
        let queryRes = await dbConnection.query(POSTGRES.reqErpProductStock(productID))
        let queryRow = queryRes.rows
        result.data = queryRow
        result.totalCount = queryRow.length
        res.status(200)
    }
    catch(e){
        result.error = "internal server error"
        result.errorCode = "pg-327"
        console.log(e)
        result.errorMessage = e.message
        res.status(500)
    }

    return res.send(result)
})

app.get("/req-erp-product-with-stock/:productID",async function(req, res){
    let result = {}
    let productID = req.params.productID
    try {
        let queryRes = await dbConnection.query(POSTGRES.getProductStock(productID))
        let queryRow = queryRes.rows
        result.data = queryRow
        result.totalCount = queryRow.length
        res.status(200)
        console.log(queryRow)
    }
    catch(e){
        result.error = "internal server error"
        result.errorCode = "pg-332"
        console.log(e)
        result.errorMessage = e.message
        res.status(500)
    }

    return res.send(result)
})

app.get("/req-erp-product-with-price/:productID",async function(req, res){
    let result = {}
    let productID = req.params.productID
    try {
        let queryRes = await dbConnection.query(POSTGRES.getProductPrice(productID))
        let queryRow = queryRes.rows
        result.data = queryRow
        result.totalCount = queryRow.length
        res.status(200)
        console.log(queryRow)
    }
    catch(e){
        result.error = "internal server error"
        result.errorCode = "pg-332"
        console.log(e)
        result.errorMessage = e.message
        res.status(500)
    }

    return res.send(result)
})

app.get("/req-erp-product-with-price-and-stock/:productID",async function(req, res){
    let result = {}
    let productID = req.params.productID
    try {
        let queryRes = await dbConnection.query(POSTGRES.getProductStockPrice(productID))
        let queryRow = queryRes.rows
        result.data = queryRow
        result.totalCount = queryRow.length
        res.status(200)
        console.log(queryRow)
    }
    catch(e){
        result.error = "internal server error"
        result.errorCode = "pg-332"
        console.log(e)
        result.errorMessage = e.message
        res.status(500)
    }

    return res.send(result)
})

app.post("/rebuild-table/:tableName",async function(req, res){
    let result = {}
    let tableName = req.params.tableName
    console.log("Dropping tablename: ", tableName)
    try {
        let createTableResult = await dbConnection.query(POSTGRES.dropTable(tableName))
        console.log(createTableResult)
        if (tableName === "Erp_Product"){
            let createTableResult = await dbConnection.query(POSTGRES.createHHErpProductTable())
            console.log(createTableResult)
        }
        else if (tableName === "Erp_product_stock") {
            let createTableResult = await dbConnection.query(POSTGRES.createHHErpProductStockTable())
            console.log(createTableResult)
        }
        else if (tableName === "Erp_product_price"){
            let createTableResult = await dbConnection.query(POSTGRES.createHHErpProductPriceTable())
            console.log(createTableResult)
        }
    }
    catch(e){
        result.error = "internal server error"
        result.errorCode = "pg-345"
        result.errorMessage = e.message
        res.status(500)
    }

    return res.send(result)
})




app.get('/test', async function(req, res){
    let ress  = 9
    if (ress === 9){
        console.log(res)
    }
    console.log("gg")
})

const port = 9999
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
