const express = require("express")
const Datastore = require("nedb")
const app = express();


app.use(express.static("public"))
app.use(express.json({limit:"1mb"}))
require("http").createServer(function (req, res) {
    res.end("./index.html");
}).listen(3000)

const database = new Datastore("database.db")
database.loadDatabase()
database.insert({hello:"chabuk",age:32})

app.post("/api/post",(req,res)=>{
    const name= req.body.ItemName
    const contact = req.body.PurchasePrice
    const email= req.body.Note
    res.send({
        name:name,
        contact:contact,
        email:email
    })
    console.log(name+"-"+contact+""+email)
    database.insert({hello:"dsas",age:21})
})
