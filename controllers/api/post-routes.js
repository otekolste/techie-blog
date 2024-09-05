const router = require("express").Router();
const { Post } = require("../../models");

// CREATE NEW POST
router.post("/", async (req, res) => {
  try {
    const dbPost = await Post.create({
      // Create new post from params in request
      title: req.body.title,
      content: req.body.content,
      user_id: req.body.user_id,
    });

    req.session.save(() => {
      res.status(200).json(dbPost); // Save the session, return newly-created post as response
    });
  } catch (e) {
    res.status(500).json(e); // Catch error
  }
});

// UPDATE POST BY ID
router.put("/:id", async (req, res) => {
  try {
    const dbPost = await Post.findByPk(req.params.id); // Find corresponding post by ID
    if (!dbPost) {
      res.status(404).json("Unable to find post..."); // Edge case for if post isn't found somehow
    }
    dbPost.title = req.body.title; // Change title of post
    dbPost.content = req.body.content; // Change content of post
    await dbPost.save({ fields: ["title", "content"] }); // Save updated title and content
    res.status(200).json(dbPost); // Return updated post as a response
  } catch (e) {
    res.status(500).json(e); // Catch error
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const dbPost = await Post.findByPk(req.params.id); // Find corresponding post by ID
    if (!dbPost) {
      res.status(404).json("Unable to find post..."); // Edge case for if post isn't found somehow
    }
    await dbPost.destroy(); // Destroy post
    res.status(200).json("Deleted post."); // Send message back on success
  } catch (e) {
    res.status(500).json(e); // Catch error
  }
});

module.exports = router;
