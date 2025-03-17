"use strict";

const buildResponse = (code = 500, message = "", data = {}) => {
    return {
        code,message,data
    }
}

module.exports={
    buildResponse
}