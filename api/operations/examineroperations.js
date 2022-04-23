var config = require("./dbconfig");
const sql = require("mssql");

exports.getExaminerData = async function (req, res) {
  try {
    let pool = await sql.connect(config);
    const result = (
      await pool
        .request()
        .input("examinerId", sql.Int, req.params.examinerID)
        .execute(`ExaminerProfile`)
    ).recordset;
    console.log(result);
    res.send(result);
  } catch (err) {
    console.log(err);
    sql.close();
  }
};
exports.changeExaminerInformation = async function (req, res) {
  try {
    let pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("examinerID", sql.Int, req.params.examinerID)
      .input("oldPassword", sql.VarChar, req.body.oldPassword)
      .input("newPassword", sql.VarChar, req.body.newPassword)
      .output("Success", sql.Bit)
      .execute(`editExaminerPassword`);
    if (result.output.Success) {
      res.send({ isUpdated: true });
    } else {
      res.send({ isUpdated: false });
    }
  } catch (err) {
    console.log(err);
    sql.close();
  }
};

exports.examinerEvaluateDefense = async function (req, res) {
  try {
    let pool = await sql.connect(config);
    const result = (
      await pool
        .request()
        .input("id", sql.Int, req.params.examinerID)
        .execute(`ExaminerAttendedDefense`)
    ).recordset;
    res.send(result);
  } catch (err) {
    console.log(err);
    sql.close();
  }
};
exports.addCommentAndGrade = async function (req, res) {
  try {
    let pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("ThesisSerialNo", sql.Int, req.body.serialNumber)
      .input("comments", sql.VarChar, req.body.comment)
      .input("DefenseDate", sql.Date, req.body.defenseDate)
      .input("grade", sql.Int, req.body.grade)
      .execute(`AddCommentsGrade`);
    res.send({ isUpdated: true });
  } catch (err) {
    console.log(err);
    sql.close();
  }
};
