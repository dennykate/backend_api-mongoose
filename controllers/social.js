import express from "express";
import mongoose from "mongoose";

import Social from "../models/social.js";

export const getSocials = async (req, res) => {
  const data = await Social.findOne();

  if (data) {
    return res.status(200).json({ data });
  } else {
    return res.sendStatus(500);
  }
};

export const createSocial = async (req, res) => {
  const { fb_page, messenger, telegram_acc, telegram_channel, youtube } =
    req.body;

  if (
    !fb_page ||
    !messenger ||
    !telegram_acc ||
    !telegram_channel ||
    !youtube
  ) {
    return res.status(400).json({
      message: "required all data",
    });
  }

  const createSocials = new Social({
    fb_page,
    messenger,
    telegram_acc,
    telegram_channel,
    youtube,
  });

  try {
    const socials = await Social.find();
    if (socials.length > 0) {
      return res.status(200).json({
        message: "data already exist",
      });
    }
    await createSocials.save();
    return res.status(200).json({
      meta: { _id: createSocials._id },
      data: createSocials,
    });
  } catch (error) {
    return res.status(200).json({
      message: "data already exist",
    });
  }
};

export const updateSocial = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No post with id: ${id}`);
  }

  try {
    await Social.findByIdAndUpdate(id, req.body, { new: false });

    return res.status(200).json({
      message: "update success",
    });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};
