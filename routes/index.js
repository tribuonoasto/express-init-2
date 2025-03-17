"use strict";

const express = require("express");
const router = express.Router();

const userRouter = require("./userRoute")

const authentication = require("../middlewares/authentication");

router.use("/user", userRouter);

router.use(authentication);



module.exports = router;