const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: { 
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    files: [{ name: { type: String }, link: { type: String } }],
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;