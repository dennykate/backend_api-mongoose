import mongoose from "mongoose";

const AdsSchema = mongoose.Schema({
  id: Number,
  gif: String,
  url: String,
});

const Ads = mongoose.model("Ads", AdsSchema);

export default Ads;
