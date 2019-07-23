process.env.NODE_ENV = "test";

const { expect } = require("chai");
const request = require("supertest");

const app = require("../../server");
const conn = require("../utils/helpers/setupTear");
const { users, populateUsers } = require("./data/user");

beforeEach(populateUsers);

describe("POST /register", () => {
  before(done => {
    conn
      .connect()
      .then(() => done())
      .catch(err => done(err));
  });

  after(done => {
    conn
      .close()
      .then(() => done())
      .catch(err => done(err));
  });

  it("OK, creating a new user", done => {
    let user = {
      email: "user@email.com",
      name: "user",
      lastname: "userlast",
      username: "iwanttojoin",
      password: "joinme1234",
      confirmPassword: "joinme1234"
    };
    request(app)
      .post("/api/auth/register")
      .send(user)
      .then(res => {
        const body = res.body;
        const status = res.status;

        expect(status).to.equal(200);
        expect(body).to.have.property("_id");
        expect(body.email).to.equal(user.email);
        done();
      })
      .catch(err => done(err));
  });

  it("Fail, email already exists", done => {
    const name = "user";
    const lastname = "userlast";
    const username = "iwanttojoin";
    const password = "joinme1234";
    const confirmPassword = "joinme1234";

    request(app)
      .post("/api/auth/register")
      .send({
        email: users[0].email,
        name,
        lastname,
        username,
        password,
        confirmPassword
      })
      .expect(409)
      .end(done);
  });

  it("Fail, invalid credentials", done => {
    const email = "asdvsdf";
    const name = "user";
    const lastname = "userlast";
    const username = "iwanttojoin";
    const password = "sd3";
    const confirmPassword = "sd3";

    request(app)
      .post("/api/auth/register")
      .send({
        email,
        name,
        lastname,
        username,
        password,
        confirmPassword
      })
      .expect(400)
      .end(done);
  });
});
