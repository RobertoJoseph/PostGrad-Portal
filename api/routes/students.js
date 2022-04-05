var express = require("express");
var router = express.Router();
var config = require("../operations/dbconfig");
const sql = require("mssql");
var studentOperations = require("../operations/studentoperations");

router.get("/", async function (req, res) {
  try {
    let pool = await sql.connect(config);
    const result = await pool.request().query("Select * from GucianStudent");
    console.log("I am in the router and get all students");
    res.send(result.recordsets);
  } catch (error) {
    console.log(error);
  }
});
router.post("/addStudent", studentOperations.StudentRegister);
router.get(
  "/studenttheses/:studentID",
  studentOperations.viewStudentThesisById
);
router.get("/studentcourses/:studentID", studentOperations.viewStudentCourses);
router.post("/addprogressreport", studentOperations.addAndFillProgressReport);

module.exports = router;
