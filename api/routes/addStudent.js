var express = require("express");
var router = express.Router();
var config = require("../dbconfig");
const sql = require("mssql");

async function StudentRegister(
  firstname,
  lastname,
  password,
  faculty,
  gucian,
  email,
  address
) {
  try {
    let pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("first_name", sql.VarChar, firstname)
      .input("last_name", sql.VarChar, lastname)
      .input("password", sql.VarChar, password)
      .input("faculty", sql.VarChar, faculty)
      .input("gucian", sql.Bit, gucian)
      .input("email", sql.VarChar, email)
      .input("address", sql.VarChar, address)
      .execute(`StudentRegister`);
     
    sql.close();
  } catch (erorr) {
    console.log(erorr);
    sql.close();
  }
}

/* GET users listing. */
router.post("/", function (req, res, next) {
  console.log("Iam in posting")
  StudentRegister(
    req.body.firstName,
    req.body.lastName,
    req.body.password,
    req.body.faculty,
    req.body.isGucian,
    req.body.email,
    req.body.address
  );
});

module.exports = router;