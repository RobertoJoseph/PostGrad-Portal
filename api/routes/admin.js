var express = require("express");
var router = express.Router();
var adminoperations = require("../operations/adminoperations");


router.get('/admindata/:adminID', adminoperations.viewAdminProfile);

router.get('/listsupervisors/', adminoperations.AdminListSup);

router.get('/listsuptheses/:supervisorID', adminoperations.AdminViewStudentThesisBySupervisor);

router.get('/listtheses/', adminoperations.AdminViewAllTheses);

router.post('/incrementExtension/:serialNumber', adminoperations.AdminUpdateExtension);





module.exports = router;