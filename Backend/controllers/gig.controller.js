import Gig from "../models/Gig.js";

export const createGig = async (req, res) => {
  try {
    const { title, description, budget } = req.body;

    // Validation
    if (!title || !description || !budget) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const gig = await Gig.create({
      title,
      description,
      budget,
      ownerId: req.user._id,
    });

    res.status(201).json(gig);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create gig" });
  }
};

/**
 * @desc Get all open gigs (search supported)
 * @route GET /api/gigs
 * @access Public
 */
export const getGigs = async (req, res) => {
  try {
    const search = req.query.search || "";

    const gigs = await Gig.find({
      status: "open",
      title: { $regex: search, $options: "i" },
    })
      .populate("ownerId", "name email")
      .sort({ createdAt: -1 });

    res.json(gigs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch gigs" });
  }
};

/**
 * @desc Get a single gig by ID
 * @route GET /api/gigs/:id
 * @access Public
 */
export const getGigById = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id).populate(
      "ownerId",
      "name email"
    );

    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    res.json(gig);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch gig" });
  }
};

/**
 * @desc Get all gigs created by the current user
 * @route GET /api/gigs/my
 * @access Private
 */
export const getMyGigs = async (req, res) => {
  try {
    const gigs = await Gig.find({ ownerId: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(gigs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch your gigs" });
  }
};

/**
 * @desc Update a gig
 * @route PATCH /api/gigs/:id
 * @access Private
 */
export const updateGig = async (req, res) => {
  try {
    const { title, description, budget, status } = req.body;

    const gig = await Gig.findById(req.params.id);

    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    // Check if the user owns the gig
    if (gig.ownerId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    gig.title = title || gig.title;
    gig.description = description || gig.description;
    gig.budget = budget || gig.budget;
    gig.status = status || gig.status;

    const updatedGig = await gig.save();

    res.json(updatedGig);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update gig" });
  }
};

/**
 * @desc Delete a gig
 * @route DELETE /api/gigs/:id
 * @access Private
 */
export const deleteGig = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);

    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    // Check if the user owns the gig
    if (gig.ownerId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await gig.deleteOne();

    res.json({ message: "Gig removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete gig" });
  }
};
