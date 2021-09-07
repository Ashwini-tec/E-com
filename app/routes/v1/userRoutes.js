const userController = require("../../controller/userController");

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
          config: userController.createUser
        },
        {
          method: 'GET',
          path: '/user',
          config: userController.getUser
        },
        {
          method: 'PUT',
          path: '/user',
          config: userController.editUser
        },
        {
          method: 'DELETE',
          path: '/user/{id}',
          config: userController.deleteUser
        },
      ]
    )
  }
};
