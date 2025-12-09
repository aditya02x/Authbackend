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
      unique: true, // duplicate email prevent karega
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // create/update time automatically track karega
);

module.exports = mongoose.model("User", userSchema);
