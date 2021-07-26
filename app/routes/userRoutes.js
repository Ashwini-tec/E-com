const usercontroller = require("../controller/user");

exports.plugin = { 
  pkg : require("../../package.json"),
  name : "user Router",
  register : async(server , options)=>{
    server.route(
      [
       /************ create user ************/
        {
          method: 'POST',
          path: '/user',
          config: usercontroller.createUser
        },
        /************ login ************/ 
        {
          method: "POST",
          path: "/login",
          config:usercontroller.login
        },
    
      ]
    )
  }
};
