const express = require("express");
const router = express.Router();
const Person = require("../models/Person");

router.post("/", async (req, res) => {
  try {
    const newPerson = new Person(req.body);
    console.log("new Person object: ", newPerson);
    const response = await newPerson.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server error" });
  }
});

// get the data in json format by giving worktype
router.get("/:worktype", async (req, res) => {
  try {
    const worktype = req.params.worktype;
    if (worktype == "chef" || worktype == "manager" || worktype == "waiter") {
      const response = await Person.find({ work: worktype });
      console.log("person data object", response);
      console.log("data fetched");
      res.status(200).json(response);
    } else {
      res.status(400).json({ error: "Invalid worktype" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server error" });
  }
});

//update by unique id // getting id by parameter and sending data from body
router.put("/:id", async (req, res) => {
  try {
    const Personid = req.params.id;
    const updatedPersonData = req.body;

    const response = await Person.findByIdAndUpdate(
      Personid,
      updatedPersonData,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!response) {
      return res.status(404).json({ error: "person not found" });
    }

    console.log("data updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const Personid = req.params.id;
    const response = await Person.findByIdAndDelete(Personid);
    if (!response) {
      return res.status(400).json({ error: "person not found" });
    }
    res.status(200).json({ message: "person deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server error" });
  }
});

module.exports = router;
