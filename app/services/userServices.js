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
        email: data.email,
        password: hash,
    };

    const user =await User.create(userData);
    user.password=undefined;
    return { message: "User created successfully", user: user };

  } catch (err) {
    return { err: err.message };
  }
};


/********* login user ****************/
exports.loginUser = async(user)=>{
  try {
    const email= user.email;
    const data = await User.findOne({ email : email });
    if(data){
      const password = user.password;
      const hash = await bcrypt.compare(password,data.password);
      if(!hash){ return { message: "logined failed password not match" ,user: null }}
      data.password = undefined;
      return { message: "successfully logined" ,user: data };
    }else{
      return { message: "user not found" ,user: null }
    }
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

  } catch (error) {
    return { err: err.message };
  }
}