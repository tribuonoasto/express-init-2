"use strict";

const postgres = require('../config/postgres');

const executeQuery = async (query, values = [], singleRow = false) => {
    try {
        const { rows } = await postgres.query(query, values);
        return singleRow ? rows[0] : rows;
    } catch (error) {
        console.error("Postgres Error:", error);
        error.name = "Postgres_Error";
        throw error;
    }
};

const executeTransaction = async (callback) => {
    const client = await postgres.connect();

    try {
        await client.query('BEGIN');
        const result = await callback(client);
        await client.query('COMMIT');
        return result;
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};

module.exports = {
    executeQuery,
    executeTransaction
};
