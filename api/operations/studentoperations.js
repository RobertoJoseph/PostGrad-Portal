var config = require("./dbconfig");
const sql = require("mssql");

async function viewMyProfile(studentId) {
  try {
    let pool = await sql.connect(config);
    const result = (
      await pool
        .request()
        .input("studentId", sql.Int, studentId)
        .execute(`viewMyProfile`)
    ).recordset;
    console.log(result);
    sql.close();
    return result;
  } catch (erorr) {
    console.log(erorr);
    sql.close();
  }
}

async function editMyProfile(
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
    const id = await pool.request();
    const result = await pool
      .request()
      .input("studentId", sql.Int, firstname)
      .input("firstName", sql.VarChar, firstname)
      .input("lAStName", sql.VarChar, lastname)
      .input("pASsword", sql.VarChar, password)
      .input("email", sql.VarChar, email)
      .input("address", sql.VarChar, address)
      .execute(`editMyProfile`);
    console.log(result);
    sql.close();
  } catch (erorr) {
    console.log(erorr);
    sql.close();
  }
}

exports.StudentRegister = async function (req, res) {
  try {
    let pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("firstName", sql.VarChar, req.body.firstName)
      .input("lastName", sql.VarChar, req.body.lastName)
      .input("password", sql.VarChar, req.body.password)
      .input("faculty", sql.VarChar, req.body.faculty)
      .input("gucian", sql.Bit, req.body.isGucian)
      .input("email", sql.VarChar, req.body.email)
      .input("address", sql.VarChar, req.body.address)
      .execute(`StudentRegister`);
    sql.close();
  } catch (error) {
    console.log(error);
  }
};


