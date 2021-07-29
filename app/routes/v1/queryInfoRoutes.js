const controller = require("../../controller/userQueryController");

exports.plugin = { 
  pkg : require("../../../package.json"),
  name : "User Query Router",
  register : async(server , options)=>{
    server.route(
      [
       /************ create user ************/
        {
          method: 'POST',
          path: '/query',
          config: controller.userQueryInfo
        },
        {
          method: 'GET',
          path: '/query',
          config: controller.getAllQuery
        },
      ]
    )
  }
};
