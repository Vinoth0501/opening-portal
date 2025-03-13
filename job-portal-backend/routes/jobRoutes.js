const express = require("express");
const Job = require("../models/Job");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Create Job
router.post("/", authMiddleware, async (req, res) => {
  const { title, description, company, location, salary } = req.body;
  try {
    const job = new Job({
      title,
      description,
      company,
      location,
      salary,
      userId: req.user.userId,
    });
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Get All Jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Get Job by ID
router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Delete Job
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: "Job deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

//Update Job
router.put("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { title, description, company, location, salary } = req.body;
  try {
    const updatedJob = await Job.findByIdAndUpdate(
      id,
      {
        title,
        description,
        company,
        location,
        salary,
      },
      { new: true }
    );

    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(updatedJob);
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
