const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
        type: String ,
        unique: true,
        required: true 
    },
    status: { type: Boolean , default: true }
},{ timestamps: true });

const Category = mongoose.model('category', categorySchema);

module.exports = Category;