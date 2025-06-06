const express = require("express");
const router = express.Router();
const accessController = require("../controllers/accessController");

router.get("/access/:customerId", accessController.checkCustomerAccess);

module.exports = router;
