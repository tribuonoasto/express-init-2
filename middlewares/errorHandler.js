"use strict";

const errorHandler = (err, req, res, next) => {
    let code;
    let message;
    let data = {};

    switch (err.name) {
        case "invalid_credential":
            code = 400;
            message = "Invalid username or password.";
            break;
        case "expired_credential":
            code = 403;
            message = "Your account has expired. Please contact support.";
            break;
        case "invalid_token":
        case "JsonWebTokenError":
            code = 401;
            message = "The provided token is invalid.";
            break;
        case "expire_token":
        case "TokenExpiredError":
            code = 401;
            message = "Your session has expired. Please log in again.";
            break;
        case "SyntaxError":
            code = 400
            message = "The provided request is invalid"
            break;
        case "Postgres_Error":
            code = 500
            message = err.message
            break;
        case "forbidden":
            code = 500
            message = "Access Forbidden: You don't have permission"
            break;
        default:
            code = 500;
            message = "An unexpected error occurred.";
            break;
    }

    res.status(code).json({ code, message, data });
};

module.exports = errorHandler;
