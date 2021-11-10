const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new mongoose.Schema({
  startTime: {
    type: Number
  },
  endTime: {
    type: Number
  },
  status: {
    type: String
  },
  thrownNumber: {
    type: Number
  },
  dealerId: {
    type: Schema.Types.ObjectId,
    ref: 'Dealer',
    required: true
  },
  casinoId: {
    type: Schema.Types.ObjectId,
    ref: 'Casino'
  }
});


const Game = mongoose.model("Game", gameSchema);
module.exports = Game;
