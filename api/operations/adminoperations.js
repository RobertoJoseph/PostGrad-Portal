var config = require("./dbconfig");
const sql = require("mssql");

exports.viewAdminProfile = async function (req, res) {
  try {
    let pool = await sql.connect(config);
    const result = (
      await pool
        .request()
        .input("id", sql.Int, req.params.adminID)
        .execute(`viewAdminProfile`)
    ).recordset;
    res.send(result);
  } catch (err) {
    console.log(err);
    sql.close();
  }
};

exports.AdminListSup = async function (req, res) {
  try {
    let pool = await sql.connect(config);
    const result = (await pool.request().execute(`AdminListSup`)).recordset;
    res.send(result);
  } catch (erorr) {
    console.log(erorr);
    sql.close();
  }
};

exports.AdminViewStudentThesisBySupervisor = async function (req, res) {
  try {
    let pool = await sql.connect(config);
    const result = (
      await pool
        .request()
        .input("supervisorID", sql.Int, req.params.supervisorID)
        .execute(`AdminViewStudentThesisBySupervisor`)
    ).recordset;
    res.send(result);
  } catch (err) {
    console.log(err);
    sql.close();
  }
};

exports.AdminViewAllTheses = async function (req, res) {
  try {
    let pool = await sql.connect(config);
    const result = (await pool.request().execute(`AdminViewAllTheses`))
      .recordset;
    res.send(result);
  } catch (erorr) {
    console.log(erorr);
    sql.close();
  }
};

exports.AdminUpdateExtension = async function (req, res) {
  try {
    let pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("ThesisSerial", sql.Int, req.params.serialNumber)
      .execute(`AdminUpdateExtension`);
    res.send({ isIncremented: true });
  } catch (error) {
    console.log(error);
    sql.close();
  }
};

exports.viewAllGUCians = async function (req, res) {
  try {
    let pool = await sql.connect(config);
    const result = (await pool.request().execute(`viewAllGUCians`)).recordset;
    res.send(result);
  } catch (erorr) {
    console.log(erorr);
    sql.close();
  }
};

exports.viewAllNonGUCians = async function (req, res) {
  try {
    let pool = await sql.connect(config);
    const result = (await pool.request().execute(`viewAllNonGUCians`))
      .recordset;
    res.send(result);
  } catch (erorr) {
    console.log(erorr);
    sql.close();
  }
};

exports.viewAllCourses = async function (req, res) {
  try {
    let pool = await sql.connect(config);
    const result = (await pool.request().execute(`viewAllCourses`)).recordset;
    res.send(result);
  } catch (erorr) {
    console.log(erorr);
    sql.close();
  }
};

exports.addCourse = async function (req, res) {
  try {
    let pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("coursecode", sql.VarChar, req.body.courseName)
      .input("creditHrs", sql.Int, req.body.creditHours)
      .input("fees", sql.Float, req.body.fees)
      .execute(`AddCourse`);
    res.send({ courseAdded: true });
  } catch (error) {
    console.log(error);
    sql.close();
  }
};

exports.linkCourse = async function (req, res) {
  try {
    let pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("coursecode", sql.VarChar, req.body.courseName)
      .input("studentID", sql.Int, req.body.studentID)
      .execute(`linkCourseHelper`);
    res.send({ courseLinked: true });
  } catch (error) {
    console.log(error);
    sql.close();
  }
};

exports.addGrade = async function (req, res) {
  try {
    let pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("courseID", sql.Int, req.body.courseID)
      .input("studentID", sql.Int, req.body.studentID)
      .input("grade", sql.Float, req.body.grade)
      .execute(`AddStudentCourseGrade`);
    res.send({ gradeAdded: true });
  } catch (error) {
    console.log(error);
    sql.close();
  }
};

exports.AdminListNonGucianCourse = async function (req, res) {
  try {
    let pool = await sql.connect(config);
    const result = (
      await pool
        .request()
        .input("courseID", sql.Int, req.params.courseID)
        .execute(`AdminListNonGucianCourse`)
    ).recordset;
    res.send(result);
  } catch (err) {
    console.log(err);
    sql.close();
  }
};

exports.AdminListAcceptPublication = async function (req, res) {
  try {
    console.log(req.params.serialNumber);
    let pool = await sql.connect(config);
    const result = (
      await pool
        .request()
        .input("serialNumber", sql.Int, req.params.serialNumber)
        .execute(`AdminListAcceptPublication`)
    ).recordset;
    console.log("How the fuck is it 1? " + result);
    res.send(result);
  } catch (err) {
    console.log(err);
    sql.close();
  }
};

exports.getAllThesis = async function (req, res) {
  try {
    let pool = await sql.connect(config);
    const result = (await pool.request().execute(`AdminViewAllTheses`))
      .recordset;
    res.send(result);
  } catch (erorr) {
    console.log(erorr);
    sql.close();
  }
};

exports.AdminIssueThesisPayment = async function (req, res) {
  try {
    console.log();
    let pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("ThesisSerial", sql.Int, req.body.thesisSerialNumber)
      .input("amount", sql.Decimal, req.body.amount)
      .input("noOfInstallments", sql.Int, req.body.installment)
      .input("fundPrecentage", sql.Decimal, req.body.fund)
      .output("Success", sql.Bit)
      .execute(`AdminIssueThesisPayment`);
    res.send({ isIssued: true });
  } catch (error) {
    console.log(error);
    sql.close();
  }
};

exports.ViewOnGOingTheses = async function (req, res) {
  try {
    let pool = await sql.connect(config);
    const result = (await pool.request().execute(`ViewOnGOingTheses`))
      .recordset;
    res.send(result);
  } catch (erorr) {
    console.log(erorr);
    sql.close();
  }
};

exports.ViewExpiredTheses = async function (req, res) {
  try {
    let pool = await sql.connect(config);
    const result = (await pool.request().execute(`ViewExpiredTheses`))
      .recordset;
    res.send(result);
  } catch (erorr) {
    console.log(erorr);
    sql.close();
  }
};