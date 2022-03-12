var express = require("express");
var router = express.Router();
var config = require("../dbconfig");
const sql = require("mssql");
const adminoperations = require('../adminoperations');

router.get("/", async function (req, res) {

    console.log("I am in the router and get all students");

    adminoperations.AdminViewAllTheses().then(function (result) {
        res.send(result);
    })

})
module.exports = router;
