const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    
    name: {
      type: String,
      required: true,
    },
    
    regdno:{
        type:String,
        // required: true,
    },
    // store location
    location: {
      type: String,
    },
    status: {
      type: String,
      default: "active",
    },
    request: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;