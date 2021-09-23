const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: { type: String , unique: true, required: true },
  description: { type: String, required: true },
  status: { type: Boolean , default: true },
  createdBy : { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' }  
  
},{ timestamps: true });

const Category = mongoose.model('category', categorySchema);

module.exports = Category;