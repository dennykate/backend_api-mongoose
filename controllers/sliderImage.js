import mongoose from "mongoose";
import SliderImage from "../models/sliderImage.js";

export const getSliderImages = async (req, res) => {
  try {
    const data = await SliderImage.find();

    return res.status(200).json({
      meta: {
        total: data.length,
      },
      data,
    });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

export const createSliderImage = async (req, res) => {
  const { image, url } = req.body;

  const newSliderImage = new SliderImage({ image, url: url || "" });

  try {
    await newSliderImage.save();

    return res.status(201).json({
      meta: {
        _id: newSliderImage._id,
      },
      data: newSliderImage,
    });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

export const updateSliderImage = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No post with id: ${id}`);
  }

  await SliderImage.findByIdAndUpdate(id, req.body, { new: true });

  return res.status(200).json({
    message: "update success",
  });
};

export const deleteSliderImage = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No post with id: ${id}`);
  }

  await SliderImage.findByIdAndDelete(id);

  return res.status(200).json({
    message: "remove success",
  });
};
