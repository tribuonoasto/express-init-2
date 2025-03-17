"use strict";

const userRepository = require("../repository/userRepository");
const { compareHash } = require("../helpers/bcryptjs");
const { generateToken } = require("../helpers/jwt");

const login = async (username, password) => {
    if (!username || !password) {
        throw { name: "invalid_credential" };
    }

    const user = await userRepository.findOne(username);
    if (!user) {
        throw { name: "invalid_credential" };
    }

    const validatePassword = await compareHash(password, user.password);
    if (!validatePassword) {
        throw { name: "invalid_credential" };
    }

    const payload = { sub: user.user_id, role_name: user.role_name, company_name: user.company_name, fullname: user.fullname};
    return generateToken(payload);
};

module.exports = { login };
