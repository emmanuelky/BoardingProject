const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  address: {
    type: String,
    required: true
  },
  loc:{
    type: {type:String, enum:['Point'], default: "Point"},
    coordinates: [Number]
  },
  date: {
    type: Date,
    required: true
  },
  slot: Number,
  _game: {
    type: Schema.Types.ObjectId,
    ref: "Game"
  },
  _user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  description: String

  // timestamps: {
  //   createdAt: "created_at",
  //   updatedAt: "updated_at"
  // }
});

eventSchema.index({"loc":"2dsphere"})

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;