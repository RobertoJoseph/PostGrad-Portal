var express = require("express");
var router = express.Router();
var config = require("../operations/dbconfig");
const sql = require("mssql");
const loginoperations = require("../operations/loginoperations");

router.post("/findstudent", loginoperations.Login);

module.exports = router;
