// bid.routes.js
import express from "express";
import protect from "../middleware/auth.middleware.js";
import {
  placeBid,
  getBids,
  hireBid,
  getMyBids,
} from "../controllers/bid.controller.js";

const router = express.Router();

router.post("/", protect, placeBid);
router.get("/my", protect, getMyBids);
router.get("/:gigId", protect, getBids);
router.patch("/:bidId/hire", protect, hireBid);

export default router;
