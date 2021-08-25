const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rolePermissionSchema = new Schema({
  name: { type: String , required: true },
  status: { type: Boolean , default: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId , ref:'user'}
},{ timestamps: true });

const AccessPermission = mongoose.model('access', rolePermissionSchema);

module.exports = AccessPermission;