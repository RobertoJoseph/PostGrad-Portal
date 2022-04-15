var express = require("express");
var router = express.Router();
var supervisoroperations = require("../operations/supervisoroperations");

router.get('/supervisordata/:supervisorId',supervisoroperations.getSupervisorData);



module.exports = router;
