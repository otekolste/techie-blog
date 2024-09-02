const { Comment } = require("../models");

const commentData = [
  {
    content: "me toooo XD",
    post_id: 1,
    user_id: 2,
  },
  {
    content: "MongoDB >>>>>",
    post_id: 2,
    user_id: 1,
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
