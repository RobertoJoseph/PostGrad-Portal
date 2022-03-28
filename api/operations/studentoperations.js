var config = require("./dbconfig");
const sql = require("mssql");

exports.viewMyProfile = async function (req, res) {
  try {
    let pool = await sql.connect(config);
    const result = (
      await pool
        .request()
        .input("studentId", sql.Int, req.body.studentId)
        .execute(`viewMyProfile`)
    ).recordset;
    console.log(result);
    sql.close();
    res.send(result);
  } catch (erorr) {
    console.log(erorr);
    sql.close();
  }
};

exports.editMyProfile = async function (req, res) {
  try {
    let pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("studentId", sql.Int, req.body.studentId)
      .input("firstName", sql.VarChar, req.body.firstName)
      .input("lAStName", sql.VarChar, req.body.lastName)
      .input("pASsword", sql.VarChar, req.body.password)
      .input("email", sql.VarChar, req.body.email)
      .input("address", sql.VarChar, req.body.address)
      .execute(`editMyProfile`);
    console.log(result);
    sql.close();
  } catch (erorr) {
    console.log(erorr);
    sql.close();
  }
};

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
    sql.close();
  }
};

exports.addUndergradID = async function (req, res) {
  try {
    let pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("studentID", sql.Int, req.body.studentId)
      .input("undergradID", sql.VarChar, req.body.undergradId)
      .execute(`addUndergradID`);
    console.log(result);
    sql.close();
  } catch (error) {
    console.log(error);
    sql.close();
  }
};

exports.ViewCoursesGrades = async function (req, res) {
  try {
    let pool = await sql.connect(config);
    const result = (
      await pool
        .request()
        .input("studentID", sql.Int, req.body.studentId)
        .execute(`ViewCoursesGrades`)
    ).recordset;
    console.log(result);
    sql.close();
    res.send(result);
  } catch (error) {
    console.log(error);
    sql.close();
  }
};
exports.ViewCoursePaymentsInstall = async function (req, res) {
  try {
    let pool = await sql.connect(config);
    const result = (
      await pool
        .request()
        .input("studentID", sql.Int, req.body.studentId)
        .execute(`ViewCoursePaymentsInstall`)
    ).recordset;
    console.log(result);
    sql.close();
    res.send(result);
  } catch (error) {
    console.log(error);
    sql.close();
  }
};

exports.ViewThesisPaymentsInstall = async function (req, res) {
  try {
    let pool = await sql.connect(config);
    const result = (
      await pool
        .request()
        .input("studentID", sql.Int, req.body.studentId)
        .execute(`ViewThesisPaymentsInstall`)
    ).recordset;
    console.log(result);
    sql.close();
    res.send(result);
  } catch (error) {
    console.log(error);
    sql.close();
  }
};

exports.ViewUpcomingInstallments = async function (req, res) {
  try {
    let pool = await sql.connect(config);
    const result = (
      await pool
        .request()
        .input("studentID", sql.Int, req.body.studentId)
        .execute(`ViewUpcomingInstallments`)
    ).recordset;
    console.log(result);
    sql.close();
    res.send(result);
  } catch (error) {
    console.log(error);
    sql.close();
  }
};

exports.ViewMissedInstallments = async function (req, res) {
  try {
    let pool = await sql.connect(config);
    const result = (
      await pool
        .request()
        .input("studentID", sql.Int, req.body.studentId)
        .execute(`ViewMissedInstallments`)
    ).recordset;
    console.log(result);
    sql.close();
    res.send(result);
  } catch (error) {
    console.log(error);
    sql.close();
  }
};

exports.addProgressReport = async function (req, res) {
  try {
    let pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("thesisSerialNo", sql.Int, req.body.thesisSerialNo)
      .input("progressReportDate", sql.Date, req.body.date)
      .execute(`AddProgressReport`);
    sql.close();
  } catch (error) {
    console.log(error);
    sql.close();
  }
};

exports.FillProgressReport = async function (req, res) {
  try {
    let pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("thesisSerialNo", sql.Int, req.body.thesisSerialNo)
      .input("progressReportNo", sql.Int, req.body.Int)
      .input("state", sql.Int, req.body.state)
      .input("description", sql.VarChar, req.body.description)
      .execute(`FillProgressReport`);
    sql.close();
  } catch (error) {
    console.log(error);
    sql.close();
  }
};

exports.ViewEvalProgressReport = async function (req, res) {
  try {
    let pool = await sql.connect(config);
    const result = (
      await pool
        .request()
        .input("thesisSerialNo", sql.Int, req.body.thesisSerialNo)
        .input("progressReportNo", sql.Int, req.body.Int)
        .execute(`ViewEvalProgressReport`)
    ).recordset;
    res.send(result);
    sql.close();
  } catch (err) {
    console.log(err);
    sql.close();
  }
};
exports.viewStudentThesisById = async function (req, res) {
  try {
    console.log("HHHHHH");
    let pool = await sql.connect(config);
    const result = (
      await pool
        .request()
        .input("id", sql.Int, req.params.studentID)
        .execute(`viewStudentThesisById`)
    ).recordset;
    console.log(result);
    res.send(result);
    sql.close();
  } catch (err) {
    console.log(err);
    sql.close();
  }
};
