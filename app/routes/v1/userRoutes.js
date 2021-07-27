const usercontroller = require("../../controller/userController");

exports.plugin = { 
  pkg : require("../../../package.json"),
  name : "User Router",
  register : async(server , options)=>{
    server.route(
      [
       /************ create user ************/
        {
          method: 'POST',
          path: '/user',
          config: usercontroller.createUser
        },
      ]
    )
  }
};
