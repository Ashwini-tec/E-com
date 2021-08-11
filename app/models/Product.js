const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String , required: true },
  price: { type: String , required: true },
  priceFlag: { type: Boolean , default: false },
  image: [ { type : String } ],
  sku: { type: String , required: true },
  rating : { type: Number , required: true, enum: [1, 2, 3, 4, 5] , default: 1 },
  tags: { type: String , required: true },
  color: { type: String , required: true },
  description: { type: String , required: true },
  typeProduct: { type: String , required: true },
  bannerImage: { type: String , required: true },
  category: { type: mongoose.Schema.Types.ObjectId  , required: true , ref: "category" },
  subCategory: { type: mongoose.Schema.Types.ObjectId  , required: true , ref: "subCategory" },
  status: { type: Boolean , default: true },
  createdBy : { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' } 
  
},{ timestamps: true });

const Product = mongoose.model('product', productSchema);

module.exports = Product;