const fs = require("fs");

function isObject(x) {let t= JSON.stringify(x); return true ? t[0] === '{' : false;}

class Contenedor{

update(id,obj){
    try{
        let data = JSON.parse(fs.readFileSync("./productos.txt","utf-8"))
        if(data){
           const found = data.findIndex(item=>{return item.id = id});
           if(found>-1 && isObject(obj)){
            data[found] = obj;
            fs.writeFileSync("./productos.txt",JSON.stringify(data))
            return id
           }else{
           if( isObject(obj) ){return undefined}else{return "JSON Expected"}
           }
        }
    }catch{
        return null
    }
}    

save(obj) {
    try {
        let data = JSON.parse(fs.readFileSync("./productos.txt","utf-8")) 
        if(data) {
            obj = {...obj,id:data[data.length - 1].id + 1};
            data = [...data,obj]
             fs.writeFileSync("./productos.txt",JSON.stringify(data))
             return obj.id;
        }
    } catch {
        obj = [{...obj,id:1}];
        fs.writeFileSync("./productos.txt",JSON.stringify(obj));
        return obj[0].id
    }

}
getById(num){
    try{
    const data = JSON.parse(fs.readFileSync("./productos.txt","utf-8"));
    const res = data.find(item => {
        return item.id === Number(num);
        }
    );
    return res
    }catch{
        return null
    }
}
getAll(){
    try {
        return JSON.parse(fs.readFileSync("./productos.txt","utf-8"));
    } catch (error) {
        return null + " " + error
    }
    
}
deleteById(numb){
    numb = Number(numb)
    try {
        let data = JSON.parse(fs.readFileSync("./productos.txt","utf-8")) 
        if(data) {
            let index = data.findIndex(item=>{return item.id===numb});
            if(index>-1) {
                data.splice(index,1);
                fs.writeFileSync("./productos.txt",JSON.stringify(data));
                return "obj id " + numb + " deleted"
            }else{
                return "undefined";
            } 
        }
    } 
    catch {
        return null;
    }
}
deleteAll(){
    try {
        let data = JSON.parse(fs.readFileSync("./productos.txt","utf-8"));
        if (data){
            fs.writeFileSync("./productos.txt",JSON.stringify([]));
        }
    }
    catch{
        return null;
    }
}
}

 module.exports = Contenedor;