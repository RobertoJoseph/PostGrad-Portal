var express = require("express");
var router = express.Router();
var config = require("../operations/dbconfig");
const sql = require("mssql");
var examinerOperations = require("../operations/examineroperations");

router.get("/examinerdata/:examinerID", examinerOperations.getExaminerData);
router.post(
  "/changeinformation/:examinerID",
  examinerOperations.changeExaminerInformation
);
router.get(
  "/attenddefense/:examinerID",
  examinerOperations.examinerEvaluateDefense
);
router.post("/addCommentGrade", examinerOperations.addCommentAndGrade);
module.exports = router;
