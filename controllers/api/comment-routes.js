const router = require("express").Router();
const { Comment } = require("../../models");

// CREATE NEW COMMENT
router.post("/", async (req, res) => {
  try {
    const dbComment = await Comment.create({
      content: req.body.comment,
      user_id: req.body.user_id,
      post_id: req.body.post_id,
    });

    req.session.save(() => {
      res.status(200).json(dbComment);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
