var express = require("express");
var router = express.Router();
const studentoperations = require('../operations/studentoperations');

router.get("/", async function (req, res) {

    console.log("I am in the router");

    studentoperations.editMyProfile(req.firstName,req.lastName,req.password,req.email,req.address).then(function (result) {
        res.send(result)
    })

})
module.exports = router;
