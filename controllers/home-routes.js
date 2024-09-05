const router = require("express").Router();
const { Post, User, Comment } = require("../models");

// GET HTML root route
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      // Find all posts, ordered by most recent; include User username
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
      order: [["dateCreated"]],
    });
    const posts = postData.map((post) => post.get({ plain: true })); // Map data into array with plain data
    res.render("homepage", {
      // Render homepage template, passing posts and loggedIn session variable
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (e) {
    res.status(500).json(e); // Catch error
  }
});

// GET HTML route for dashboard
router.get("/dashboard", async (req, res) => {
  if (!req.session.loggedIn) {
    // If user is not logged in, redirect to login page
    res.redirect("/login");
  } else {
    try {
      const userPostData = await Post.findAll({
        // Find all posts written by user who is logged in
        where: {
          user_id: req.session.user_id,
        },
        include: [
          // Include username
          {
            model: User,
            attributes: ["username"],
          },
        ],
      });
      const posts = userPostData.map((post) => post.get({ plain: true })); // Map results onto an array with plain data
      res.render("dashboard", {
        // Render dashboard, passing posts, logged in variable, and user id variable
        posts,
        loggedIn: req.session.loggedIn,
        user_id: req.session.user_id,
      });
    } catch (e) {
      res.status(500).json(e); // Catch error
    }
  }
});

// HTML route to render new post form
router.get("/newpost", async (req, res) => {
  if (!req.session.loggedIn) {
    // If user is not logged in, redirect to login page
    res.redirect("/login");
  } else {
    try {
      res.render("new-post-form", {
        // Render form to upload a new post, passing logged in session variable and user ID
        loggedIn: req.session.loggedIn,
        user_id: req.session.user_id,
      });
    } catch (e) {
      res.status(500).json(e); // Catch error
    }
  }
});

// HTML route to render post editor
router.get("/editpost/:id", async (req, res) => {
  if (!req.session.loggedIn) {
    // If user is not logged in, redirect to login page
    res.redirect("/login");
  } else {
    try {
      const postData = await Post.findByPk(req.params.id); // Find corresponding post by ID
      const post = postData.get({ plain: true }); // Get post data as plain
      res.render("edit-post-form", {
        // Render post editor, passing the post information, logged in session variable, and user ID
        post,
        loggedIn: req.session.loggedIn,
        user_id: req.session.user_id,
      });
    } catch (e) {
      res.status(500).json(e); // Catch error
    }
  }
});

// GET HTML route for login form
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    // If user is already logged in, redirect to root
    res.redirect("/");
    return;
  }

  res.render("login"); // Render login page
});

// GET HTML route for signup form
router.get("/signup", (req, res) => {
  res.render("signup"); // Render signup page
});

// GET HTML route for rendering a specific post
router.get("/post/:id", async (req, res) => {
  try {
    if (!req.session.loggedIn) {
      // If user is not logged in, redirect to login page
      res.redirect("/login");
    } else {
      const postData = await Post.findByPk(req.params.id, {
        // Find post with corresponding ID, including username and all comments (and comments' users)
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
      if (!postData) {
        res.status(404).json("Unable to find post..."); // Edge case for if post isn't found somehow
      }
      const post = postData.get({ plain: true }); // Get post data as plain
      res.render("post-details", {
        // Render post details page, passing along post data, logged in session variable, and user id
        post,
        loggedIn: req.session.loggedIn,
        user_id: req.session.user_id,
      });
    }
  } catch (e) {
    res.status(500).json(e); // Catch error
  }
});

module.exports = router;
