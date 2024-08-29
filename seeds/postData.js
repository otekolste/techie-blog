const { Post } = require("../models");

const postData = [
  {
    title: "Cookies!!!",
    content: "Learning about cookies makes me hungry...lol",
    user_id: 1,
  },
  {
    title: "Sequelize or plain SQL?",
    content:
      "I like Sequelize better myself but some of my classmates prefer plain SQL...",
    user_id: 2,
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
