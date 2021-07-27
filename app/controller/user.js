require('dotenv').config();
const services = require("../services/userServices");
const Joi = require('joi');
require('dotenv').config();


/********* create user ************/
exports.createUser= { 
  description: 'create user',
  validate: {
    payload : Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(5).required()
    }),
    failAction: (request, h, error) => {
      return h.response({ message: error.details[0].message.replace(/['"]+/g, '') }).code(400).takeover();
    }
  },
  handler:async( request , h )=>{
    try {
      const userData = request.payload;
      let user = await services.createUser(userData);
      if(!user.user){ return h.response({ message:user.message }).code(409)}
      return h.response(user).code(201);

    } catch (error) {
      return h.response( error.message ).code(500);
    }
  },
  tags: ['api'] //swagger documentation
};
