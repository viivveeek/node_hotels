const express = require("express");
const router = express.Router();
const menu = require("../models/menu");

router.post("/", async (req, res) => {
  try {
    const newMenu = new menu(req.body);
    const response = await newMenu.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await menu.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server error" });
  }
});

router.get("/:taste_", async (req, res) => {
  try {
    const taste_ = req.params.taste_;
    if (taste_ == "sweeter" || taste_ == "bitter" || taste_ == "spicy") {
      const data = await menu.find({ taste: taste_ });
      console.log("data fetched");
      res.status(200).json(data);
    } else {
      res.status(400).json({ error: "Invalid taste" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server error" });
  }
});
// update
router.put("/:id", async (req, res) => {
  try {
    const Personid = req.params.id;
    const updatedPersonData = req.body;
    const response = await menu.findByIdAndUpdate(Personid, updatedPersonData, {
      new: true,
      runValidators: true,
    });
    if (!response) {
      return res.status(404).json({ error: "No such menu found" });
    }
    console.log("data updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server error" });
  }
});

// data delete
router.delete("/:id", async (req, res) => {
  try {
    const Personid = req.params.id;
    const response = await menu.findByIdAndDelete(Personid);
    if (!response) {
      return res.status(404).json({ error: "No such menu found" });
    }
    res.status(200).json({ message: "data deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server error" });
  }
});

module.exports = router;
