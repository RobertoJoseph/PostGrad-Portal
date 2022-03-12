var express = require("express");
var router = express.Router();
var config = require("../dbconfig");
const sql = require("mssql");

router.get("/",async function(req,res){
    try{
        let pool = await sql.connect(config);
        const result = await pool.request().query("Select * from GucianStudent");
        console.log("I am in the router and get all students");
        res.send(result.recordsets);
      
        
    }
    catch(error){
        console.log(error);
    }

})
module.exports = router;
