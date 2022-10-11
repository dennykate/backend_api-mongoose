import express from "express";
import {
  createMovie,
  deleteMovie,
  getMovieBySlug,
  getMovies,
  getRandomMovies,
  searchMovieByName,
  updateMovie,
} from "../controllers/movie.js";
import { onlyAdmin } from "../auth/index.js";

const router = express.Router();

router.get("/", getMovies);
router.get("/slug=:slug", getMovieBySlug);
router.get("/random", getRandomMovies);
router.get("/search/name=:name", searchMovieByName);
router.post("/", onlyAdmin, createMovie);
router.patch("/:id", onlyAdmin, updateMovie);
router.delete("/:id", onlyAdmin, deleteMovie);

export default router;
