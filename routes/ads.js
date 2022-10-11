import express from "express";
import { createAds, deleteAds, getAds, updateAds } from "../controllers/ads.js";
import { onlyAdmin } from "../auth/index.js";

const router = express.Router();

router.get("/", getAds);
router.post("/", onlyAdmin, createAds);
router.patch("/:id", onlyAdmin, updateAds);
router.delete("/:id", onlyAdmin, deleteAds);

export default router;
