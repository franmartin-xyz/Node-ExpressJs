import fs from "fs"

type producto = {
    id:number,
    timestamp:Date,
    name:string,
    description:string,
    url:string,
    price:number,
    stock:number,
}
type cart={
    id:number,
    timestamp:Date,
    products:producto,
}

function isObject(x:object) {let t= JSON.stringify(x); return true ? t[0] === '{' : false;}

class cartHandler{

updateCart(id:number,obj:cart){
    try{
        let data = JSON.parse(fs.readFileSync("./cart.txt","utf-8"))
        if(data){
            
           const found = data.findIndex((item:cart)=>{return item.id = id});
           if(found>-1 && isObject(obj)){
            data[found] = obj;
            fs.writeFileSync("./cart.txt",JSON.stringify(data))
            return id
           }else{
           if( isObject(obj) ){return undefined}else{return "JSON Expected"}
           }
        }
    }catch{
        return null
    }
}    

createCart(obj:cart){
    try {
        let data = JSON.parse(fs.readFileSync("./cart.txt","utf-8")) 
        if(data) {
            obj = {...obj,id:data[data.length - 1].id + 1};
            data = [...data,obj]
             fs.writeFileSync("./cart.txt",JSON.stringify(data))
             return obj.id;
        }
    } catch {
        let arr = [{...obj,id:1}];
        fs.writeFileSync("./cart.txt",JSON.stringify(obj));
        return arr[0].id
    }

}

getById(num:number){
    try{
    const data = JSON.parse(fs.readFileSync("./cart.txt","utf-8"));
    const res = data.find((item:cart) => {
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
        return JSON.parse(fs.readFileSync("./cart.txt","utf-8"));
    } catch (error) {
        return null + " " + error
    }
    
}
getMsgs(){
    try {
        return JSON.parse(fs.readFileSync("./msgs.txt","utf-8"));
    } catch (error) {
        return null + " " + error
    }
    
}
deleteById(numb:number){
    try {
        let data = JSON.parse(fs.readFileSync("./cart.txt","utf-8")) 
        if(data) {
            let index = data.findIndex((item:cart)=>{return item.id===numb});
            if(index>-1) {
                data.splice(index,1);
                fs.writeFileSync("./cart.txt",JSON.stringify(data));
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
        let data = JSON.parse(fs.readFileSync("./cart.txt","utf-8"));
        if (data){
            fs.writeFileSync("./cart.txt",JSON.stringify([]));
        }
    }
    catch{
        return null;
    }
}
}

export default cartHandler