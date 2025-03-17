"use strict";

const bcrypt = require("bcryptjs");

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10); // Generate salt asynchronously
  const hash = await bcrypt.hash(password, salt); // Hash password asynchronously
  return hash;
}

async function compareHash(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword); // Compare asynchronously
}

module.exports = { hashPassword, compareHash };
