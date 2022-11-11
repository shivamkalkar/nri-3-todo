const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const { todoServer } = require("../src/server");
// this enables us to use .should assertions instead of expecct. Personal Preference
chai.should();
const { seed_values } = require("../src/data");

/*
 * This sprint you will have to create all tests yourself, TDD style.
 * For this you will want to get familiar with chai-http https://www.chaijs.com/plugins/chai-http/
 * The same kind of structure that you encountered in lecture.express will be provided here.
 */
const server = todoServer();
describe("todo API Server", () => {
  let request;
  beforeEach(() => {
    request = chai.request(server);
  });
  afterEach(() => {
    request.close();
  });

  // GET — ‘/todo’ — a route to see all todos
  describe("GET /todo - return todo list", () => {
    it("should return the todo list", async () => {
      const res = await request.get("/todo");
      JSON.parse(res.text).should.deep.equal(seed_values);
    });
  });

  // GET — ‘/todo/:id’ — A route to see details about an individual todo item
  describe("GET /todo/1 - return todo item1", () => {
    it("should return the todo list", async () => {
      const res = await request.get("/todo/1");
      JSON.parse(res.text).should.deep.equal(seed_values[0]);
    });
  });

  // POST — ‘/todo’ — Create a todo
  describe("POST /todo - add todo item", () => {
    it("should add the todo item", async () => {
      const addTodo = {
        title: "Buy Milk",
        assignee: "Me",
        completed: true,
      };
      const res = await request.post("/todo").send(addTodo);
      res.should.have.status(201);
      res.text.should.equal("Todo added");
    });
  });

  //  PUT— ‘/todo/:id’ —the ability to update the assignee of a todo
  describe("PUT /todo/:id - Update assignee of todo item", () => {
    it("should update assignee for given id", async () => {
      const updateAssignee = {
        assignee: "Uncle",
      };
      const res = await request.put("/todo/3").send(updateAssignee);
      res.should.have.status(200);
      res.text.should.equal(`Todo assignee modified with ID: 3`);
    });
  });

  // PUT — ‘/todo/:id/complete— The ability to mark a todo complete
  describe("PUT /todo/:id/complete - Mark item as completed", () => {
    it("should mark completed as True for given id", async () => {
      const updateStatus = {
        completed: true,
      };
      const res = await request.put("/todo/2/complete").send(updateStatus);
      res.should.have.status(200);
      res.text.should.equal(`Todo COMPLETED modified with ID: 2`);
    });
  });

  // DELETE — ‘/todo/:id —Delete a todo
  describe("DELETE /todo/:id - Delete selected id", () => {
    it("should mark completed as True for given id", async () => {
      const res = await request.delete("/todo/2");
      res.should.have.status(200);
      res.text.should.equal(`Todo deleted with ID: 2`);
    });
  });
});
