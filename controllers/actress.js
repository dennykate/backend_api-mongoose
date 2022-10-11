import mongoose from "mongoose";
import Actress from "../models/actress.js";

export const getActresses = async (req, res) => {
  const options = req.query;

  const page = parseInt(options.page) || 1;
  const limit = 8;
  const skip = (page - 1) * limit;

  try {
    const actresses = await Actress.find()
      .sort({ rate: -1 })
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      meta: {
        total: actresses.length,
        page,
      },
      data: actresses,
    });
  } catch (error) {
    return res.sendStatus(500);
  }
};

export const getActressBySlug = async (req, res) => {
  const slug = req.params.slug;

  try {
    const actress = await Actress.find({ slug });

    if (!actress) return res.sendStatus(404);

    return res.status(200).json({ actress });
  } catch (error) {
    return res.sendStatus(500);
  }
};

export const createActress = async (req, res) => {
  const { image, title, slug, rate } = req.body;

  if (!image || !title || !slug || !rate) {
    return res.status(400).json({
      message: "required all data",
    });
  }

  const actresses = await Actress.find();
  const id = actresses.length + 1;

  const newActress = new Actress({
    id,
    title,
    image,
    slug,
    rate,
  });

  try {
    await newActress.save();

    return res.status(200).json({
      meta: {
        _id: newActress._id,
      },
      data: newActress,
    });
  } catch (error) {
    return res.sendStatus(500);
  }
};

export const updateActress = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.sendStatus(404);

  try {
    const actress = await Actress.findByIdAndUpdate(id, req.body, {
      new: false,
    });

    if (!actress) return res.sendStatus(404);

    return res.status(200).json({
      message: "update success",
    });
  } catch (error) {
    return res.sendStatus(500);
  }
};

export const deleteActress = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.sendStatus(404);
  }

  try {
    await Actress.findByIdAndRemove(id);

    return res.status(200).json({
      message: "remove success",
    });
  } catch (error) {
    return res.sendStatus(500);
  }
};
