const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testimonialsSchema = new Schema({
  name: { type: String , unique: true, required: true },
  image: { type: String , required: true },
  designation: { type: String , required: true },
  message: { type: String , required: true }
},{ timestamps: true });

const Testimonials = mongoose.model('testimonials', testimonialsSchema);

module.exports = Testimonials;