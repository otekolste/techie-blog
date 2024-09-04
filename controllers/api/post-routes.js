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
  } catch (e) {
    console.log(err);
    res.status(500).json(e);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const dbPost = await Post.findByPk(req.params.id);
    if (!dbPost) {
      res.status(404).json("Unable to find post...");
    }
    dbPost.title = req.body.title;
    dbPost.content = req.body.content;
    await dbPost.save({ fields: ["title", "content"] });
    res.status(200).json(dbPost);
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;
