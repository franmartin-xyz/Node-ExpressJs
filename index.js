const express = require("express")
const {Server: HttpServer } = require("http")
const {Server: IOServer } = require("socket.io")
const Math = require("mathjs")
const fs = require('fs')
const app = express()
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const port = 8080
const conteiner = require("./productHandler");
const handleProducts =  new conteiner;
app.set("views","./views");
app.set("views engine","pug");
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get("/",(req,res)=>{
    res.render("index.pug");
})

// app.get("/api/productos",(req,res)=>{
//     let productos = handleProducts.getAll();
//     res.render("productList.pug",{productos});
// })

// app.get("/api/productos/:id",(req,res)=>{
//     res.send()
//     console.log(handleProducts.getById(req.params.id))
// })

// app.post("/api/productos",async (req,res)=>{
//     const r = await handleProducts.save(req.body);
//     console.log(r)
//     if (r>0) {
//         res.redirect("/api/productos")
//     }       
//     else{
//         res.redirect("/") 
//     }
// })

// app.put("/api/productos/:id",(req,res)=>{
//     res.send(handleProducts.update(req.params.id,req.body));
// })

// app.delete("/api/productos/:id",(req,res)=>{
//     let response = handleProducts.deleteById(req.params.id);
//     res.send(response);
// })

app.use(express.static("public"))



io.on("connection", function(socket){
    let productos = handleProducts.getAll();
    socket.emit("productos",productos);

    let msgs = handleProducts.getMsgs();
    socket.emit("msgs",msgs)

    socket.on("newProduct",data=>{
        handleProducts.save(data);
        let newProductos = handleProducts.getAll()
        io.sockets.emit("productos",newProductos)
    })

    socket.on("msg",msg=>{
        handleProducts.saveMsg(msg)
        let msgs = handleProducts.getMsgs();
        io.sockets.emit("msgs",msgs);
    })
})

httpServer.listen(port)
