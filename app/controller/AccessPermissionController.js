const services = require("../services/accessPermissionServices");
const Joi = require('joi');


/********* create access permission ************/
exports.createAccess= { 
  description: 'create access permission',
  auth: 'token',
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
      const role = request.auth.artifacts.decoded.role;
      if(role !== 'admin'){ return h.response({ message: 'only admin have the permission to create access permission detail'}).code(400)}

      const accessData = request.payload;
      accessData.user = request.auth.artifacts.decoded.id;
      let data = await services.createAccess(accessData);
      if(data.err){ return h.response({ message : data.err }).code(400)};
      if(!data.accessPermissions){ return h.response({ message:data.message }).code(409)}
      return h.response(data).code(201);

    } catch (error) {
      return h.response( error.message ).code(500);
    }
  },
  tags: ['api'] //swagger documentation
};


/********* get all the access permission details ************/
exports.fetchAllAccess= { 
  description: 'Fetch all access permission',
  auth: 'token',
  handler:async( request , h )=>{
    try {
      const role = request.auth.artifacts.decoded.role;
      if(role == 'user'){ return h.response({ message: 'only admin and sub admin have the permission to fetch access permission detail'}).code(400)}

      const data = await services.fetchAllAccess();
      if(data.err){ return h.response({ message : data.err }).code(400)};
      if(!data.accessPermissions){ return h.response({ message:data.message }).code(400)}
      return h.response(data).code(200);

    } catch (error) {
      return h.response( error.message ).code(500);
    }
  },
  tags: ['api'] //swagger documentation
};


/********* get a the access permission detail ************/
exports.fetchAccess= { 
  description: 'Fetch single access permission detail',
  auth: 'token' ,
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
      if(role == 'user'){ return h.response({ message: 'only admin and sub admin have the permission to fetch access permission detail'}).code(400)}

      const id = request.params.id;
      const data = await services.fetchAccess(id);
      if(data.err){ return h.response({ message : data.err }).code(400)};
      if(!data.accessPermissions){ return h.response({ message:data.message }).code(400)}
      return h.response(data).code(200);

    } catch (error) {
      return h.response( error.message ).code(500);
    }
  },
  tags: ['api'] //swagger documentation
};




/********* edit a the access permission ************/
exports.editAccess= { 
  description: 'edit access permission detail',
  auth: 'token',
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
      const role = request.auth.artifacts.decoded.role;
      if(role == 'user'){ return h.response({ message: 'only admin and sub admin have the permission to edit access permission detail'}).code(400)}

      const id = request.params.id;
      const detail = request.payload;
      const data = await services.editAccess(id , detail);
      if(data.err){ return h.response({ message : data.err }).code(400)};
      if(!data.accessPermissions){ return h.response({ message:data.message }).code(400)}
      return h.response(data).code(200);

    } catch (error) {
      return h.response( error.message ).code(500);
    }
  },
  tags: ['api'] //swagger documentation
};




/********* delete a the access permission detail ************/
exports.deleteAccess= { 
  description: 'delete access permission detail',
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
      if(role == 'user'){ return h.response({ message: 'only admin and sub admin have the permission to delete access permission detail'}).code(400)}

      const id = request.params.id;
      const data = await services.deleteAccess(id);
      if(data.err){ return h.response({ message : data.err }).code(400)};
      if(!data.accessPermissions){ return h.response({ message:data.message }).code(400)}
      return h.response(data).code(200);

    } catch (error) {
      return h.response( error.message ).code(500);
    }
  },
  tags: ['api'] //swagger documentation
};

