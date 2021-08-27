const controller = require("../../controller/filterController");

exports.plugin = { 
  pkg : require("../../../package.json"),
  name : "filter or custome search",
  register : async(server , options)=>{
    let path = "/filter/"
    server.route(
      [
          /************ filter product by category ****************/
        {
            method: 'GET',
            path: path+'category/{id}',
            config: controller.getCatProduct
        },
        {
            method: 'GET',
            path: path+'subcategory/{id}',
            config: controller.getSubProduct
        },
        {
            method: 'GET',
            path: path+'menu/{id}',
            config: controller.getSubCategory
        },
        {
            method: 'GET',
            path: path+'{typeProduct}',
            config: controller.typeProduct
        },
        {
          method: 'GET',
          path: path+'review-product/{id}',
          config: controller.reviewOfProduct
      },
      ]
    )
  }
};
