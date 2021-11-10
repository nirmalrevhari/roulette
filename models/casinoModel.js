const mongoose = require("mongoose");

const casinoSchema = new mongoose.Schema({
  name: {
    type: String
  },
  balance: {
    type: Number,
    default: 0
  }
});


const Casino = mongoose.model("Casino", casinoSchema);
module.exports = Casino;
