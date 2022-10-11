import express from "express";
import { getUser } from "../controllers/user.js";
import { checkAdmin } from "../auth/index.js";

const router = express.Router();

router.post("/login", getUser);
router.post("/check-admin", checkAdmin, (req, res) => {
  return res.status(200).json({ message: "Success" });
});

export default router;
