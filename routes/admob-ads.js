import express from "express";
import {
  createAdmobAds,
  getAdmobAds,
  updateAdmobAds,
} from "../controllers/admob-ads.js";

const router = express.Router();

router.get("/", getAdmobAds);
router.post("/", createAdmobAds);
router.patch("/:id", updateAdmobAds);

export default router;
