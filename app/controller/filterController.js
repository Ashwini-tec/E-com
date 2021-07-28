const services = require("../services/filterServices");
const Joi = require('joi');


/********* get all the product according to category ************/
exports.getCatProduct= { 
    description: 'filter all product according to category',
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
            const id = request.params.id ;
            const data = await services.getCatProduct(id);
            if(data.err){ return h.response({ message : data.err }).code(400)};
            if(!data.product){ return h.response({ message:data.message }).code(400)}
            return h.response(data).code(200);
  
      } catch (error) {
        return h.response( error.message ).code(500);
      }
    },
    tags: ['api'] //swagger documentation
  };



/********* get all the product according to subCategory ************/
exports.getSubProduct= { 
    description: 'filter all product according to subCategory',
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
            const id = request.params.id ;
            const data = await services.getSubProduct(id);
            if(data.err){ return h.response({ message : data.err }).code(400)};
            if(!data.product){ return h.response({ message:data.message }).code(400)}
            return h.response(data).code(200);
  
      } catch (error) {
        return h.response( error.message ).code(500);
      }
    },
    tags: ['api'] //swagger documentation
  };


  
/********* get all the subCategory according to category ************/
exports.getSubCategory= { 
    description: 'filter subCategory according to category',
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
            const id = request.params.id ;
            const data = await services.getSubCategory(id);
            if(data.err){ return h.response({ message : data.err }).code(400)};
            if(!data.product){ return h.response({ message:data.message }).code(400)}
            return h.response(data).code(200);
  
      } catch (error) {
        return h.response( error.message ).code(500);
      }
    },
    tags: ['api'] //swagger documentation
  };