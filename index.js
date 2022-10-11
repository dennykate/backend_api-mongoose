import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import sliderImageRoutes from "./routes/sliderImage.js";
import userRoutes from "./routes/user.js";
import socialRoutes from "./routes/social.js";
import categoryRoutes from "./routes/category.js";
import actressRoutes from "./routes/actress.js";
import adsRoutes from "./routes/ads.js";
import admobAdsRoutes from "./routes/admob-ads.js";
import movieRoutes from "./routes/movie.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/slider-image", sliderImageRoutes);
app.use("/user", userRoutes);
app.use("/socials", socialRoutes);
app.use("/category", categoryRoutes);
app.use("/actress", actressRoutes);
app.use("/ads", adsRoutes);
app.use("/admob-ads", admobAdsRoutes);
app.use("/movie", movieRoutes);

const CONNECTION_URL = process.env.NEXT_APP_ENV_CONNECTION_URL;
const PORT = process.env.NEXT_APP_ENV_PORT;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Sever running at port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

mongoose.set("useFindAndModify", false);
