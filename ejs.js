const Math = require("mathjs")
const fs = require('fs')
const express = require("express")
const app = express()
const port = 8080
const conteiner = require("./productHandler");
const { re } = require("mathjs")
const handleProducts =  new conteiner;
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.set("views","./views");
app.set("view engine","ejs");

app.get("/",(req,res)=>{
    res.render("addProduct.ejs");
})


app.get("/api/productos",(req,res)=>{
    let productos = handleProducts.getAll();
    res.render("productList.ejs",{productos:productos});
})

app.get("/api/productos/:id",(req,res)=>{
    res.send()
    console.log(handleProducts.getById(req.params.id))
})

app.post("/api/productos",async (req,res)=>{
    const r = await handleProducts.save(req.body);
    console.log(r)
    if (r>0) {
        res.redirect("/api/productos")
    }       
    else{
        res.redirect("/") 
    }
})

app.put("/api/productos/:id",(req,res)=>{
    res.send(handleProducts.update(req.params.id,req.body));
})

app.delete("/api/productos/:id",(req,res)=>{
    let response = handleProducts.deleteById(req.params.id);
    res.send(response);
})

app.listen(port)
