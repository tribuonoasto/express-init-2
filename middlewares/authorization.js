"use strict";

const roleAuthorization = (allowedRoles = []) => {
    return (req, res, next) => {
        const { role_name } = req.user;

        if (!allowedRoles.includes(role_name)) {
            throw { name: "forbidden" };
        }

        next();
    };
};

module.exports = { roleAuthorization };
