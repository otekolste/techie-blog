const { User } = require("../models");

const userData = [
  {
    username: "coolguy123",
    email: "coolguy@gmail.com",
    password: "coolpassword",
  },
  {
    username: "awesomeguy123",
    email: "awesomeguy@gmail.com",
    password: "awesomepassword",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
