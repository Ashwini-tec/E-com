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
        {
          method: 'GET',
          path: '/category/{id}',
          config: controller.getCategory
        },
        {
          method: 'PUT',
          path: '/category/{id}',
          config: controller.editCategory
        },
        {
          method: 'DELETE',
          path: '/category/{id}',
          config: controller.deleteCategory
        },
      ]
    )
  }
};
