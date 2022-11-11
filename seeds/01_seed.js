/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const { seed_values } = require("../src/data");
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex("todo").del();
  await knex("todo").insert(seed_values);
};
