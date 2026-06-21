const express = require("express");
const router = express.Router();
const AddEmergency = require("../controllers/Emergency.controller");

router.get("/alldata", AddEmergency.ViewAllEmergency);

module.exports = router;
