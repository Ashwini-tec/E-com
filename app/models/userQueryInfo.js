const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userQuerySchema = new Schema({
    name: { type: String , required:true },
    productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'product'},
    contact: { type: Number , required: true },
    email: { type: String , required: true },
    message: { type: String , required: true },
  
},{ timestamps: true });

const UserQuery = mongoose.model('userQuery', userQuerySchema);

module.exports = UserQuery;