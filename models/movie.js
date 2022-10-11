import mongoose from "mongoose";

const MovieSchema = mongoose.Schema({
  title: String,
  duration: String,
  size: String,
  id: Number,
  content: String,
  category: String,
  image: String,
  movie: String,
  top_rate: String,
  type: String,
  slug: String,
  actress: String,
  link: String,
});

const Movie = mongoose.model("Movie", MovieSchema);

export default Movie;
