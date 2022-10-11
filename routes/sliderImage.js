import express from "express";

import { onlyAdmin } from "../auth/index.js";
import {
  createSliderImage,
  deleteSliderImage,
  getSliderImages,
  updateSliderImage,
} from "../controllers/sliderImage.js";

const router = express.Router();

router.get("/", getSliderImages);
router.post("/", onlyAdmin, createSliderImage);
router.patch("/:id", onlyAdmin, updateSliderImage);
router.delete("/:id", onlyAdmin, deleteSliderImage);

export default router;
