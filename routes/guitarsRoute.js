const express = require("express");
const router = express.Router();
const { Guitar, validateGuitar, validateStock } = require("../models/guitar");

router.get("/", async (req, res) => {
  try {
    const guitars = await Guitar.find().sort("brand");
    res.send(guitars);
  } catch (err) {
    console.error(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const result = validateGuitar(req.body);
    if (result.error) {
      res.status(400).send(result.error.message);
      console.log(result.error.message);
      return;
    }
    const newGuitar = new Guitar({
      brand: req.body.brand,
      model: req.body.model,
      price: req.body.price,
      inStock: req.body.inStock,
      image: req.body.image,
      description: req.body.description,
    });
    await newGuitar.save();
    res.status(200).send(newGuitar);
  } catch (err) {
    res.status(400).send("Something is wrong with POST body");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const guitar = await Guitar.findByIdAndRemove(req.params.id);
    return res.status(200).send(guitar);
  } catch {
    return res.status(400).send("No guitar exist with ID given ");
  }
});

router.put("/:id", async (req, res) => {
  try {
    await Guitar.findByIdAndUpdate(req.params.id, {
      inStock: req.body.inStock,
    });
    const result = validateStock(req.body);
    if (result.error) {
      return res.status(400).send(result.error.message);
    }
    const newGuitar = await Guitar.findById(req.params.id);
    return res.status(200).send(newGuitar);
  } catch {
    return res.status(400).send("No guitar exist with ID given ");
  }
});

module.exports = router;
