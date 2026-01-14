// gig.routes.js
import express from "express";
import protect from "../middleware/auth.middleware.js";
import {
  createGig,
  getGigs,
  getGigById,
  getMyGigs,
  updateGig,
  deleteGig,
} from "../controllers/gig.controller.js";

const router = express.Router();

router.get("/", getGigs);
router.post("/", protect, createGig);

router.get("/my", protect, getMyGigs);

router
  .route("/:id")
  .get(getGigById)
  .patch(protect, updateGig)
  .delete(protect, deleteGig);

export default router;
