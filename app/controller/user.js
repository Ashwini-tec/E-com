require('dotenv').config();
const jwt = require("jsonwebtoken");
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


/******************* user login *****************/
exports.login = {
  description : "login user",
  validate: {
    payload : Joi.object({
      email :  Joi.string().email().required(),
      password: Joi.string().min(5).required(),
    }),
    failAction: (request, h, error) => {
        return h.response({ message: error.details[0].message.replace(/['"]+/g, '') }).code(400).takeover();
      }
    },
  handler :async(req ,h)=>{
  try {
    const user = req.payload;
    const data = await services.loginUser(user);
    if(!data.user){ return h.response({ data : data }).code(400)}
    const id = data.user._id; 
    let jwtToken = jwt.sign( { id } , `${process.env.JWT_SECRET_KEY}`, { expiresIn: '1 day' });
    return h.response({ data: data , token: jwtToken }).code(200);
  } catch (error) {
    return h.response( error.message ).code(500);
  }
},
tags: ['api'] //swagger documentation
}
