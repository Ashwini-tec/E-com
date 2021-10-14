const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const joinUsSchema = new Schema({
  name: { type: String , required: true },
  email: { type: String , required: true }
},{ timestamps: true });

const JoinUs = mongoose.model('joinUs', joinUsSchema);

module.exports = JoinUs;