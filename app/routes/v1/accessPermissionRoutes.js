const controller = require("../../controller/AccessPermissionController");

exports.plugin = { 
  pkg : require("../../../package.json"),
  name : "access permission router",
  register : async(server , options)=>{
    server.route(
      [
       /************ create access permission ************/
        {
          method: 'POST',
          path: '/access-permission',
          config: controller.createAccess
        },
        {
          method: 'GET',
          path: '/access-permission',
          config: controller.fetchAllAccess
        },
        {
          method: 'GET',
          path: '/access-permission/{id}',
          config: controller.fetchAccess
        },
        {
          method: 'PUT',
          path: '/access-permission/{id}',
          config: controller.editAccess
        },
        {
          method: 'DELETE',
          path: '/access-permission/{id}',
          config: controller.deleteAccess
        },
      ]
    )
  }
};
