var express = require("express");
var router = express.Router();
var adminoperations = require("../operations/adminoperations");


router.get('/admindata/:adminID', adminoperations.viewAdminProfile);

router.get('/listsupervisors/', adminoperations.AdminListSup);

router.get('/listsuptheses/:supervisorID', adminoperations.AdminViewStudentThesisBySupervisor);

router.get('/listtheses/', adminoperations.AdminViewAllTheses);

router.post('/incrementExtension/:serialNumber', adminoperations.AdminUpdateExtension);

router.get('/allgucians/', adminoperations.viewAllGUCians);

router.get('/allnongucians/', adminoperations.viewAllNonGUCians);

router.get('/courses/', adminoperations.viewAllCourses);

router.post('/addcourse/', adminoperations.addCourse);

router.post('/linkcourse/', adminoperations.linkCourse);

router.post('/addgrade/', adminoperations.addGrade);

router.get('/enrolledstudents/:courseID', adminoperations.AdminListNonGucianCourse);


module.exports = router;