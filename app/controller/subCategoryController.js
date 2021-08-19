const services = require("../services/subCategoryServices");
const Joi = require('joi');


/********* create subCategory ************/
exports.createSubCategory= { 
  description: 'create subCategory',
  auth: 'token',
  validate: {
    payload : Joi.object({
      subCategory: Joi.string().min(3).required(),
      category: Joi.string().required()
    }),
    failAction: (request, h, error) => {
      return h.response({ message: error.details[0].message.replace(/['"]+/g, '') }).code(400).takeover();
    }
  },
  handler:async( request , h )=>{
    try {
      const subCat = request.payload;
      subCat.user = request.auth.artifacts.decoded.id;
      const data = await services.createSubCategory(subCat);
      if(!data.subCategory){ return h.response({ message:data.message }).code(409)}
      return h.response(data).code(201);

    } catch (error) {
      return h.response( error.message ).code(500);
    }
  },
  tags: ['api'] //swagger documentation
};


/********* get all the subCategory ************/
exports.getAllSubCategory= { 
    description: 'Fetch all subCategories',
    auth: false ,
    handler:async( request , h )=>{
      try {
        const data = await services.getAllSubCategory();
        if(!data.subCategory){ return h.response({ message:data.message }).code(400)}
        return h.response(data).code(200);
  
      } catch (error) {
        return h.response( error.message ).code(500);
      }
    },
    tags: ['api'] //swagger documentation
  };


/********* get single subCategory ************/
exports.getSubCategory= { 
  description: 'Fetch subCategories',
  auth: false ,
  validate: {
    params : Joi.object({
      id: Joi.string().required()
    }),
    failAction: (request, h, error) => {
      return h.response({ message: error.details[0].message.replace(/['"]+/g, '') }).code(400).takeover();
    }
  },
  handler:async( request , h )=>{
    try {
      const id = request.params.id;
      const data = await services.getSubCategory(id);
      if(!data.subCategory){ return h.response({ message:data.message }).code(400)}
      return h.response(data).code(200);

    } catch (error) {
      return h.response( error.message ).code(500);
    }
  },
  tags: ['api'] //swagger documentation
};





/********* edit subCategory ************/
exports.editSubCategory= { 
  description: 'edit subCategory',
  auth: 'token',
  validate: {
    params : Joi.object({
      id: Joi.string().required(),
    }),
    payload : Joi.object({
      subCategory: Joi.string().min(3).optional(),
      category: Joi.string().optional()
    }),
    failAction: (request, h, error) => {
      return h.response({ message: error.details[0].message.replace(/['"]+/g, '') }).code(400).takeover();
    }
  },
  handler:async( request , h )=>{
    try {
      const id = request.params.id;
      const detail = request.payload;
      const data = await services.editSubCategory(id , detail);
      if(data.err){ return h.response({ message : data.err }).code(400)};
      if(!data.subCategory){ return h.response({ message:data.message }).code(400)}
      return h.response(data).code(200);

    } catch (error) {
      return h.response( error.message ).code(500);
    }
  },
  tags: ['api'] //swagger documentation
};


/********* delete subCategory ************/
exports.deleteSubCategory= { 
  description: 'delete subCategory',
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
      const id = request.params.id;
      const data = await services.deleteSubCategory(id);
      if(data.err){ return h.response({ message : data.err }).code(400)};
      if(!data.subCategory){ return h.response({ message:data.message }).code(400)}
      return h.response(data).code(200);

    } catch (error) {
      return h.response( error.message ).code(500);
    }
  },
  tags: ['api'] //swagger documentation
};



/********* admin view get all the subCategory ************/
exports.adminView = { 
  description: 'admin view Fetch all subCategories',
  auth: 'token' ,
  handler:async( request , h )=>{
    try {
      const role = request.auth.artifacts.decoded.role;
      if(role == 'user'){ return h.response({ message: 'only admin and sub admin have the permission to fetch subCategory detail'}).code(400)}

      const data = await services.adminView();
      if(!data.subCategory){ return h.response({ message:data.message }).code(400)}
      return h.response(data).code(200);

    } catch (error) {
      return h.response( error.message ).code(500);
    }
  },
  tags: ['api'] //swagger documentation
};
