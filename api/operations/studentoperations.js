var config = require("./dbconfig");
const sql = require("mssql");

exports.viewMyProfile = async function (req,res) {
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
    return result;
  } catch (erorr) {
    console.log(erorr);
    sql.close();
  }
}

exports.editMyProfile = async function (req,res) {
  try {
    let pool = await sql.connect(config);
    const id = await pool.request();
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


exports.addUndergradID = async function (req, res) {
    try {
        let pool = await sql.connect(config);
        const result = (await pool.request()
            .input("studentID", sql.Int, req.body.studentId)
            .input("undergradID", sql.VarChar, req.body.undergradId)
            .execute(`addUndergradID`));
        console.log(result);
        sql.close();
    }
    catch (error) {
        console.log(error);
        sql.close();
    }
}

exports.ViewCoursesGrades = async function (req,res) {
    try {
        let pool = await sql.connect(config);
        const result = (await pool.request()
            .input("studentID", sql.Int, req.body.studentId)
            .execute(`ViewCoursesGrades`)).recordset;
        console.log(result);
        sql.close();
        return result;
    } catch (error) {
        console.log(error);
        sql.close(error);
    }
}
exports.ViewCoursePaymentsInstall = async function (req,res) {
    try {
        let pool = await sql.connect(config);
        const result = (await pool.request()
            .input("studentID", sql.Int, req.body.studentId)
            .execute(`ViewCoursePaymentsInstall`)).recordset;
        console.log(result);
        sql.close();
        return result;
    } catch (error) {
        console.log(error);
        sql.close(error);
    }
}

exports.body = async function (req,res) {
    try {
        let pool = await sql.connect(config);
        const result = (await pool.request()
            .input("studentID", sql.Int, req.body.studentId)
            .execute(`ViewThesisPaymentsInstall`)).recordset;
        console.log(result);
        sql.close();
        return result;
    } catch (error) {
        console.log(error);
        sql.close(error);
    }
}

exports.ViewUpcomingInstallments = async function (req,res) {
    try {
        let pool = await sql.connect(config);
        const result = (await pool.request()
            .input("studentID", sql.Int, req.body.studentId)
            .execute(`ViewUpcomingInstallments`)).recordset;
        console.log(result);
        sql.close();
        return result;
    } catch (error) {
        console.log(error);
        sql.close(error);
    }
}

exports.ViewMissedInstallments = async function (req,res) {
    try {
        let pool = await sql.connect(config);
        const result = (await pool.request()
            .input("studentID", sql.Int, req.body.studentId)
            .execute(`ViewMissedInstallments`)).recordset;
        console.log(result);
        sql.close();
        return result;
    } catch (error) {
        console.log(error);
        sql.close(error);
    }
}
