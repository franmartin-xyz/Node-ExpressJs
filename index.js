const Math = require("mathjs")
const fs = require('fs')
const express = require("express")
const app = express()
const port = 8080
let productos=""; //utilizo este extracto de la clase contenedor así no lo tengo que importar
try {
    productos = JSON.parse(fs.readFileSync("./productos.txt","utf-8"));
} catch (error) {
    productos = null;
}

app.get("/productos",(req,res)=>{
    res.send(productos)
})

app.get("/productoRandom",(req,res)=>{
    res.json(productos[Math.floor(Math.random()*productos.length)])
    console.log(productos)
})

app.listen(port,()=>{
    console.log("app in port "+ port)
})