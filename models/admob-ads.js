import mongoose from "mongoose";

const AdmobAdsSchema = mongoose.Schema({
  banner: String,
  native: String,
  interstitial: String,
  interstitial_video: String,
  reward: String,
});

const AdmobAds = mongoose.model("AdmobAds", AdmobAdsSchema);

export default AdmobAds;
