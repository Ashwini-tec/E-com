const controller = require("../../controller/subCategoryController");

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
          config: controller.createSubCategory
        },
        {
          method: 'GET',
          path: '/subCategory',
          config: controller.getAllSubCategory
        },
        {
          method: 'GET',
          path: '/subCategory/{id}',
          config: controller.getSubCategory
        },
        {
          method: 'PUT',
          path: '/subCategory/{id}',
          config: controller.editSubCategory
        },
        {
          method: 'DELETE',
          path: '/subCategory/{id}',
          config: controller.deleteSubCategory
        },
        {
          method: 'PUT',
          path: '/subCategory/activate/{id}',
          config: controller.activateSubCategory
        },
      ]
    )
  }
};
