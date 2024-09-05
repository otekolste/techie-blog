const router = require("express").Router();

const userRoutes = require("./user-routes");
const commentRoutes = require("./comment-routes");
const postRoutes = require("./post-routes");

// Set up API routes
router.use("/users", userRoutes);
router.use("/comment", commentRoutes);
router.use("/posts", postRoutes);

module.exports = router;
