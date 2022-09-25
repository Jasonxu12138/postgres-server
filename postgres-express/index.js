const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const { v4: uuidv4 } = require('uuid');

const db = require('./queries')
const Pool = require('pg').Pool

const POSTGRES = require('./posgres-lib')
const {listBetweenErpProduct} = require("./posgres-lib");


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


app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)


app.get('/products', db.getProducts)

app.get('/json-stupid', db.createTable)
app.get('/create-product/:product_name', db.insertTableProduct_1)



app.post("/insert-product/:sampleParams/", async function (req, res) {
  // let data = req.body
  // console.log(data)
  // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!")
  // console.log(req.params.sampleParams)

  let uuid1 = uuidv4()
  // console.log(uuidv4())
  // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!")


  // const now = new Date();
  // const isoString = now.toISOString();
  // console.log(isoString)



  // let productID = req.params.sampleParams
  // console.log(productID)
  pool_dev.query(
        `insert into product(created_at, updated_at, product_id, product_name, productcategoryid, brand, quantity_in_stock, unit_price, mainimgurl, descimg, level_1_id,level_2_id, color,size)
    values ('2021-03-04 12:23:45', '2022-05-09 11:22:58', '${uuid_generate_v4()}','macbook 256g', 'pc0001', 'china,guangzhou', 1000, 29.99, 'asdlakjdasdjqw23423','1ehashdia2bakjsd1213','lv10001','lv20001','blue','256g')`, (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })


}),

app.get("/oooo/:sampleParams/:quantity", async function (req, res) {
  // {params: {sampleParams:xxxxx, quantity: adsdfsfsdf} }
  let productID = req.params.sampleParams
  let quantity = req.params.quantity
  console.log(productID)
  console.log(quantity)
  // console.log(req.body)
  console.log(req.body.name)
  console.log(req.body.quantity)
  console.log(req.body.stupid)


  console.log("hi, i am" + "stupid" + req.body.stupid)
  console.log("jason" + req.body.jason + req.body.stupid)


  console.log(1 + req.body.one)
  console.log(1 + req.body.stupid)
  // let field1 = req.body.field1
  // let field2 = req.body.field2
  // let field3 = req.body.field3
  // let field4 = req.body.field4

// const pool = new Pool({
//   user: 'jason',
//   host: 'localhost',
//   database: 'jason',
//   password: 'jasonsql',
//   port: 5432,
// })
//     pool.query(
//       `INSERT INTO Product_1
//     (T, TRACK, P, U)
//    VALUES
//     ('2022-10-10','${productID}','${quantity}','台');`, (error, results) => {
//       if (error) {
//         throw error
//       }
//       res.status(200).json(results.rows)
//     })


  //   let obj1 = "productID"
  //   let obj2 = `${productID}`
  //   console.log(obj1)
  //   console.log(obj2)
  //   console.log("!!!!!!!!!!!!!!!!!!!!!!")

  // res.send({ 'productID': productID, "quantity": quantity })

  res.status(200).json("ok")
  
})




app.post("/insert-product/:sampleParams/", async function (req, res) {
  // let data = req.body
  // console.log(data)
  // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!")
  // console.log(req.params.sampleParams)

  // let uuid1 = uuidv4()
  // console.log(uuidv4())
  // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!")


  // const now = new Date();
  // const isoString = now.toISOString();
  // console.log(isoString)



  // let productID = req.params.sampleParams
  // console.log(productID)
  pool_dev.query(
        `insert into product(created_at, updated_at, product_id, product_name, productcategoryid, brand, quantity_in_stock, unit_price, mainimgurl, descimg, level_1_id,level_2_id, color,size)
    values ('2021-03-04 12:23:45', '2022-05-09 11:22:58', '${uuid_generate_v4()}','macbook 256g', 'pc0001', 'china,guangzhou', 1000, 29.99, 'asdlakjdasdjqw23423','1ehashdia2bakjsd1213','lv10001','lv20001','blue','256g')`, (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })


})

app.post("/insert-orderdetail/:orderdetail",async function(req, res){
pool_dev.query(
  `insert into orderdetails(order_number, product_code, quantity, unit_price)
values('1001','00001',100,99.99),('1002','00002',90,1000),('1001','00002',100,99)
values('1003','00003',100,10),('1004','00004',10,1)`, (error, results)=>{
    if(error){
      throw error
    }
    res.status(200).json(results.rows)

  })
})


app.post("/insert-orderdetail",async function(req, res){

  let category = req.params.category

  pool_dev.query(POSTGRES.insertOrderDetails(req.body.one, req.body.name), (error, results)=>{
      if(error){
        throw error
      }
    })
  res.send("okkkkkkk")
  })

app.post("/insert-order",async function(req, res){

  let category = req.params.category

  pool_dev.query(POSTGRES.insertOrder(req.body.one, req.body.name), (error, results)=>{
    if(error){
      throw error
    }
  })
  res.send("okkkkkkk")
})
app.post("/insert-employee",async function(req, res){

  let category = req.params.category

  pool_dev.query(POSTGRES.insertEmployee(req.body.one, req.body.name), (error, results)=>{
    if(error){
      throw error
    }
  })
  res.send("okkkkkkk")
})

app.post("/insert-customers",async function(req, res){

  let category = req.params.category

  pool_dev.query(POSTGRES.insertCustomers(req.body.one, req.body.name), (error, results)=>{
    if(error){
      throw error
    }
  })
  res.send("okkkkkkk")


})


app.post("/insert-product",async function(req, res){

  // let category = req.params.category
  let productName = req.body.product_name
  let productcategoryid   = req.body.productcategoryid
  let brand = req.body.brand
  let quantity_in_stock = req.body.quantity_in_stock
  let unit_price = req.body.unit_price
  let mainImgUrl = req.body.mainImgUrl
  let desCimg = req.body.desCimg
  let level_1_id = req.body.level_1_id
  let level_2_id = req.body.level_2_id
  let color = req.body.color
  let size = req.body.size

  pool_production.query(POSTGRES.insertProduct(productName, productcategoryid, brand, quantity_in_stock, unit_price, mainImgUrl, desCimg, level_1_id, level_2_id, color, size), (error, results)=>{
    if(error){
      throw error
    }
  })
  res.send("okkkkkkk")
})

app.get("/list-orderByOrderId",async function(req, res){

  let category = req.params.category

  pool_dev.query(POSTGRES.listOrderByOrderId(req.body.name), (error, results)=>{
    if(error){
      throw error
    }
  })
  res.send("okkkkkkk")
})


app.get("/list-OrderDetailTotalAmount",async function(req, res){

  let category = req.params.category
  pool_dev.query(POSTGRES.listOrderDetailTotalAmount(req.body.name), (error, results)=>{
    if(error){
      throw error
    }
    // queryResult = results
    console.log(results)
  })
  res.send("okkkkkkk")
})


app.get("/list-OrdersByCustomerNumber",async function(req, res){

  let category = req.params.category

  pool_dev.query(POSTGRES.listOrdersByCustomerNumber(req.body.name), (error, results)=>{
    if(error){
      throw error
    }
  })
  res.send("okkkkkkk")
})


app.get("/list-UserOrderUpdateStock",async function(req, res){

  let category = req.params.category

  pool_dev.query(POSTGRES.listUserOrderUpdateStock(req.body.name), (error, results)=>{
    if(error){
      throw error
    }
  })
  res.send("okkkkkkk")
})

























app.post("/insert-ErpProduct",async function(req, res){
    let productsArr = req.body.products
    let productID = productsArr[0].id
    let code = productsArr[0].code
    let product_name= productsArr[0].name
    let bar_code = productsArr[0].barcode
    let product_weight = productsArr[0].weight
    let mid_qty = productsArr[0].mid_qty
    let props_id = productsArr[0].props_id
    let brand_id = productsArr[0].brand_id
    let tax_pct = productsArr[0].tax_pct
    let unit = productsArr[0].unit
    console.log(productID)
    console.log(code)
    console.log(product_name)
    console.log(product_weight)
    console.log(mid_qty)
    console.log(props_id)
    console.log(brand_id)
    console.log(tax_pct)
    console.log(unit)
  pool_dev.query(POSTGRES.insertErpProduct(productID,code, product_name, bar_code, product_weight, mid_qty, props_id, brand_id,
      tax_pct, unit), (error, results)=>{
    if(error){
      throw error
    }
    // queryResult = results
    console.log(results)
  })
  res.send("okkkkkkk")
})




app.post("/update-ErpProduct",async function(req, res){

    let productsArr = req.body.products
    // console.log(POSTGRES.updateErpProduct(req.body.products[]))
    let productID = productsArr[0].id
    let code = productsArr[0].code
    let product_name= productsArr[0].name
    let product_weight = productsArr[0].weight
    let mid_qty = productsArr[0].mid_qty
    let props_id = productsArr[0].props_id
    let brand_id = productsArr[0].brand_id
    let tax_pct = productsArr[0].tax_pct
    let unit = productsArr[0].unit
    console.log(productID)
    console.log(code)
    console.log(product_name)
    console.log(product_weight)
    console.log(mid_qty)
    console.log(props_id)
    console.log(brand_id)
    console.log(tax_pct)
    console.log(unit)
    pool_dev.query(POSTGRES.updateErpProduct(code, product_name, product_weight, product_weight,
        mid_qty, props_id, brand_id, tax_pct, unit, productID), (error, results)=>{
        if(error){
            throw error
        }
        // queryResult = results
        console.log(results)
    })
    res.send("okkkkkkk")
})

app.get("/req-ErpProduct",async function(req, res){

    // console.log(POSTGRES.updateErpProduct(req.body.products[]))

    pool_dev.query(POSTGRES.reqErpProduct(), (error, results)=>{
        if(error){
            throw error
        }
        // queryResult = results
        console.log(results)
    })
    res.send("okkkkkkk")
})


app.post("/updated-ErpProduct",async function(req, res){

    let productsArr = req.body.products
    // console.log(POSTGRES.updateErpProduct(req.body.products[]))
    let productID = productsArr[0].id
    console.log(productID)
    pool_dev.query(POSTGRES.updatedErpProduct(productID), (error, results)=>{
        if(error){
            throw error
        }
        // queryResult = results
        console.log(results)
    })
    res.send("okkkkkkk")
})

app.get("/list-BetweenErpProduct",async function(req, res){
    let productsArr = req.body.products
    // console.log(POSTGRES.updateErpProduct(req.body.products[]))
    let time_field1 = productsArr[0].timeField1
    const isoStr1 = time_field1
    const date1 = new Date(isoStr1);
    const timestamp1 = date1.getTime();
    console.log(timestamp1)

    let time_field2 = productsArr[0].timeField2
    const isoStr2 = time_field2
    const date2 = new Date(isoStr2);
    const timestamp2 = date2.getTime();
    console.log(timestamp2)
    pool_dev.query(POSTGRES,listBetweenErpProduct(timestamp1,timestamp2, (error, results)=>{
        if(error){
            throw error
        }
        // queryResult = results
        console.log(results)
    })

    res.send("okkkkkkk")
})

app.get("/list-BetweenErpProduct",async function(req, res){
    let productsArr = req.body.products
    // console.log(POSTGRES.updateErpProduct(req.body.products[]))
    let time_field1 = productsArr[0].timeField1
    const isoStr1 = time_field1
    const date1 = new Date(isoStr1);
    const timestamp1 = date1.getTime();
    console.log(timestamp1)
    pool_dev.query(POSTGRES,listBetweenErpProduct(timestamp1, (error, results)=>{
        if(error){
            throw error
        }
        // queryResult = results
        console.log(results)
    })
    res.send("okkkkkkk")
})



app.post("/erp-data-pipe", async function (req, res) {
  let responseObject =  {
      "success": true,
      "msg": "",
  }
  if (req.query.action === "UpdErpProduct"){
      let arr = []
      for (let item of JSON.parse(req.body.products)) {
          arr.push({"id": item.id, "success": true})
          console.log(item)
      }
      responseObject.tbl = arr

      let stockInsertResult = await MongoDB.insertToDB({stockData: JSON.stringify(req.body)}, CONSTANTS.HOMEHOME_ERP_PRODUCT)
      console.log(stockInsertResult)
      // return res.status(200).send(responseObject)
  }
  else if (req.query.action === "SaveErpProductStock"){
      let arr = []
      for (let item of JSON.parse(req.body.stocks)) {
          arr.push({"productId": item.productId, "success": true})
      }
      responseObject.tbl = arr

      let stockInsertResult = await MongoDB.insertToDB({stockData: JSON.stringify(req.body)}, CONSTANTS.HOMEHOME_COL_STOCK)
      // return res.status(200).send(responseObject)
  }
  else if (req.query.action === "ClearErpProductStock"){
      console.log("ClearErpProductStock")
  }
  else if (req.query.action === "SaveErpProductPrice"){
      let arr = []
      for (let item of JSON.parse(req.body.prices)) {
          arr.push({"productId": item.productId, "success": true})
      }
      console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
      console.log(req.body)
      console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
      responseObject.tbl = arr
  }
  else if (req.query.action === "SaveErpCardType"){
      let arr = []
      for (let item of JSON.parse(req.body.cardTypes)) {
          arr.push({"id": item.id, "success": true})
      }
      console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
      console.log(req.body)
      console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
      responseObject.tbl = arr
  }

  return res.status(200).send(responseObject)
})



app.get("/pull-updated-product",async function(req, res){

  let  dataValue = req.body.dataValue
  pool_dev.query(POSTGRES.insertSaveErpProducePrice(req.body.name), (error, results)=>{
    if(error){
      throw error
    }
    // queryResult = results
    console.log(results)
  })
  res.send("okkkkkkk")
})




























// 1:定义接口名称
// 2：引入SQL language
  










const port = 9999
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
