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



user.delete("/register/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.send(user);
  } catch (err) {
    console.log(err);
  }
});

module.exports = user;