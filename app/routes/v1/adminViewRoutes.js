const controller = require("../../controller/categoryController");
const subController = require("../../controller/subCategoryController");
const productController = require("../../controller/productController");
const userController = require("../../controller/userController");

exports.plugin = { 
  pkg : require("../../../package.json"),
  name : "admin view for user ,product , category and sub-category",
  register : async(server , options)=>{
    let path = "/admin/"
    server.route(
      [
          /************ admin view of product, category and sub category ****************/
        {
            method: 'GET',
            path: path+'category',
            config: controller.adminView
        },
        {
            method: 'GET',
            path: path+'subcategory',
            config: subController.adminView
        },
        {
            method: 'GET',
            path: path+'product',
            config: productController.adminView
        },
        {
            method: 'POST',
            path: path+'user/{id}',
            config: userController.adminView
        },
        {
          method: 'PUT',
          path: path+'user/{id}',
          config: userController.editUserPermissions
        },
      ]
    )
  }
};
