const controller = require("../../controller/reviewController");

exports.plugin = { 
  pkg : require("../../../package.json"),
  name : "review Router",
  register : async(server , options)=>{
    server.route(
      [
       /************ product review  ************/
        {
            method: 'POST',
            path: '/review/{productId}',
            config: controller.reviewProduct
        },
        {
            method: 'GET',
            path: '/review',
            config: controller.getAllReview
        },
        {
            method: 'GET',
            path: '/review/{id}',
            config: controller.getReview
        },
        {
            method: 'GET',
            path: '/verify-review',
            config: controller.getAllReviewVerify
        },
        {
            method: 'PUT',
            path: '/review/{id}',
            config: controller.editReview
        },
        {
            method: 'DELETE',
            path: '/review/{id}',
            config: controller.deleteReview
        }
      ]
    )
  }
};
