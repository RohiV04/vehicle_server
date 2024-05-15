const express = require("express");
const router = express.Router();
const Driver = require("../models/driver");

router.get("/list", async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.json(drivers);
  } catch (err) {
    res.send("Error " + err);
  }
});

router.get("/email/:email", async (req, res) => {
  try {
    const driver = await Driver.findOne({ email: req.params.email });
    res.json(driver);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/create", async (req, res) => {
  const driver = new Driver({
    email: req.body.Email,
    name: req.body.Name,
    pno: req.body.Mobile,
  });
  try {
    let d1 = await driver.save();
    res.send(d1);

  } catch (err) {
    res.send(err);
  }
});

router.put("/update/:email", async (req, res) => {
  try {
    const update = {
      email: req.body.Email,
      password: req.body.Password,
      name: req.body.Name,
      pno: req.body.Mobile,
      licenseNumber: req.body.LicenseNumber,
      vehicleNumber: req.body.VehicleNumber,
    };

    const driver = await Driver
      .findOneAndUpdate({ email: req.params.email }, update, { new: true, upsert: false });
    if (!driver) {
      return res.status(404).send({ message: "Driver not found" });
    }
    res.send(driver);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Internal server error" });
  }
});


router.delete("/delete/:email", async (req, res) => {
  try {
    const driver = await Driver.findOneAndDelete({ email: req.params.email });
    res.send(driver);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;