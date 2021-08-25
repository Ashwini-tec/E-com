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
        {
          method: 'POST',
          path: '/contact-us',
          config: controller.contactUs
        },
        {
          method: 'POST',
          path: '/query-status/{id}',
          config: controller.editQueryStatus
        },
      ]
    )
  }
};
