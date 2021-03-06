const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  name: { type: String , unique: true, required: true },
  verified: { type: Boolean , default: false },
  email: { type: String , required: true },
  message: { type: String , required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'product'}
},{ timestamps: true });

const Review = mongoose.model('review', reviewSchema);

module.exports = Review;