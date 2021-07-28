const services = require("../services/categoryServices");
const Joi = require('joi');


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
      if(data.err){ return h.response({ message : data.err }).code(400)};
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
        if(data.err){ return h.response({ message : data.err }).code(400)};
        if(!data.category){ return h.response({ message:data.message }).code(400)}
        return h.response(data).code(200);
  
      } catch (error) {
        return h.response( error.message ).code(500);
      }
    },
    tags: ['api'] //swagger documentation
  };


/********* get a the Category ************/
exports.getCategory= { 
  description: 'Fetch single categories',
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
      const id = request.params.id;
      const data = await services.getCategory(id);
      if(data.err){ return h.response({ message : data.err }).code(400)};
      if(!data.category){ return h.response({ message:data.message }).code(400)}
      return h.response(data).code(200);

    } catch (error) {
      return h.response( error.message ).code(500);
    }
  },
  tags: ['api'] //swagger documentation
};



/********* edit a the Category ************/
exports.editCategory= { 
  description: 'edit categories',
  validate: {
    params : Joi.object({
      id: Joi.string().required(),
    }),
    payload : Joi.object({
      name: Joi.string().min(3).required(),
    }),
    failAction: (request, h, error) => {
      return h.response({ message: error.details[0].message.replace(/['"]+/g, '') }).code(400).takeover();
    }
  },
  handler:async( request , h )=>{
    try {
      const id = request.params.id;
      const detail = request.payload;
      const data = await services.editCategory(id , detail);
      if(data.err){ return h.response({ message : data.err }).code(400)};
      if(!data.category){ return h.response({ message:data.message }).code(400)}
      return h.response(data).code(200);

    } catch (error) {
      return h.response( error.message ).code(500);
    }
  },
  tags: ['api'] //swagger documentation
};



/********* delete a the Category ************/
exports.deleteCategory= { 
  description: 'delete categories',
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
      const id = request.params.id;
      const data = await services.deleteCategory(id);
      if(data.err){ return h.response({ message : data.err }).code(400)};
      if(!data.category){ return h.response({ message:data.message }).code(400)}
      return h.response(data).code(200);

    } catch (error) {
      return h.response( error.message ).code(500);
    }
  },
  tags: ['api'] //swagger documentation
};