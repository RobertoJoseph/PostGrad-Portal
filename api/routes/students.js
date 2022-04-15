var express = require("express");
var router = express.Router();
var config = require("../operations/dbconfig");
const sql = require("mssql");
var studentOperations = require("../operations/studentoperations");


router.post("/addStudent", studentOperations.StudentRegister);

router.get(
  "/studenttheses/:studentID",
  studentOperations.viewStudentThesisById
);
router.get("/studentcourses/:studentID", studentOperations.viewStudentCourses);
router.post("/addprogressreport", studentOperations.addAndFillProgressReport);
router.get(
  "/viewStudentPublications/:studentID",
  studentOperations.viewStudentPublications
);

router.get("/studentdata/:studentID", studentOperations.viewStudentDataById);

router.post("/changepassword", studentOperations.editMyPassword);

router.post("/addpublication/:studentID", studentOperations.addPublication);
router.get(
  "/getIdOfSelectedThesis/:studentID/:thesisTitle",
  studentOperations.getIdOfSelectedThesis
);
router.post("/linkpublication", studentOperations.linkPublicationToThesis);

router.get(
  "/studentProgressReports/:studentID",
  studentOperations.ViewEvalProgressReport
);

router.post("/isGUCian/:studentID", studentOperations.checkGUCian);

router.get(
  "/studentProgressReports/:studentID",
  studentOperations.ViewEvalProgressReport
);

module.exports = router;
