import mongoose from "mongoose";

import Category from "../models/category.js";

export const getCategories = async (req, res) => {
  const options = req.query;

  const page = parseInt(options.page) || 1;
  const limit = 8;
  const skip = (page - 1) * limit;

  try {
    const categories = await Category.find().sort({ title: 1 }).limit(limit);

    return res.status(200).json({
      meta: {
        total: categories.length,
        page,
      },
      data: categories,
    });
  } catch (error) {
    return res.sendStatus(500);
  }
};

export const getCategoryBySlug = async (req, res) => {
  const slug = req.params.slug;

  if (!slug) {
    return res.sendStatus(404);
  }

  try {
    const category = await Category.find({ slug });

    if (!category) {
      return res.status(400).json({
        message: "Fail",
      });
    }

    return res.status(200).json(category);
  } catch (error) {
    return res.sendStatus(500);
  }
};

export const createCategory = async (req, res) => {
  const { image, title, slug } = req.body;

  if (!image || !title || !slug) {
    return res.status(400).json({
      message: "required all data",
    });
  }

  const categories = await Category.find();
  const id = categories.length + 1;

  const newCategory = new Category({ id, image, title, slug });

  try {
    await newCategory.save();

    return res.status(200).json({
      meta: {
        id: newCategory._id,
      },
      data: newCategory,
    });
  } catch (error) {
    return res.sendStatus(500);
  }
};

export const updateCategory = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404);
  }

  try {
    const category = await Category.findByIdAndUpdate(id, req.body, {
      new: false,
    });

    if (!category) return res.status(400).json({ message: "Not Found" });

    return res.status(200).json({
      message: "update success",
    });
  } catch (error) {
    return res.sendStatus(500);
  }
};

export const deleteCategory = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404);

  try {
    await Category.findByIdAndRemove(id);

    return res.status(200).json({
      message: "remove success",
    });
  } catch (error) {
    return res.sendStatus(404);
  }
};
