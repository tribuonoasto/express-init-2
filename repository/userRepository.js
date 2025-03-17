"use strict";

const { executeQuery } = require('../helpers/executeQuery');
const schema = process.env.POSTGRES_SCHEMA;

const findOne = async (username) => {
    const query = `
        SELECT u.*, c.company_name, r.role_name 
        FROM ${schema}.user u
        INNER JOIN ${schema}.company c ON u.company_id = c.company_id
        INNER JOIN ${schema}.role r ON u.role_id = r.role_id
        WHERE u.username = $1
    `;

    return executeQuery(query, [username], true);
};

const findOneByPK = async (userId) => {
    const query = `
        SELECT u.user_id, u.fullname, u.username, u.email, u.created_at, c.company_name, r.role_name 
        FROM ${schema}.user u
        INNER JOIN ${schema}.company c ON u.company_id = c.company_id
        INNER JOIN ${schema}.role r ON u.role_id = r.role_id
        WHERE u.user_id = $1
    `;

    return executeQuery(query, [userId], true);
};

module.exports = {
    findOne,
    findOneByPK
};
