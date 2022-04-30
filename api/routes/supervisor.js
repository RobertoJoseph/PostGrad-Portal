var express = require("express");
var router = express.Router();
var supervisoroperations = require("../operations/supervisoroperations");

router.get('/supervisordata/:supervisorId',supervisoroperations.getSupervisorData);

router.get('/mystudents/:supervisorId',supervisoroperations.showSupervisorStudents);

router.get('/publications/:studentId',supervisoroperations.ViewStudentPublications);

router.get('/reports/:studentId',supervisoroperations.supervisorListProgressReport);

router.get('/examiners',supervisoroperations.getExaminers);

router.post('/addDefense',supervisoroperations.SupervisorAddDefense);

router.get('/cancelthesis/:thesisSerialNumber',supervisoroperations.CancelThesis);

router.post('/evaluate',supervisoroperations.SupervisorEvaluateReport);

router.post('/changepassword/:supervisorId',supervisoroperations.editPassword);

module.exports = router;
