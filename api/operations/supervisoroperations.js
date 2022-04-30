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

exports.showSupervisorStudents = async function (req, res) {
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
  }
};

exports.ViewStudentPublications = async function (req, res) {
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

exports.supervisorListProgressReport = async function (req, res) {
  try {
    let pool = await sql.connect(config);
    const result = (
      await pool
        .request()
        .input("studentId", sql.Int, req.params.studentId)
        .execute(`supervisorListProgressReport`)
    ).recordset;
    console.log(result);
    res.send(result);
  } catch (err) {
    console.log(err);
    sql.close();
  }
};

exports.getExaminers = async function (req, res) {
  try {
    let pool = await sql.connect(config);
    const result = (await pool.request().execute(`getExaminers`)).recordset;
    console.log(result);
    res.send(result);
  } catch (err) {
    console.log(err);
  }
};

exports.SupervisorAddDefense = async function (req, res) {
  try {
    let pool = await sql.connect(config);
    const result = (
      await pool
        .request()
        .input("thesisSerialNumber", sql.Int, req.body.thesisSerialNumber)
        .input("examinerId", sql.Int, req.body.examinerId)
        .input("defenseDate", sql.Date, req.body.defenseDate)
        .input("defenseLocation", sql.VarChar, req.body.defenseLocation)
        .input("comment", sql.VarChar, req.body.comment)
        .execute(`SupervisorAddDefense`)
    ).recordset;
    console.log(result);
    res.send(result);
  } catch (err) {
    console.log(err);
  }
};
exports.addSupervisor = async function (req, res) {
  try {
    let pool = await sql.connect(config);
    const result = (
      await pool
        .request()
        .input("firstName", sql.VarChar, req.body.firstName)
        .input("lastName", sql.VarChar, req.body.lastName)
        .input("password", sql.VarChar, req.body.password)
        .input("faculty", sql.VarChar, req.body.faculty)
        .input("email", sql.VarChar, req.body.email)
        .execute(`SupervisorRegister`)
    ).recordset;
    console.log(result);
    res.send(result);
  } catch (err) {
    console.log(err);
  }
};
exports.CancelThesis = async function (req, res) {
  try {
    let pool = await sql.connect(config);
    const result = (
      await pool
        .request()
        .input("thesisSerialNo", sql.Int, req.params.thesisSerialNumber)
        .output("successBit", sql.Bit)
        .execute(`CancelThesis`)
    );
    console.log(result);
    res.send(result.output.successBit);
  } catch (err) {
    console.log(err);
  }
};
exports.SupervisorEvaluateReport = async function (req,res){
  try {
    let pool = await sql.connect(config);
    const result = (
      await pool
        .request()
        .input("supervisorID", sql.Int, req.body.supervisorId)
        .input("thesisSerialNo", sql.Int, req.body.thesisSerialNumber)
        .input("progressReportNo", sql.Int, req.body.progressReportNumber)
        .input("evaluation", sql.Int, req.body.evaluation)
        .execute(`EvaluateReport`)
    ).recordset;
    console.log(result);
    res.send(result);
  } catch (err) {
    console.log(err);
  }
};
exports.editPassword = async function (req,res){
  try {
    let pool = await sql.connect(config);
    const result = (
      await pool
        .request()
        .input("id",sql.Int,req.params.supervisorId)
        .input("oldpassword",sql.VarChar,req.body.oldPassword)
        .input("newpassword",sql.VarChar,req.body.newPassword)
        .output("success",sql.Bit)
        .execute(`editSupervisorPassword`)
    );
    if (result.output.success) {
      res.send({ isUpdated: true });
    } else {
      res.send({ isUpdated: false });
    }
  } catch (err) {
    console.log(err);
  }
};
exports.ViewAllProgressReports = async function (req,res){
  try {
    let pool = await sql.connect(config);
    const result = (
      await pool
        .request()
        .execute(`viewAllProgressReports`)
    ).recordset;
      res.send(result)
  } catch (err) {
    console.log(err);
  }
};

