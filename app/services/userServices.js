const User = require("../models/User");
const bcrypt = require('bcrypt');


/********** create user ****************/
exports.createUser = async (data)=>{
  try {
    const valid = await isAlreadyExist(data.email);
    if(valid){ return { message : "user already exist" ,user : null }};

    const password = data.password;
    const salt = 10;
    const hash = await bcrypt.hash(password, salt).then((hash)=> { return hash }).catch((err)=>{ console.log(err.message) });

    const userData = {
        name: data.name,
        email: data.email,
        password: hash,
        contact: data.contact,
        role: data.role,
        permissions: data.permissions
    };

    const user =await User.create(userData);
    user.password=undefined;
    return { message: "User created successfully", user: user };

  } catch (err) {
    return { err: err.message };
  }
};


/********** show all user ****************/
exports.getAllUser = async ()=>{
  try {
    const user =await User.find().select({password:0}).populate('permissions.page',['name']);
    return { message: "user successfully fetched", user: user };

  } catch (err) {
    return { err: err.message };
  }
};


/********** show user ****************/
exports.getUser = async (id)=>{
  try {
    const user =await User.findOne({ _id : id }).select({password:0}).populate('permissions.page',['name']);
    if(!user){ return { message : "user not found" , user: null }}
    return { message: "user successfully fetched", user: user };

  } catch (err) {
    return { err: err.message };
  }
};



/********** edit user ****************/
exports.editUser = async ( id ,data)=>{
  try {
    if(data.password)
    {
      const hash = await bcrypt.hash(data.password, 10).then((hash)=> { return hash }).catch((err)=>{ console.log(err.message) });
      data.password = hash;
    }
    const user =await User.findByIdAndUpdate({ _id : id }, data ,{ new : true });
    if(!user){ return { message : "error in updation please check the detail" , user: null }}
    return { message: "user successfully updated", user: user };

  } catch (err) {
    return { err: err.message };
  }
};


/********** delete user ****************/
exports.deleteUser = async ( id )=>{
  try {
    const user =await User.findOneAndUpdate({_id: id},{ status: false }, { new : true });
    if(!user){ return { message : "error in delete please check the detail" , user: null }}
    return { message: "user successfully deleted", user: user };

  } catch (err) {
    return { err: err.message };
  }
};



/********** admin view show user ****************/
exports.adminView = async (id)=>{
  try {
    const user =await User.findOne({ _id : id }).select({password:0}).populate('permissions.page',['name']);
    if(!user){ return { message : "user not found" , user: null }}
    return { message: "user successfully fetched", user: user };

  } catch (err) {
    return { err: err.message };
  }
};



/********** edit user permission ****************/
exports.editUserPermissions = async ( id ,data)=>{
  try {
    const user =await User.findByIdAndUpdate({ _id : id }, data ,{ new : true });
    if(!user){ return { message : "error in updation please check the detail" , user: null }}
    return { message: "user successfully updated", user: user };

  } catch (err) {
    return { err: err.message };
  }
};



// check user already exist or not 

const isAlreadyExist = async(email)=>{
  try {
    const user = await User.findOne({ email : email });
    if(user) return true ;
    else return false ;

  } catch (err) {
    return { err: err.message };
  }
}
