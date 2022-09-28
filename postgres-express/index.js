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

const pool_production = new Pool({
  user: 'postgres',
  host: '47.104.211.31',
  database: 'jason_test1',
  password: 'baddbg',
  port: 5432,
})

const pool_dev = new Pool({
  user: 'jason',
  host: 'localhost',
  database: 'DB',
  password: 'jasonsql',
  port: 5432,
})

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

app.post("/insert-ErpProduct",async function(req, res){
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
            for (let i = 0; i < data.length; i++) {
                let productID = data[0].id
                let code = data[0].code
                let product_name = data[0].name
                let bar_code = data[0].barcode
                let product_weight = data[0].weight
                let mid_qty = data[0].mid_qty
                let props_id = data[0].props_id
                let brand_id = data[0].brand_id
                let tax_pct = data[0].tax_pct
                let unit = data[0].unit
                let is_new = data[0].is_new
                let queryRes = await pool_dev.query(POSTGRES.upsertErpProduct(productID, code, product_name, bar_code, product_weight, mid_qty, props_id, brand_id, tax_pct, unit, is_new))
                if (queryRes.rowCount === 1)
                    successCount += successCount + 1
                else if (queryRes.rowCount === 0) {
                    failCount += failCount + 1
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
                let queryRes = await pool_dev.query(POSTGRES.processedErpProduct(productID))
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
        // console.log(e)
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
