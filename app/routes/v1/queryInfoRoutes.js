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
          method: 'DELETE',
          path: '/query/{id}',
          config: controller.deleteQuery
        },
        {
          method: 'GET',
          path: '/query/{id}',
          config: controller.fetchAQueryInfo
        },
        {
          method: 'POST',
          path: '/query-status/{id}',
          config: controller.editQueryStatus
        },

        /******************************  contacts us routes ********************/
        {
          method: 'POST',
          path: '/contact-us',
          config: controller.contactUs
        },
        {
          method: 'GET',
          path: '/contact-us',
          config: controller.getAllContactDetail
        },
        {
          method: 'DELETE',
          path: '/contact-us/{id}',
          config: controller.deleteContactUsDetail
        },
      ]
    )
  }
};
