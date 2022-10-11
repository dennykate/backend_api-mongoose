import mongoose from "mongoose";

const socialSchema = mongoose.Schema({
  fb_page: String,
  messenger: String,
  telegram_acc: String,
  telegram_channel: String,
  youtube: String,
});

const Social = mongoose.model("Social", socialSchema);

export default Social;
