const { ObjectId } = require("mongodb");
const { User } = require("../../models/user");

const users = [
  {
    _id: ObjectId("5affe783a49ebd0355359913"),
    email: "user@admin.com",
    name: "user",
    lastname: "userlast",
    username: "iwillbanyou",
    password: "banHammer1234",
    profileImage: "somestring",
    history: [],
    role: 1,
    resetToken: "sometoken",
    resetTokenExpiration: 4441332299999,
    stripe_customer: {},
    createdAt: "2019-07-16T06:30:09.934Z",
    updatedAt: "2019-07-16T06:30:09.934Z"
  },
  {
    _id: ObjectId("5affe783a49ebd0355359914"),
    email: "user1@email.com",
    name: "user",
    lastname: "anotheruser",
    username: "testuser",
    password: "password1234",
    profileImage: "somethingsomthing",
    history: [],
    role: 0,
    resetToken: "emptystring",
    resetTokenExpiration: 0,
    stripe_customer: {},
    createdAt: "2019-07-16T06:30:09.934Z",
    updatedAt: "2019-07-16T06:30:09.934Z"
  },
  {
    _id: ObjectId("5affe783a49ebd0355359915"),
    email: "newuser@email.com",
    name: "newuser",
    lastname: "newuserlast",
    username: "iamnewhere",
    password: "mypassword1234",
    profileImage: "thissomestring",
    history: [],
    role: 0,
    resetToken: "newsometoken",
    resetTokenExpiration: 4441332299955,
    stripe_customer: {},
    createdAt: "2019-07-16T07:25:09.934Z",
    updatedAt: "2019-07-16T07:25:09.934Z"
  }
];

const populateUsers = done => {
  User.remove({})
    .then(() => {
      var userOne = new User(users[0]).save();
      var userTwo = new User(users[1]).save();

      return Promise.all([userOne, userTwo]);
    })
    .then(() => done());
};

module.exports = {
  users,
  populateUsers
};
