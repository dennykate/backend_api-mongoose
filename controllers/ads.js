import mongoose from "mongoose";
import Ads from "../models/ads.js";

export const getAds = async (req, res) => {
  try {
    const ads = await Ads.find();

    return res.status(200).json({
      length: ads.length,
      data: ads,
    });
  } catch (error) {
    return res.sendStatus(500);
  }
};

export const createAds = async (req, res) => {
  const { gif, url } = req.body;

  if (!gif || !url) {
    return res.status(400).json({
      message: "required all data",
    });
  }

  const totalAds = await Ads.find();
  const id = totalAds.length + 1;

  const newAds = new Ads({ id, gif, url });

  try {
    await newAds.save();

    return res.status(200).json({
      meta: {
        _id: newAds._id,
      },
      data: newAds,
    });
  } catch (error) {
    return res.sendStatus(500);
  }
};

export const updateAds = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.sendStatus(404);

  try {
    await Ads.findByIdAndUpdate(id, req.body, { new: false });

    return res.status(200).json({
      message: "update success",
    });
  } catch (error) {
    return res.sendStatus(500);
  }
};

export const deleteAds = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.sendStatus(404);

  try {
    await Ads.findByIdAndRemove(id);

    return res.status(200).json({
      message: "remove success",
    });
  } catch (error) {
    return res.sendStatus(500);
  }
};
