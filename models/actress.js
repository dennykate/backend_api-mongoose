import mongoose from "mongoose";

const ActressSchema = mongoose.Schema({
  id: Number,
  image: String,
  title: String,
  slug: String,
  rate: Number,
});

const Actress = mongoose.model("Actress", ActressSchema);

export default Actress;
