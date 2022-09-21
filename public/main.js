const socket = io.connect();
socket.on("productos",data=>{
    render(data);
})

socket.on("msgs",msgs=>{
    renderMsgs(msgs);
})

function render(data){
    const html = data.map(msg=>`
    <tr class="border border-secondary">
       <td>
            <title class="d-inline text-center">${msg.title}</title>
       </td>
       <td class="text-center">
            <span>Precio: $${msg.price}</span>
       </td> 
       <td class="text-center w-25">
            <img class="img-fluid float-end" src="${msg.thumbnail}" alt="imagen producto">
       </td> 
    </tr>
    `).join(" ");
    document.getElementById("productos").innerHTML = html;
}

function renderMsgs(data){
    const newmsgs = data.map(msg=>`<span>${msg.email} [${msg.date || ""}]:${msg.msg}</span>`).join(" ");
    document.getElementById("messages").innerHTML = newmsgs;
}

function newProduct(){
    const title = document.getElementById("title").value;
    const price = document.getElementById("price").value;
    const thumbnail = document.getElementById("imgUrl").value;
    socket.emit("newProduct",{title,price,thumbnail});
    title.value="";
    price.value="";
    thumbnail.value="";
    return false
}

function getNewMsg(){
    const msg = document.getElementById("newMsg").value;
    const email = document.getElementById("msgEmail").value;
    const dt = new Date;
    const date = dt.toLocaleString();
    socket.emit("msg",{msg,email,date});
    document.getElementById("newMsg").value = "";
    return false;
}