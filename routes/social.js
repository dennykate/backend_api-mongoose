import express from "express";
import { onlyAdmin } from "../auth/index.js";

import {
  createSocial,
  getSocials,
  updateSocial,
} from "../controllers/social.js";

const router = express.Router();

router.get("/", getSocials);
router.post("/", onlyAdmin, createSocial);
router.patch("/:id", onlyAdmin, updateSocial);

export default router;
