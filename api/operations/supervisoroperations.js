var config = require("./dbconfig");
const sql = require("mssql");


exports.getSupervisorData = async function (req, res) {
    try {
      let pool = await sql.connect(config);
      const result = (
        await pool
          .request()
          .input("supervisorID", sql.Int, req.params.supervisorId)
          .execute(`SupViewProfile`)
      ).recordset;
      console.log(result);
      res.send(result);
    } catch (err) {
      console.log(err);
      sql.close();
    }
  };

exports.showSupervisorStudents = async function (req,res){
  try {
    let pool = await sql.connect(config);
    const result = (
      await pool
        .request()
        .input("id", sql.Int, req.params.supervisorId)
        .execute(`SupervisorViewMyStudents`)
    ).recordset;
    console.log(result);
    res.send(result);
  } catch (err) {
    console.log(err);
    sql.close();
  }
};