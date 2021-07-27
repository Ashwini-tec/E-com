const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subCategorySchema = new Schema({
  name: {
        type: String,
        unique: true,
        required: true 
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'category'
    }
},{ timestamps: true });

const SubCategory = mongoose.model('subCategory', subCategorySchema);

module.exports = SubCategory;