const services = require("../services/userServices");
const Joi = require('joi');


/********* create user ************/
exports.createUser= { 
  description: 'create user',
  auth: 'token',
  validate: {
    payload : Joi.object({
      name: Joi.string().min(3).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(5).required()
    }),
    failAction: (request, h, error) => {
      return h.response({ message: error.details[0].message.replace(/['"]+/g, '') }).code(400).takeover();
    }
  },
  handler:async( request , h )=>{
    try {
      const role = request.auth.artifacts.decoded.role;
      if(role !== 'admin'){ return h.response({ message: 'only admin have the permission to create user'}).code(400)}
      const userData = request.payload;
      const user = await services.createUser(userData);
      if(user.err){ return h.response({ message : user.err }).code(400)};
      if(!user.user){ return h.response({ message:user.message }).code(409)}
      return h.response(user).code(201);

    } catch (error) {
      return h.response( error.message ).code(500);
    }
  },
  tags: ['api'] //swagger documentation
};



/********* get all the user ************/
exports.getAllUser= { 
  description: 'Fetch all user',
  auth: 'token',
  handler:async( request , h )=>{
    try {
      const role = request.auth.artifacts.decoded.role;
      if(role !== 'admin'){ return h.response({ message: 'only admin have the permission to fetch all user details'}).code(400)}

      const data = await services.getAllUser();
      if(data.err){ return h.response({ message : data.err }).code(400)};
      if(!data.user){ return h.response({ message:data.message }).code(400)}
      return h.response(data).code(200);

    } catch (error) {
      return h.response( error.message ).code(500);
    }
  },
  tags: ['api'] //swagger documentation
};



/********* get a the user ************/
exports.getUser= { 
  description: 'Fetch user',
  auth: 'token' ,
  handler:async( request , h )=>{
    try {
      const id = request.auth.artifacts.decoded.id;
      const data = await services.getUser(id);
      if(data.err){ return h.response({ message : data.err }).code(400)};
      if(!data.user){ return h.response({ message:data.message }).code(400)};
      data.user.password = undefined;
      return h.response(data).code(200);

    } catch (error) {
      return h.response( error.message ).code(500);
    }
  },
  tags: ['api'] //swagger documentation
};




/********* edit user ************/
exports.editUser= { 
  description: 'edit user',
  auth: 'token',
  validate: {
    payload : Joi.object({
      email: Joi.string().email().optional(),
      password: Joi.string().min(5).optional()
    }),
    failAction: (request, h, error) => {
      return h.response({ message: error.details[0].message.replace(/['"]+/g, '') }).code(400).takeover();
    }
  },
  handler:async( request , h )=>{
    try {
      const id = request.auth.artifacts.decoded.id;
      const detail = request.payload;
      const data = await services.editUser(id , detail);
      if(data.err){ return h.response({ message : data.err }).code(400)};
      if(!data.user){ return h.response({ message:data.message }).code(400)}
      data.user.password = undefined;
      return h.response(data).code(200);

    } catch (error) {
      return h.response( error.message ).code(500);
    }
  },
  tags: ['api'] //swagger documentation
};




/********* delete user ************/
exports.deleteUser= { 
  description: 'delete user',
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
      const data = await services.deleteUser(id);
      if(data.err){ return h.response({ message : data.err }).code(400)};
      if(!data.user){ return h.response({ message:data.message }).code(400)}
      return h.response(data).code(200);

    } catch (error) {
      return h.response( error.message ).code(500);
    }
  },
  tags: ['api'] //swagger documentation
};