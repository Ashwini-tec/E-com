const services = require("../services/testimonialsServices");
const Joi = require('joi');


/********* create Testimonials ************/
exports.createTestimonials= { 
  description: 'create testimonials',
  auth: 'token',
  validate: {
    payload : Joi.object({
      name: Joi.string().min(3).required(),
      image: Joi.array().items(Joi.string()).required(),
      message: Joi.string().min(10).max(100).required(),
      designation: Joi.string().required()
    }),
    failAction: (request, h, error) => {
      return h.response({ message: error.details[0].message.replace(/['"]+/g, '') }).code(400).takeover();
    }
  },
  handler:async( request , h )=>{
    try {
      const role = request.auth.artifacts.decoded.role;
      if(role == 'user'){ return h.response({ message: 'only admin and sub-admin have the permission to create testimonials'}).code(400)}

      const testimonialsData = request.payload;
      let data = await services.createTestimonials(testimonialsData);
      if(data.err){ return h.response({ message : data.err }).code(400)};
      if(!data.testimonials){ return h.response({ message:data.message }).code(409)}
      return h.response(data).code(201);

    } catch (error) {
      return h.response( error.message ).code(500);
    }
  },
  tags: ['api'] //swagger documentation
};


/********* get all the testimonials  ************/
exports.getAllTestimonials= { 
    description: 'Fetch all testimonials',
    auth: false,
    handler:async( request , h )=>{
      try {
        const data = await services.getAllTestimonials();
        if(data.err){ return h.response({ message : data.err }).code(400)};
        if(!data.testimonials){ return h.response({ message:data.message }).code(400)}
        return h.response(data).code(200);
  
      } catch (error) {
        return h.response( error.message ).code(500);
      }
    },
    tags: ['api'] //swagger documentation
  };


/**************** get single testimonials by id *************/  
exports.getSingleTestimonials = {
  description: 'fetct single testimonial by its id',
  auth: 'token',
  validate:{
    params: Joi.object({
      id: Joi.string().required()
    }),
    failAction: (request, h, error) => {
      return h.response({ message: error.details[0].message.replace(/['"]+/g, '') }).code(400).takeover();
    }
  },
  handler: async( request, h ) =>{
    try{
      const role = request.auth.artifacts.decoded.role;
      if(role == 'user'){ return h.response({ message: 'only admin and sub-admin have the permission to fetch testimonials'}).code(400)}

      const id = request.params.id;
      const data = await services.getSingleTestimonials(id);
      if(data.err){ return h.response({ message : data.err }).code(400)};
      if(!data.testimonials){ return h.response({ message:data.message }).code(400)}
      return h.response(data).code(200);
    }catch(error){
      return h.response( error.message ).code(500);
    }
  },
  tags:['api'] // swagger documentation
}
  

/********* edit a the testimonials ************/
exports.editTestimonials= { 
    description: 'edit testimonials',
    auth: 'token',
    validate: {
      params : Joi.object({
        id: Joi.string().required(),
      }),
      payload : Joi.object({
        name: Joi.string().min(3).optional(),
        image: Joi.array().items(Joi.string()).optional(),
        message: Joi.string().min(10).max(100).optional(),
        designation: Joi.string().optional()
      }),
      failAction: (request, h, error) => {
        return h.response({ message: error.details[0].message.replace(/['"]+/g, '') }).code(400).takeover();
      }
    },
    handler:async( request , h )=>{
      try {
        const role = request.auth.artifacts.decoded.role;
        if(role == 'user'){ return h.response({ message: 'only admin and sub-admin have the permission to edit testimonials'}).code(400)}

        const id = request.params.id;
        const detail = request.payload;
        const data = await services.editTestimonials(id , detail);
        if(data.err){ return h.response({ message : data.err }).code(400)};
        if(!data.testimonials){ return h.response({ message:data.message }).code(400)}
        return h.response(data).code(200);
  
      } catch (error) {
        return h.response( error.message ).code(500);
      }
    },
    tags: ['api'] //swagger documentation
  };
  

  

/********* delete a the testimonials ************/
exports.deleteTestimonials= { 
    description: 'delete testimonials',
    auth: 'token',
    validate: {
      params : Joi.object({
        id: Joi.string().required(),
      }),
      failAction: (request, h, error) => {
        return h.response({ message: error.details[0].message.replace(/['"]+/g, '') }).code(400).takeover();
      }
    },
    handler:async( request , h )=>{
      try {
        const role = request.auth.artifacts.decoded.role;
        if(role == 'user'){ return h.response({ message: 'only admin and sub-admin have the permission to delete testimonials'}).code(400)}

        const id = request.params.id;
        const data = await services.deleteTestimonials(id);
        if(data.err){ return h.response({ message : data.err }).code(400)};
        if(!data.testimonials){ return h.response({ message:data.message }).code(400)}
        return h.response(data).code(200);
  
      } catch (error) {
        return h.response( error.message ).code(500);
      }
    },
    tags: ['api'] //swagger documentation
  };