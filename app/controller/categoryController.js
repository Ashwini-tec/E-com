require('dotenv').config();
const services = require("../services/categoryServices");
const Joi = require('joi');
require('dotenv').config();


/********* create category ************/
exports.createCategory= { 
  description: 'create category',
  validate: {
    payload : Joi.object({
      name: Joi.string().min(3).required(),
    }),
    failAction: (request, h, error) => {
      return h.response({ message: error.details[0].message.replace(/['"]+/g, '') }).code(400).takeover();
    }
  },
  handler:async( request , h )=>{
    try {
      const catData = request.payload;
      let data = await services.createCategory(catData);
      if(!data.category){ return h.response({ message:data.message }).code(409)}
      return h.response(data).code(201);

    } catch (error) {
      return h.response( error.message ).code(500);
    }
  },
  tags: ['api'] //swagger documentation
};


/********* get all the Category ************/
exports.getAllCategory= { 
    description: 'Fetch all categories',
    handler:async( request , h )=>{
      try {
        const data = await services.getAllCategory();
        if(!data.category){ return h.response({ message:data.message }).code(400)}
        return h.response(data).code(200);
  
      } catch (error) {
        return h.response( error.message ).code(500);
      }
    },
    tags: ['api'] //swagger documentation
  };
