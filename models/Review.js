const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now
  },
  comment: String,
  member: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  raiting: Number
});

module.exports = mongoose.model("Review", reviewSchema);
