const usercontroller = require("../../controller/loginController");

exports.plugin = { 
  pkg : require("../../../package.json"),
  name : "Login Router",
  register : async(server , options)=>{
    server.route(
      [
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
