const express = require("express");
const pool = require("./database");
const app = express();
app.use(express.json());

const todoServer = () => {
  /**
   * Create, set up and return your express server, split things into separate files if it becomes too long!
   */

  // GET — ‘/todo’ — a route to see all todos
  app.get("/todo", async (req, res) => {
    const todo = await pool
      .query("SELECT * from todo ORDER BY id")
      .then((results) => {
        return results.rows;
      });
    res.status(200).json(todo);
  });

  // GET — ‘/todo/:id’ — A route to see details about an individual todo item
  app.get("/todo/:id", async (req, res) => {
    const id = req.params.id;
    const todo = await pool
      .query("SELECT * from todo WHERE id = $1", [id])
      .then((results) => {
        return results.rows[0];
      });
    console.log(todo);
    if (todo) {
      res.status(200).json(todo);
    } else {
      res.sendStatus(404);
    }
  });

  // POST — ‘/todo’ — Create a todo
  app.post("/todo", async (req, res) => {
    const { title, assignee, completed } = req.body;
    await pool
      .query(
        "INSERT INTO todo(title, assignee, completed) VALUES($1, $2, $3) RETURNING title, assignee, completed",
        [title, assignee, completed]
      )
      .then((results) => {
        return results.rows;
      });
    res.status(201).send(`Todo added`);
    res.end();
  });

  // PUT— ‘/todo/:id’ —the ability to update the assignee of a todo
  app.put("/todo/:id", (req, res) => {
    console.log(req);
    const id = parseInt(req.params.id);
    const { assignee } = req.body;
    pool.query(
      "UPDATE todo SET assignee = $1 WHERE id =$2",
      [assignee, id],
      (error, results) => {
        if (error) {
          throw error;
        } else {
          console.log(results.rows);
        }
        res.status(200).send(`Todo assignee modified with ID: ${id}`);
      }
    );
  });

  // PUT — ‘/todo/:id/complete— The ability to mark a todo complete
  app.put("/todo/:id/complete", (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(
      "UPDATE todo SET completed = $1 WHERE id = $2",
      [true, id],
      (error, results) => {
        if (error) {
          throw error;
        } else {
          console.log(results.rows);
        }
        res.status(200).send(`Todo COMPLETED modified with ID: ${id}`);
      }
    );
  });

  // DELETE — ‘/todo/:id —Delete a todo
  app.delete("/todo/:id", (req, res) => {
    const id = parseInt(req.params.id);
    pool.query("DELETE FROM todo WHERE id = $1", [id], (error, results) => {
      if (error) {
        throw error;
      } else {
        console.log(results.rows);
      }
      res.status(200).send(`Todo deleted with ID: ${id}`);
    });
  });
  return app;
};

module.exports = { todoServer };
