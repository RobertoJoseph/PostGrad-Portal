var express = require("express");
var router = express.Router();
var config = require("../operations/dbconfig");
const sql = require("mssql");

/* GET home page. */
router.get("/", async function (req, res, next) {
  try {
    let pool = await sql.connect(config);
    let users = await pool.request().query("Select * from GucianStudent");
    console.log(users.recordsets);
    return users.recordsets;
  } catch (erorr) {
    console.log(erorr);
  }
});

module.exports = router;
