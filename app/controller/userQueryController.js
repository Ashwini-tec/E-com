const services = require("../services/userQueryInfoServices");
const Joi = require('joi');
const mailer = require('../../lib/mail')


/********* user query info send mail to admin and save it to data base ************/
exports.userQueryInfo= { 
  description: 'user query information',
  auth: false,
  validate: {
    payload : Joi.object({
      name: Joi.string().min(3).required(),
      productId: Joi.string().required(),
      productName: Joi.string().required(),
      email: Joi.string().email().required(),
      contact: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
      message: Joi.string().min(10).max(100).required()
    }),
    failAction: (request, h, error) => {
      return h.response({ message: error.details[0].message.replace(/['"]+/g, '') }).code(400).takeover();
    }
  },
  handler:async( request , h )=>{
    try {
      const queryData = request.payload;
      const data = await services.userQueryInfo(queryData);
      if(data){ await mailer.sendMail(queryData) }
      if(data.err){ return h.response({ message : data.err }).code(400)};
      return h.response(data).code(201);

    } catch (error) {
      return h.response( error.message ).code(500);
    }
  },
  tags: ['api'] //swagger documentation
};




/********* get all the query ************/
exports.getAllQuery= { 
    description: 'Fetch all user query',
    auth: 'token',
    handler:async( request , h )=>{
      try {
        const data = await services.getAllQuery();
        if(data.err){ return h.response({ message : data.err }).code(400)};
        return h.response(data).code(200);
  
      } catch (error) {
        return h.response( error.message ).code(500);
      }
    },
    tags: ['api'] //swagger documentation
  };


/************************ contact us via mail *********************/

exports.contactUs= { 
  description: 'contact us',
  auth: false,
  validate: {
    payload : Joi.object({
      name: Joi.string().min(3).required(),
      email: Joi.string().email().required(),
      subject: Joi.string().required(),
      mobile: Joi.string().required(),
      message: Joi.string().min(10).max(100).required()
    }),
    failAction: (request, h, error) => {
      return h.response({ message: error.details[0].message.replace(/['"]+/g, '') }).code(400).takeover();
    }
  },
  handler:async( request , h )=>{
    try {
      const queryData = request.payload;
      await mailer.contactMail(queryData);
      return h.response({ message: " mail successfully send "}).code(200);

    } catch (error) {
      return h.response( error.message ).code(500);
    }
  },
  tags: ['api'] //swagger documentation
};

