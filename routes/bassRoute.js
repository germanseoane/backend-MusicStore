const express = require("express");
const router = express.Router();
const { Bass, validateBass } = require("../models/bass");
const { validateStock } = require("../models/guitar");

router.get("/", async (req, res) => {
  const basses = await Bass.find().sort("brand");
  res.send(basses);
});

router.post("/", async (req, res) => {
  try {
    const result = validateBass(req.body);
    if (result.error) {
      res.status(400).send(result.error.message);
      console.log(result.error.message);
      return;
    }
    const newBass = new Bass({
      brand: req.body.brand,
      model: req.body.model,
      price: req.body.price,
      inStock: req.body.inStock,
      image: req.body.image,
      description: req.body.description,
    });
    await newBass.save();
    res.status(200).send(newBass);
  } catch (err) {
    res.status(400).send("Something is wrong with POST body");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const bass = await Bass.findByIdAndRemove(req.params.id);
    return res.status(200).send(bass);
  } catch {
    return res.status(400).send("No bass exist with ID given ");
  }
});

router.put("/:id", async (req, res) => {
  try {
    await Bass.findByIdAndUpdate(req.params.id, {
      inStock: req.body.inStock,
    });
    const result = validateStock(req.body);
    if (result.error) {
      return res.status(400).send(result.error.message);
    }
    const newBass = await Bass.findById(req.params.id);
    return res.status(200).send(newBass);
  } catch {
    return res.status(400).send("No bass exist with ID given ");
  }
});

module.exports = router;
