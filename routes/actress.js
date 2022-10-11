import express from "express";
import {
  createActress,
  deleteActress,
  getActressBySlug,
  getActresses,
  updateActress,
} from "../controllers/actress.js";
import { onlyAdmin } from "../auth/index.js";

const router = express.Router();

router.get("/", getActresses);
router.get("/:slug", getActressBySlug);
router.post("/", onlyAdmin, createActress);
router.patch("/:id", onlyAdmin, updateActress);
router.delete("/:id", onlyAdmin, deleteActress);

export default router;
