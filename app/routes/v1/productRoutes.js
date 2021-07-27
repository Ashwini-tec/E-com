const controller = require("../../controller/productController");

exports.plugin = { 
  pkg : require("../../../package.json"),
  name : "Product Router",
  register : async(server , options)=>{
    server.route(
      [
       /************ create user ************/
        {
            method: 'POST',
            path: '/product',
            config: controller.createProduct
        },
        {
            method: 'GET',
            path: '/product',
            config: controller.getAllProduct
        },
        {
            method: 'GET',
            path: '/product/{id}',
            config: controller.getAllFilteredProduct
        },
      ]
    )
  }
};
