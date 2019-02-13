const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  genre: {
    type: String,
    required: true,
    enum: [
      "Auction",
      "Cooperative",
      "Deduction",
      "Dexterity",
      "Economic Simulation",
      "Educational",
      "Eurogame",
      "Fantasy",
      "Guessing",
      "Negotiation",
      "Non competitive",
      "Paper and Pencil",
      "Puzzle",
      "Race",
      "Storytelling",
      "Strategy",
      "Tile",
      "Trivia",
      "War",
      "Word",
    ]
  },
  
  description: String
  
});

const Game = mongoose.model("Game", gameSchema);
module.exports = Game;