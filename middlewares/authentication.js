"use strict";

const { verifyToken } = require("../helpers/jwt");
const userRepository = require("../repository/userRepository");

const authentication = async (req, res, next) => {
    try {
        let token = null;
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1];
        }

        if (!token && req.cookies) {
            token = req.cookies.token;
        }

        if (!token) {
            throw { name: "invalid_token" };
        }

        const payload = verifyToken(token);

        const user = await userRepository.findOneByPK(payload.sub);
        if (!user) {
            throw { name: "invalid_token" };
        }
        req.user = { user_id: user.user_id, role_name: user.role_name, company_name: user.company_name, fullname: user.fullname };

        next();
    } catch (error) {
        next(error);
    }
};

module.exports = authentication;
