const controller = require("../../controller/categoryController");

exports.plugin = { 
  pkg : require("../../../package.json"),
  name : "Category Router",
  register : async(server , options)=>{
    server.route(
      [
       /************ create user ************/
        {
          method: 'POST',
          path: '/category',
          config: controller.createCategory
        },
        {
          method: 'GET',
          path: '/category',
          config: controller.getAllCategory
        },
      ]
    )
  }
};
