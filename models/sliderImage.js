import mongoose from "mongoose";

const sliderImageSchema = mongoose.Schema({
  image: String,
  url: String,
});

const SliderImage = mongoose.model("SliderImage", sliderImageSchema);

export default SliderImage;
