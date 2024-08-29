const router = require("express").Router();
const { Post, User } = require("../models");

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    console.log(posts);
    res.render("homepage", {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get("/dashboard", async (req, res) => {
  if (!req.session.logged_in) {
    res.redirect("/login");
  } else {
    // TODO: RENDER USER'S POSTS AS WELL AS BUTTON TO CREATE NEW POST
  }
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

module.exports = router;
