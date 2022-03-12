var express = require("express");
var router = express.Router();
var config = require("../dbconfig");
const sql = require("mssql");

/* GET home page. */
router.get("/", async function (req, res, next) {
  try {
    let pool = await sql.connect(config);
    let users = await pool.request().query("Select * from GucianStudent");
    console.log(users.recordsets);
    res.render('index',{title:"express"})
    return users.recordsets;
  } catch (erorr) {
    console.log(erorr);
  }
});

module.exports = router;
