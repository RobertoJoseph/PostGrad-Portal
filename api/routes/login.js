var express = require("express");
var router = express.Router();
var config = require("../dbconfig");
const sql = require("mssql");
const loginoperations = require('../operations/loginoperations');

router.get("/", async function (req, res) {

    console.log("I am in the router");

    loginoperations.Login(req.body.email, req.body.password).then(function (result) {
        res.send(result)
    })

})
module.exports = router;
