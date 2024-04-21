const express = require("express");
const user = express.Router();
const User = require("../models/user");


user.get("/list", async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (err) {
    res.send("Error " + err);
  }
});

user.get("/email/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

user.post("/create", async (req, res) => {
  const user = new User({
    email: req.body.Email,
    password: req.body.Password,
    name: req.body.Name,
    pno: req.body.Mobile,
    regdno:req.body.Regdno,
  });
  try {
    let u1 = await user.save();
    res.send(u1);

  } catch (err) {
    res.send(err);
  }
});

user.put("/update/:email", async (req, res) => {
  try {
    const update = {
      email: req.body.Email,
      password: req.body.Password,
      name: req.body.Name,
      pno: req.body.Mobile,
      regdno: req.body.Regdno,
    };

    const user = await User
      .findOneAndUpdate({ email: req.params.email }, update, { new: true, upsert: false });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Internal server error" });
  }
});


user.delete("/delete/:email", async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ email: req.params.email });
    res.send(user);
  } catch (err) {
    console.log(err);
  }
});

module.exports = user;