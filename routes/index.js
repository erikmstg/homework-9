const express = require("express");
const router = express.Router();
const moviesRoute = require("./moviesRoute");
const authRoute = require("./usersRoute");
const { authentication } = require("../middlewares/auth");

router.use("/users", authRoute);
router.use("/movies", authentication, moviesRoute);

module.exports = router;
