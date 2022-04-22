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

exports.ViewStudentPublications = async function (req,res){
  try {
    let pool = await sql.connect(config);
    const result = (
      await pool
        .request()
        .input("studentID", sql.Int, req.params.studentId)
        .execute(`ViewAStudentPublications`)
    ).recordset;
    console.log(result);
    res.send(result);
  } catch (err) {
    console.log(err);
    sql.close();
  }
};

exports.supervisorListProgressReport = async function (req,res){
  try {
    let pool = await sql.connect(config);
    const result = (
      await pool
        .request()
        .input("supervisorId", sql.Int, req.params.supervisorId)
        .execute(`supervisorListProgressReport`)
    ).recordset;
    console.log(result);
    res.send(result);
  } catch (err) {
    console.log(err);
    sql.close();
  }
};