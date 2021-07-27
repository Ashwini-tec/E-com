const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String , required: true },
  price: { type: String , required: true },
  image: { type : String , required: true },
  category: { type: mongoose.Schema.Types.ObjectId  , required: true , ref: "category"},
  subCategory: { type: mongoose.Schema.Types.ObjectId  , required: true , ref: "subCategory" }
},{ timestamps: true });

const Product = mongoose.model('product', productSchema);

module.exports = Product;