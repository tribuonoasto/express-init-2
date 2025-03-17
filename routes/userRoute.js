"use strict";

const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController")
const authentication = require("../middlewares/authentication");

router.post("/login", userController.login);

router.use(authentication);
router.post("/logout", userController.logout);
router.get("/authentication", userController.authentication)


module.exports = router;