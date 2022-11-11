const { seed_values } = require("./seed_values.json");

module.exports = {
  seed_values,
};

// const { seed_values } = require("./seed_values);
// /**
//  * @param { import("knex").Knex } knex
//  * @returns { Promise<void> }
//  */
//  exports.seed = async function(knex) {
//   // Deletes ALL existing entries
//   // Deletes ALL existing entries
//   await knex('todo').del()
//   await knex('todo').insert([
//     { id: 1, title: 'npm setup', assignee: 'Set up npm environment for solo project', completed: true },
//     { id: 2, title: 'check postgre connection', assignee: 'postgre for migrations', completed: false },
//     { id: 3, title: 'knex setup', assignee: 'install knex', completed: false }
//   ]);
// };
