const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const betSchema = new mongoose.Schema({
  betNumber: {
    type: Number,
    min: 1,
    max: 36
  },
  amount: {
    type: Number
  },
  bettingTime: {
    type: Number
  },
  userId: {
    type: String
  },
  betStatus: {
    type: String
  },
  gameId: {
    type: Schema.Types.ObjectId,
    ref: 'Game',
    required: true
  }
});


const Bet = mongoose.model("Bet", betSchema);
module.exports = Bet;
