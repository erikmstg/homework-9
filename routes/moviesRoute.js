const express = require("express");
const {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/moviesController");
const { authorization } = require("../middlewares/auth");

const router = express.Router();

router.get("/", getMovies);
router.get("/:id", getMovieById);
router.post("/", authorization, createMovie);
router.put("/:id", authorization, updateMovie);
router.delete("/:id", authorization, deleteMovie);

module.exports = router;
