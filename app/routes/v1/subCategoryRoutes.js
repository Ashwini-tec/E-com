const controller = require("../../controller/categoryController");

exports.plugin = { 
  pkg : require("../../../package.json"),
  name : "subCategory Router",
  register : async(server , options)=>{
    server.route(
      [
       /************ create user ************/
        {
          method: 'POST',
          path: '/subCategory',
          config: controller.createCategory
        },
        {
          method: 'GET',
          path: '/subCategory',
          config: controller.getAllCategory
        },
      ]
    )
  }
};
