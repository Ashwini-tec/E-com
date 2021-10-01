const controller = require("../../controller/testimonialsController");

exports.plugin = { 
  pkg : require("../../../package.json"),
  name : "testimonials Router",
  register : async(server , options)=>{
    server.route(
      [
       /************ create user ************/
        {
          method: 'POST',
          path: '/testimonials',
          config: controller.createTestimonials
        },
        {
            method: 'GET',
            path: '/testimonials',
            config: controller.getAllTestimonials
        },
        {
            method: 'GET',
            path: '/testimonials/{id}',
            config: controller.getSingleTestimonials
        },
        {
            method: 'PUT',
            path: '/testimonials/{id}',
            config: controller.editTestimonials
        },
        {
            method: 'DELETE',
            path: '/testimonials/{id}',
            config: controller.deleteTestimonials
        },
      ]
    )
  }
};
