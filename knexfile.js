// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "localhost",
      port: 5433,
      database: "todo",
      user: "kalkarshivam",
      password: "password",
    },
  },
};
