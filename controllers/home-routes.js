const router = require("express").Router();
const { Post, User, Comment } = require("../models");

router.get("/", async (req, res) => {
  // GET HTML root route
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
    res.render("homepage", {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (e) {
    res.status(500).json(e);
  }
});

// GET HTML route for dashboard
router.get("/dashboard", async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect("/login");
  } else {
    try {
      const userPostData = await Post.findAll({
        where: {
          user_id: req.session.user_id,
        },
        include: [
          {
            model: User,
            attributes: ["username"],
          },
        ],
      });
      const posts = userPostData.map((post) => post.get({ plain: true }));
      res.render("dashboard", {
        posts,
        loggedIn: req.session.loggedIn,
        user_id: req.session.user_id,
      });
    } catch (e) {
      res.status(500).json(e);
    }
  }
});

router.get("/newpost", async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect("/login");
  } else {
    try {
      res.render("new-post-form", {
        loggedIn: req.session.loggedIn,
        user_id: req.session.user_id,
      });
    } catch (e) {
      res.status(500).json(e);
    }
  }
});

// GET HTML route for login form
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/post/:id", async (req, res) => {
  try {
    if (!req.session.loggedIn) {
      res.redirect("/login");
    } else {
      const postData = await Post.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ["username"],
          },
          {
            model: Comment,
            include: [
              {
                model: User,
                attributes: ["username"],
              },
            ],
          },
        ],
      });
      const post = postData.get({ plain: true });
      res.render("post-details", {
        post,
        loggedIn: req.session.loggedIn,
        user_id: req.session.user_id,
      });
    }
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;
