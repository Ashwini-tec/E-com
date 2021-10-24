const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactUsSchema = new Schema({
    name: { type: String , required:true },
    email: { type: String , required: true },
    subject: { type: String , required: true },
    mobile: { type: Number , required: true },
    message: { type: String , required: true },
},{ timestamps: true });

const ContactUs = mongoose.model('contactUs', contactUsSchema);

module.exports = ContactUs;