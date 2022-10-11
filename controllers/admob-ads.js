import mongoose from "mongoose";
import AdmobAds from "../models/admob-ads.js";

export const getAdmobAds = async (req, res) => {
  try {
    const admobAds = await AdmobAds.find();

    return res.status(200).json([...admobAds]);
  } catch (error) {
    return res.sendStatus(500);
  }
};

export const createAdmobAds = async (req, res) => {
  const { native, banner, interstitial, interstitial_video, reward } = req.body;

  if (!native || !banner || !interstitial || !interstitial_video || !reward) {
    return res.status(400).json({
      message: "Required all data",
    });
  }

  const admobAds = await AdmobAds.find();

  if (admobAds.length > 0) {
    return res.status(400).json({
      message: "data already exist",
    });
  }

  const newAdmobAds = new AdmobAds({
    native,
    banner,
    interstitial,
    interstitial_video,
    reward,
  });

  try {
    await newAdmobAds.save();

    return res.status(200).json({
      mata: {
        _id: newAdmobAds._id,
      },
      data: newAdmobAds,
    });
  } catch (error) {
    return res.sendStatus(500);
  }
};

export const updateAdmobAds = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.sendStatus(404);
  }

  try {
    const admobAds = await AdmobAds.findByIdAndUpdate(id, req.body, {
      new: false,
    });

    if (!admobAds) {
      return res.sendStatus(404);
    }

    return res.status(200).json({
      message: "update success",
    });
  } catch (error) {
    return res.sendStatus(500);
  }
};
