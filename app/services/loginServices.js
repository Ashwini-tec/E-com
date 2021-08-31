const User = require("../models/User");
const bcrypt = require('bcrypt');


/********* login user ****************/
exports.loginUser = async(user)=>{
    try {
      const email= user.email;
      const data = await User.findOne({ email : email }).populate('permissions.page',{ name: 1 });
      if(!data.status){ return { message: "logined failed user unactive contact admin" ,user: null }}
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
  