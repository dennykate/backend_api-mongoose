import mongoose from "mongoose";
import Movie from "../models/movie.js";

export const getMovies = async (req, res) => {
  const options = req.query;

  const filter = options.filter || {};
  const page = parseInt(options.page) || 1;
  const limit = 12;
  const skip = (page - 1) * limit;

  try {
    const movies = await Movie.find(filter)
      .sort({ id: -1 })
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      meta: {
        total: movies.length,
        page,
        skip,
        filter,
      },
      data: movies,
    });
  } catch (error) {
    return res.sendStatus(500);
  }
};

export const getMovieBySlug = async (req, res) => {
  const slug = req.params.slug;

  if (!slug) return res.sendStatus(404);

  try {
    const movie = await Movie.find({ slug });

    if (movie.length == 0) return res.sendStatus(404);

    return res.status(200).json({ data: movie });
  } catch (error) {
    return res.sendStatus(500);
  }
};

export const getRandomMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    let arr = [];

    for (let i = 0; i < 8; i++) {
      arr.push(movies[Math.floor(Math.random() * movies.length)]);
    }

    return res.status(200).json(arr);
  } catch (error) {
    return res.sendStatus(500);
  }
};

export const searchMovieByName = async (req, res) => {
  const name = req.params.name;

  if (!name) return res.sendStatus(404);

  const options = req.query;

  const filter = options.filter || {};
  const page = parseInt(options.page) || 1;
  const limit = 12;
  const skip = (page - 1) * limit;

  try {
    const movies = await Movie.find({ slug: { $regex: `${name}` }, ...filter })
      .sort({ id: -1 })
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      meta: {
        total: movies.length,
      },
      data: movies,
    });
  } catch (error) {
    return res.sendStatus(500);
  }
};

export const createMovie = async (req, res) => {
  const movies = await Movie.find();
  const id = movies.length + 1;

  const newMovie = new Movie({ id, ...req.body });

  try {
    await newMovie.save();

    return res.status(200).json({
      meta: {
        _id: newMovie._id,
      },
      data: newMovie,
    });
  } catch (error) {
    return res.sendStatus(500);
  }
};

export const updateMovie = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.sendStatus(404);
  }

  try {
    const movie = await Movie.findByIdAndUpdate(id, req.body, { new: false });

    if (!movie) return res.sendStatus(404);

    return res.status(200).json({
      meta: {
        _id: movie._id,
      },
      data: movie,
    });
  } catch (error) {
    return res.sendStatus(500);
  }
};

export const deleteMovie = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.sendStatus(404);

  try {
    await Movie.findByIdAndRemove(id);

    return res.status(200).json({
      message: "remove success",
    });
  } catch (error) {
    return res.sendStatus(500);
  }
};
