var express = require("express");
var router = express.Router();
var adminoperations = require("../operations/adminoperations");


router.get('/admindata/:adminID', adminoperations.viewAdminProfile);




module.exports = router;