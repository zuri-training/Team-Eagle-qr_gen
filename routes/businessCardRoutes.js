const express = require("express");
const businessCardController = require("../controllers/businessCardController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.route("/addBusinessCard").post(authController.protect, businessCardController.addBusinessCard);

module.exports = router;
