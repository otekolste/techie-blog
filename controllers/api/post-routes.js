const router = require("express").Router();
const { Post } = require("../../models");

// CREATE NEW COMMENT
router.post("/", async (req, res) => {
  try {
    const dbPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.body.user_id,
    });

    req.session.save(() => {
      res.status(200).json(dbPost);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
