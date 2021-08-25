const AccessPermissions = require("../models/AccessPermissions");
const User = require("../models/User");

/********** create access permission detail ****************/
exports.createAccess = async (data)=>{
  try {
    const valid = await isAlreadyExist(data.name);
    if(valid){ return { message : "data already exist" ,accessPermissions : null }};

    const accessData = {
        name: data.name,
        createdBy: data.user
    };

    const id = data.user;
    const userData = await User.findOne({ _id: id });
    const permission = userData.permissions;
 
    const accessPermissions =await AccessPermissions.create(accessData);

    permission.push({ page: accessPermissions._id });
    userData.permissions = permission;
    await User.updateOne({_id: id }, userData);
    return { message: "data created successfully", accessPermissions: accessPermissions };

  } catch (err) {
    return { err: err.message };
  }
};



/********** show all access permission ****************/
exports.fetchAllAccess = async ()=>{
    try {
      const accessPermissions =await AccessPermissions.find({ status: true }).populate('createdBy',['name']);
      return { message: "Data successfully fetched", accessPermissions: accessPermissions };
  
    } catch (err) {
      return { err: err.message };
    }
  };


/********** show single access permission detail ****************/
exports.fetchAccess = async (id)=>{
  try {
    const accessPermissions =await AccessPermissions.findOne({ _id : id }).populate("createdBy",{ name : 1 });
    if(!accessPermissions){ return { message : "data not found please check the detail" , accessPermissions: null }}
    return { message: "data successfully fetched", accessPermissions: accessPermissions };

  } catch (err) {
    return { err: err.message };
  }
};


/********** edit access permission ****************/
exports.editAccess = async ( id ,data)=>{
  try {
    const accessPermissions =await AccessPermissions.findByIdAndUpdate({ _id : id }, data ,{ new : true });
    if(!accessPermissions){ return { message : "error in updation please check the detail" , accessPermissions: null }}
    return { message: "data successfully updated", accessPermissions: accessPermissions };

  } catch (err) {
    return { err: err.message };
  }
};



/********** delete access permission detail  ****************/
exports.deleteAccess = async ( id )=>{
  try {
    const accessPermissions =await AccessPermissions.findByIdAndUpdate({ _id : id },{ status: false },{ new : true });
    if(!accessPermissions){ return { message : "error in delete please check the detail" , accessPermissions: null }}
    return { message: "data successfully deleted", accessPermissions: accessPermissions };

  } catch (err) {
    return { err: err.message };
  }
};





// check category already exist or not 

const isAlreadyExist = async(name)=>{
    try {
      const data = await AccessPermissions.findOne({ name : name });
      if(data) return true ;
      else return false ;
  
    } catch (err) {
      return { err: err.message };
    }
  }
  