var config = require("./dbconfig");
const sql = require("mssql");

async function editExaminerName() {
  try {
    let pool = await sql.connect(config);
    const result = await pool.request().execute(`editExaminerName`);
    sql.close();
  } catch (erorr) {
    console.log(erorr);
    sql.close();
  }
}

async function editExaminerField() {
  try {
    let pool = await sql.connect(config);
    const result = await pool.request().execute(`editExaminerField`);
    sql.close();
  } catch (erorr) {
    console.log(erorr);
    sql.close();
  }
}

async function editExaminerEmail() {
  try {
    let pool = await sql.connect(config);
    const result = await pool.request().execute(`editExaminerEmail`);
    sql.close();
  } catch (erorr) {
    console.log(erorr);
    sql.close();
  }
}

async function editExaminerPassword() {
  try {
    let pool = await sql.connect(config);
    const result = await pool.request().execute(`editExaminerPassword`);
    sql.close();
  } catch (erorr) {
    console.log(erorr);
    sql.close();
  }
}

async function AddCommentsGrade(ThesisSerialNo, DefenseDate, comments) {
  try {
    let pool = await sql.connect(config);
    const result = (
      await pool
        .request()
        .input("ThesisSerialNo", sql.Int, ThesisSerialNo)
        .input("DefenseDate", sql.Date, DefenseDate)
        .input("comments", sql.VarChar, comments)
        .execute(`AddCommentsGrade`)
    ).recordset;
    console.log(result);
    sql.close();
    return result;
  } catch (erorr) {
    console.log(erorr);
    sql.close();
  }
}

async function AddDefenseGrade(ThesisSerialNo, DefenseDate, grade) {
  try {
    let pool = await sql.connect(config);
    const result = (
      await pool
        .request()
        .input("ThesisSerialNo", sql.Int, ThesisSerialNo)
        .input("DefenseDate", sql.Date, DefenseDate)
        .input("grade", sql.Decimal, grade)
        .execute(`AddDefenseGrade`)
    ).recordset;
    console.log(result);
    sql.close();
    return result;
  } catch (erorr) {
    console.log(erorr);
    sql.close();
  }
}

async function searchThesis(searchkey) {
  try {
    let pool = await sql.connect(config);
    const result = (
      await pool
        .request()
        .input("searchkey", sql.VarChar, searchkey)
        .execute(`searchThesis`)
    ).recordset;
    console.log(result);
    sql.close();
    return result;
  } catch (erorr) {
    console.log(erorr);
    sql.close();
  }
}

async function examinerAttendedDefense(id) {
  try {
    let pool = await sql.connect(config);
    const result = (
      await pool
        .request()
        .input("id", sql.Int, id)
        .execute(`examinerAttendedDefense`)
    ).recordset;
    console.log(result);
    sql.close();
    return result;
  } catch (erorr) {
    console.log(erorr);
    sql.close();
  }
}

module.exports = {
  editExaminerName,
  editExaminerField,
  editExaminerEmail,
  editExaminerPassword,
  AddCommentsGrade,
  AddDefenseGrade,
  searchThesis,
  examinerAttendedDefense,
};
