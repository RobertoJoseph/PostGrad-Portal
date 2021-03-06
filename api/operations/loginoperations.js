var config = require('./dbconfig')
const sql = require('mssql')

exports.Login = async function (req, res) {
  try {
    console.log(req.body.email);
    console.log(req.body.password);
    let pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("email", sql.VarChar, req.body.email)
      .output("id", sql.Int)
      .output("Success", sql.Bit)
      .execute(`getIDbyEmail`);
    const userid = result.output.id;
    const foundEmail = result.output.Success;
    console.log("Found email: " + foundEmail);
    console.log("USER ID IS " + userid);
    if (foundEmail) {
      const userlogin =
      await pool
        .request()
        .input("id", sql.Int, userid)
        .input("pASsword", sql.VarChar, req.body.password)
        .output("Success", sql.Bit)
        .output("userType", sql.Int)
        .execute(`userLogin`);
      res.send({ isLogged: userlogin.output.Success, userID: userid, userType: userlogin.output.userType});
    } else {
      res.send({ isLogged: false, studentID: userid });
    }
  } catch (erorr) {
    sql.close();
  }
};
