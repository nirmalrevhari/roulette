const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dealerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  casinoId: {
    type: Schema.Types.ObjectId,
    ref: 'Casino',
    required: true
  }
});


const Dealer = mongoose.model("Dealer", dealerSchema);
module.exports = Dealer;
