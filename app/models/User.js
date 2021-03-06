const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String , required: true },
  email: { type: String , required: true },
  contact: { type: Number, required: true },
  password: { type: String , required: true},
  status: { type:Boolean , default: true },
  role: { type: String , required: true, enum: ['user', 'admin', 'sub-admin'], default: 'user' },
  permissions: [{
    page: { type: mongoose.Schema.Types.ObjectId , ref:'access' }
  }]
},{ timestamps: true });

const User = mongoose.model('user', userSchema);

module.exports = User;         