const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  name: {
    type: String
  },
  balance: {
    type: Number
  },
  casinoId: {
    type: Schema.Types.ObjectId,
    ref: 'Casino'
  }
});


const User = mongoose.model("User", userSchema);
module.exports = User;
