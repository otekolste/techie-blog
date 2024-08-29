const { User } = require("../models");

const userData = [
  {
    username: "coolguy123",
    password: "coolpassword",
  },
  {
    username: "awesomeguy123",
    password: "awesomepassword",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
