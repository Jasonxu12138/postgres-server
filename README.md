# postgres-server
用command line：pwd
找路径
git add .
git commit -m "commit message, whatever u  like, or what u did in this commit"
git push // uplaod code




拉代码

git pull 


to-do list:
return all product where is_processed = false
given a list of product id, update the field where is_processed = false to true

table: 
+api: erp input: +2sql insert and update
+api: hh req is_p = false +1sql
+api: hh update isp = true +1 sql
req.body.productIDList // ["Qqweqwewq", "Qeqweqwe"]
for id in req.body.productIDList 
{"productID" = id}
{"productID" = id}{"productID" = id}{"productID" = id}{"productID" = id}{"productID" = id}

{}

catch error 捕捉异常
app.post("/catch-error",async function(req, res){
let jason = req.body.jasonHasNoDick
let yilin = req.body.yilinHas36D
try {
for (let x of yilin) {
console.log(x)
}
}
catch (e) {

        console.log(e)
        console.log("jason has no dick")
    }
    res.send("okkkkkkk")
})