import mongoose from "mongoose";

const CategorySchema = mongoose.Schema({
  id: Number,
  image: String,
  title: String,
  slug: String,
});

const Category = mongoose.model("Category", CategorySchema);

export default Category;
