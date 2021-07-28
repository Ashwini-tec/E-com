const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subCategorySchema = new Schema({
  subCategory: {
        type: String,
        required: true 
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'category'
    },
    status: { type: Boolean , default: true },
},{ timestamps: true });

const SubCategory = mongoose.model('subCategory', subCategorySchema);

module.exports = SubCategory;