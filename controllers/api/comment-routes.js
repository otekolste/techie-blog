const router = require("express").Router();
const { Comment } = require("../../models");

// CREATE NEW COMMENT
router.post("/", async (req, res) => {
  try {
    const dbComment = await Comment.create({
      // Create comment from request parameters
      content: req.body.comment,
      user_id: req.body.user_id,
      post_id: req.body.post_id,
    });

    req.session.save(() => {
      // Save the session, return newly-created comment as a response
      res.status(200).json(dbComment);
    });
  } catch (err) {
    res.status(500).json(err); // Catch error if needed
  }
});

module.exports = router;
