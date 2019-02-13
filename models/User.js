const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  position: {
    type: String,
    required: true
  },
  loc:{
    type: {type:String, enum:['Point'], default: "Point"},
    coordinates: [Number]
  },
  maxDistance:Number
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

userSchema.index({"loc":"2dsphere"})

const User = mongoose.model('User', userSchema);
module.exports = User;