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
    console.log(req.params.studentID);
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
exports.viewStudentCourses = async function (req, res) {
  try {
    let pool = await sql.connect(config);
    const result = (
      await pool
        .request()
        .input("studentID", sql.Int, req.params.studentID)
        .execute(`StudentViewAllCourses`)
    ).recordset;
    console.log(result);
    res.send(result);
    sql.close();
  } catch (err) {
    console.log(err);
    sql.close();
  }
};

exports.addAndFillProgressReport = async function (req, res) {
  try {
    let pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("thesisSerialNo", sql.Int, req.body.serialNumber)
      .input("progressReportDate", sql.Date, req.body.progressReportDate)
      .input("state", sql.Int, 1)
      .input("description", sql.VarChar, req.body.progressReportDescription)
      .execute(`AddAndFillProgressReport`);
    sql.close();
    res.send({ isProgressAdded: true });
  } catch (error) {
    console.log(error);
    sql.close();
  }
};
exports.addPublication = async function (req, res) {
  try {
    let pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("title", sql.VarChar, req.body.publicationTitle)
      .input("studentID", sql.Int, req.params.studentID)
      .input("pubDate", sql.Date, req.body.date)
      .input("host", sql.VarChar, req.body.host)
      .input("place", sql.VarChar, req.body.place)
      .input("accepted", sql.Bit, req.body.isAccepted)
      .execute(`addPublication`);
    sql.close();
    res.send({ isPublicationAdded: true });
  } catch (error) {
    console.log(error);
    sql.close();
  }
};
exports.linkPublicationToThesis = async function (req, res) {
  try {
    let pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("PubID", sql.Int, req.body.publicationId)
      .input("thesisSerialNo", sql.Int, req.body.thesisSerialNumber)
      .execute(`linkPubThesis`);
    sql.close();
    res.send({ isPublicationLinked: true });
  } catch (error) {
    console.log(error);
    sql.close();
  }
};

exports.viewStudentPublications = async function (req, res) {
  try {
    let pool = await sql.connect(config);
    const result = (
      await pool
        .request()
        .input("studentID", sql.Int, req.params.studentID)
        .execute(`ViewAStudentPublications`)
    ).recordset;
    console.log(result);
    res.send(result);
    sql.close();
  } catch (err) {
    console.log(err);
    sql.close();
  }
};

exports.viewStudentDataById = async function (req, res) {
  try {
    console.log(req.params.studentID);
    let pool = await sql.connect(config);
    const result = (
      await pool
        .request()
        .input("studentId", sql.Int, req.params.studentID)
        .execute(`StudentData`)
    ).recordset;
    console.log(result);
    res.send(result);
    sql.close();
  } catch (err) {
    console.log(err);
    sql.close();
  }
};

exports.editMyPassword = async function (req, res) {
  try {
    let pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("studentId", sql.Int, req.body.studentID)
      .input("oldPassword", sql.VarChar, req.body.oldPassword)
      .input("newPassword", sql.VarChar, req.body.newPassword)
      .execute(`editMyPassword`);
    sql.close();
    res.send({ isPasswordUpdated: true });
  } catch (error) {
    console.log(error);
    sql.close();
  }
};

exports.getIdOfSelectedThesis = async function (req, res) {
  try {
    let pool = await sql.connect(config);
    const result = (
      await pool
        .request()
        .input("studentID", sql.Int, req.params.studentID)
        .input("thesisTitle", sql.VarChar, "Thesis On Algorithms")
        .execute(`getIdOfSelectedThesisByStudent`)
    ).recordset;
    console.log(result);
    res.send(result);
    sql.close();
  } catch (err) {
    console.log(err);
    sql.close();
  }
};


exports.ViewEvalProgressReport = async function (req, res) {
  try {
    console.log(req.params.studentID);
    let pool = await sql.connect(config);
    const result = (
      await pool
        .request()
        .input("studentId", sql.Int, req.params.studentID)
        .execute(`ViewEvalProgressReport`)
    ).recordset;
    console.log(result);
    res.send(result);
    sql.close();
  } catch (err) {
    console.log(err);
    sql.close();
  }
};

// exports.checkGUCian = async function (req, res) {
//   try {
//     let pool = await sql.connect(config);
//     const result = await pool
//       .request()
//       .input("ID", sql.Int, req.body.studentID)
//       .output("Success", sql.Bit)
//       .execute(`checkGUCian`);
//     sql.close();
//     console.log("GUC???" + result.output.Success)
//     res.send({ isGucian: result.output.Success });
//   } catch (error) {
//     console.log(error);
//     sql.close();
//   }
// };

exports.checkGUCian = async function (req, res) {
  try {
    console.log("HELLO"+req.body.sid);
    let pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("ID", sql.VarChar, req.body.sid)
      .output("Success", sql.Bit)
      .execute(`checkGUCian`);
    console.log("result" + " " + result);
    console.log("result" + " " + result.output.Success);

    const GUCian = result.output.Success;
    console.log("GUCian: " + GUCian);
    res.send({
      isGUCian: result.output.Success
    })
  } catch (erorr) {
    sql.close();
  }
};
