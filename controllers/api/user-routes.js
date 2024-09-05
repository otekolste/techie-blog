const router = require("express").Router();
const { User } = require("../../models");

// THE FOLLOWING CODE IS BASED OFF OF EXAMPLE CODE PROVIDED BY edX

// CREATE new user
router.post("/", async (req, res) => {
  try {
    const dbUserData = await User.create({
      // Create new User from params provided in request
      username: req.body.username,
      password: req.body.password,
    });

    req.session.save(() => {
      // Save session, including info that user is logged in and the corresponding user ID, and return newly-created user as response
      req.session.loggedIn = true;
      req.session.user_id = dbUserData.id;
      res.status(200).json(dbUserData);
    });
  } catch (err) {
    res.status(500).json(err); // Catch error
  }
});

// LOG IN
router.post("/login", async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      // Find the corresponding user in database
      where: {
        username: req.body.username,
      },
    });

    if (!dbUserData) {
      // Throw error if user does not exist in db
      res.status(400).json({
        message: "We couldn't find an account associated with that username!",
      });
      return;
    }
    // Check password with hashed version stored in db
    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      // If password doesn't match stored version, throw error
      res.status(400).json({
        message:
          "Password does not match password associated with account. Please try again!",
      });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true; // Save session, with variable indicating user is logged in and corresponding user ID
      req.session.user_id = dbUserData.id;

      res
        .status(200) // On a success, return user as a response and message
        .json({ user: dbUserData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(500).json(err); // Catch error
  }
});

// LOGOUT
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      // Destroy the session
      res.status(204).end(); // End response process
    });
  } else {
    res.status(404).end(); // If user isn't logged in, respond with not found and end response process
  }
});

module.exports = router;
