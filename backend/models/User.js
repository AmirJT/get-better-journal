const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    default: "https://via.placeholder.com/150",
  },
}, { timestamps: true }); 

const User = mongoose.model("User", UserSchema);
module.exports = User;