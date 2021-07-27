require('dotenv').config();
const services = require("../services/productServices");
const Joi = require('joi');
require('dotenv').config();


/********* create product ************/
exports.createProduct= { 
  description: 'create product',
  validate: {
    payload : Joi.object({
      name: Joi.string().min(3).required(),
      image: Joi.string().required(),
      price: Joi.number().required(),
      category: Joi.string().required()
    }),
    failAction: (request, h, error) => {
      return h.response({ message: error.details[0].message.replace(/['"]+/g, '') }).code(400).takeover();
    }
  },
  handler:async( request , h )=>{
    try {
      const productData = request.payload;
      let data = await services.createProduct(productData);
      if(data.err){ return h.response({ message : data.err }).code(400)};
      if(!data.product){ return h.response({ message:data.message }).code(409)}
      return h.response(data).code(201);

    } catch (error) {
      return h.response( error.message ).code(500);
    }
  },
  tags: ['api'] //swagger documentation
};


/********* get all the product ************/
exports.getAllProduct= { 
    description: 'Fetch all product',
    handler:async( request , h )=>{
      try {
        const data = await services.getAllProduct();
        if(!data.product){ return h.response({ message:data.message }).code(400)}
        return h.response(data).code(200);
  
      } catch (error) {
        return h.response( error.message ).code(500);
      }
    },
    tags: ['api'] //swagger documentation
  };



/********* get all the product according to category ************/
exports.getAllFilteredProduct= { 
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
            const data = await services.getfilteredProduct(id);
            if(!data.product){ return h.response({ message:data.message }).code(400)}
            return h.response(data).code(200);
  
      } catch (error) {
        return h.response( error.message ).code(500);
      }
    },
    tags: ['api'] //swagger documentation
  };