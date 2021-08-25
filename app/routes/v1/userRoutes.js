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
        {
          method: 'GET',
          path: '/users',
          config: usercontroller.getAllUser
        },
        {
          method: 'GET',
          path: '/user',
          config: usercontroller.getUser
        },
        {
          method: 'PUT',
          path: '/user',
          config: usercontroller.editUser
        },
        {
          method: 'DELETE',
          path: '/user/{id}',
          config: usercontroller.deleteUser
        },
      ]
    )
  }
};
