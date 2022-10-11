import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryBySlug,
  updateCategory,
} from "../controllers/category.js";

import { onlyAdmin } from "../auth/index.js";

const router = express.Router();

router.get("/", getCategories);
router.get("/:slug", getCategoryBySlug);
router.post("/", onlyAdmin, createCategory);
router.patch("/:id", onlyAdmin, updateCategory);
router.delete("/:id", onlyAdmin, deleteCategory);

export default router;
