var express = require("express");
var router = express.Router();
var supervisoroperations = require("../operations/supervisoroperations");

router.get(
  "/supervisordata/:supervisorId",
  supervisoroperations.getSupervisorData
);

router.get(
  "/mystudents/:supervisorId",
  supervisoroperations.showSupervisorStudents
);

router.get(
  "/publications/:studentId",
  supervisoroperations.ViewStudentPublications
);

router.get(
  "/reports/:studentId",
  supervisoroperations.supervisorListProgressReport
);
router.get(
  "/reports/:supervisorId",
  supervisoroperations.supervisorListProgressReport
);

router.get("/examiners", supervisoroperations.getExaminers);

router.get(
  "/cancelthesis/:thesisSerialNumber",
  supervisoroperations.CancelThesis
);
router.post("/addDefense", supervisoroperations.SupervisorAddDefense);
router.post("/addSupervisor", supervisoroperations.addSupervisor);

module.exports = router;
