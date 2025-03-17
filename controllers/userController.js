"use strict";

const { buildResponse } = require("../helpers/responseBuilder");
const userService = require("../services/userService");

const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const token = await userService.login(username, password);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 86400000,
        });

        res.status(200).json(buildResponse(200, "success", {}));
    } catch (error) {
        next(error);
    }
};

const logout = async (req, res, next) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
        });

        res.status(200).json(buildResponse(200, "success", {}));
    } catch (error) {
        next(error);
    }
};

const authentication = async (req, res, next) => {
    try {
        const user = req.user;
        res.status(200).json(buildResponse(200, "success", user));
    } catch (error) {
        next(error);
    }
}

module.exports = { login, logout, authentication };
