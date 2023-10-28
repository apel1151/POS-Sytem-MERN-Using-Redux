const express = require("express");
const { loginController, registerController } = require("../controllers/userController");

const router = express.Router();

//login routes
router.post("/login", loginController);

//register routes
router.post("/register", registerController);

module.exports = router;