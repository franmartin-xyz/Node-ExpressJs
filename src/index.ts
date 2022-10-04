import express from "express"
import http from "http"
const app = express()
const port = 8080
import Contenedor from "./productHandler"
import cartHandler from "./cartHandler"
const handleProducts =  new Contenedor;
app.set("views","./views");
app.set("views engine","pug");
app.use(express.urlencoded({extended:true}))
app.use(express.json())

const admin:boolean = false;

app.get("/api/productos/",(req,res)=>{
    res.send()
    console.log(handleProducts.getAll());
})

app.get("/api/productos/:id",(req,res)=>{
    res.send()
    console.log(handleProducts.getById(Number(req.params.id)))
})

app.post("/api/productos",async (req,res)=>{
    const r:number|undefined = handleProducts.save(req.body);
    if (r && (r>0)) {
        res.redirect("/api/productos")
    }       
    else{
        res.redirect("/") 
    }
})

app.put("/api/productos/:id",(req,res)=>{
    res.send(handleProducts.update(Number(req.params.id),req.body));
})

app.delete("/api/productos/:id",(req,res)=>{
    let response = handleProducts.deleteById(Number(req.params.id));
    res.send(response);
})

app.use(express.static("public"))


app.listen(port)
