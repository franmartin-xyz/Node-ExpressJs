import options from "./knex-config.js"
import Knex from "knex"
const knex = Knex(options)

class produtos{

   newProduct (){ knex.schema.createTableIfNotExists("",table=>{
        table.increments("id")
        table.string("name")
        table.integer("price")
    })
    .then(()=>console.log("table created"))
    .catch((err)=>{console.log(err);throw err})
    .finally(()=>{
        knex.destroy();
    })}
}
