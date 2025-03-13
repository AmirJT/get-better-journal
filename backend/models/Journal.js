const mongoose = require("mongoose");

const JournalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now, 
  },
  sleepHours: {
    type: Number,
    required: true,
  },
  mood: {
    type: Number,
    required: true,
    min: 0, 
    max: 5, 
  },
  affirmation: {
    type: String,
    required: true,
  },
  gratitude: {
    type: String,
    required: true,
  },
  tasks: {
    type: [String], 
    required: true,
  },
  happiness: {
    type: String,
    required: true,
  },
  improvement: {
    type: String,
    required: true,
  },
  quote: {
    type: String,
    required: true,
  },
});

const Journal = mongoose.model("Journal", JournalSchema);
module.exports = Journal;