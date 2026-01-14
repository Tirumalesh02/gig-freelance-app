import mongoose from "mongoose";
import Bid from "../models/Bid.js";
import Gig from "../models/Gig.js";

//  * @route POST /api/bids
//  * @access Private

export const placeBid = async (req, res) => {
  try {
    const { gigId, message, price } = req.body;

    if (!gigId || !price) {
      return res.status(400).json({ message: "Gig and price are required" });
    }

    const gig = await Gig.findById(gigId);
    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    if (gig.status === "assigned") {
      return res.status(400).json({ message: "Gig already assigned" });
    }

    // Prevent owner from bidding on own gig
    if (gig.ownerId.toString() === req.user._id.toString()) {
      return res.status(403).json({ message: "Cannot bid on your own gig" });
    }

    const bid = await Bid.create({
      gigId,
      freelancerId: req.user._id,
      message,
      price,
    });

    res.status(201).json(bid);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to place bid" });
  }
};

/**
 * @desc Get all bids for a gig (Owner only)
 * @route GET /api/bids/:gigId
 * @access Private
 */
export const getBids = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.gigId);
    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    // Only gig owner can view bids
    if (gig.ownerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const bids = await Bid.find({ gigId: gig._id }).populate(
      "freelancerId",
      "name email"
    );

    res.json(bids);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch bids" });
  }
};

/**
 * @desc Hire a freelancer (Atomic Operation)
 * @route PATCH /api/bids/:bidId/hire
 * @access Private (Owner only)
 */
export const hireBid = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const bid = await Bid.findById(req.params.bidId).session(session);
    if (!bid) {
      throw new Error("Bid not found");
    }

    const gig = await Gig.findById(bid.gigId).session(session);
    if (!gig) {
      throw new Error("Gig not found");
    }

    // Only owner can hire
    if (gig.ownerId.toString() !== req.user._id.toString()) {
      throw new Error("Not authorized to hire");
    }

    if (gig.status === "assigned") {
      throw new Error("Gig already assigned");
    }

    // Assign gig and hire bid
    gig.status = "assigned";
    bid.status = "hired";

    await gig.save({ session });
    await bid.save({ session });

    // Reject all other bids
    await Bid.updateMany(
      { gigId: gig._id, _id: { $ne: bid._id } },
      { status: "rejected" },
      { session }
    );

    // ✅ Commit transaction FIRST
    await session.commitTransaction();

    // ✅ Emit socket event AFTER commit
    const io = req.app.get("io");
    io.to(bid.freelancerId.toString()).emit("hired", {
      message: `You have been hired for "${gig.title}"`,
    });

    res.json({ message: "Freelancer hired successfully" });
  } catch (error) {
    await session.abortTransaction();
    console.error(error);
    res.status(400).json({ message: error.message });
  } finally {
    session.endSession();
  }
};

/**
 * @desc Get all bids placed by the current user
 * @route GET /api/bids/my
 * @access Private
 */
export const getMyBids = async (req, res) => {
  try {
    const bids = await Bid.find({ freelancerId: req.user._id })
      .populate("gigId", "title description budget")
      .sort({ createdAt: -1 });
    res.json(bids);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch your bids" });
  }
};
