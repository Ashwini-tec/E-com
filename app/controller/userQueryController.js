const services = require("../services/userQueryInfoServices");
const Joi = require('joi');
const mailer = require('../../lib/mail');


/********* user query info send mail to admin and save it to data base ************/
exports.userQueryInfo= { 
  description: 'user query information',
  auth: false,
  validate: {
    payload : Joi.object({
      name: Joi.string().min(3).required(),
      productId: Joi.string().required(),
      productImage: Joi.string().allow(''),
      productName: Joi.string().required(),
      email: Joi.string().email().required(),
      contact: Joi.number().required(),
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
      if(data.err){ return h.response({ message : data.err }).code(400)};

      if(data){ 
        let mail = await mailer.sendMail(queryData)
        const wellcomeMessage = "Thank You For Generate Your Query We Will Get Back Too You Soon"
        queryData.wellcomeMessage = wellcomeMessage ;
        if(mail.sent){
          let confirmationMail = await mailer.userConfirmationMail(queryData);
          data.confirmationMail = confirmationMail;
          data.mailInfo = mail;
        }
      }
      
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
        const role = request.auth.artifacts.decoded.role;
        if(role == 'user'){ return h.response({ message: 'only admin and sub-admin have the permission'}).code(400)}

        const data = await services.getAllQuery();
        if(data.err){ return h.response({ message : data.err }).code(400)};
        return h.response(data).code(200);
  
      } catch (error) {
        return h.response( error.message ).code(500);
      }
    },
    tags: ['api'] //swagger documentation
  };



/********* edit a the query ************/
exports.editQueryStatus= { 
  description: 'edit query status for admin',
  auth: 'token',
  validate: {
    params : Joi.object({
      id: Joi.string().required(),
    }),
    payload : Joi.object({
      status: Joi.string().required(),
    }),
    failAction: (request, h, error) => {
      return h.response({ message: error.details[0].message.replace(/['"]+/g, '') }).code(400).takeover();
    }
  },
  handler:async( request , h )=>{
    try {
      const role = request.auth.artifacts.decoded.role;
      if(role == 'user'){ return h.response({ message: 'only admin and sub-admin have the permission to update status'}).code(400)}

      const id = request.params.id;
      const detail = request.payload;
      const data = await services.editQueryStatus(id , detail);
      if(data.err){ return h.response({ message : data.err }).code(400)};
      if(!data.queryInfo){ return h.response({ message:data.message }).code(400)}
      return h.response(data).code(200);

    } catch (error) {
      return h.response( error.message ).code(500);
    }
  },
  tags: ['api'] //swagger documentation
};


/********* delete user query ************/
exports.deleteQuery= { 
  description: 'delete query status by admin',
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
      if(role == 'user'){ return h.response({ message: 'only admin and sub-admin have the permission to update status'}).code(400)}

      const id = request.params.id;
      const data = await services.deleteQuery(id);
      if(data.err){ return h.response({ message : data.err }).code(400)};
      if(!data.queryInfo){ return h.response({ message:data.message }).code(400)}
      return h.response(data).code(200);

    } catch (error) {
      return h.response( error.message ).code(500);
    }
  },
  tags: ['api'] //swagger documentation
};




/********* fetch by id user query ************/
exports.fetchAQueryInfo= { 
  description: 'fetch by id user query',
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
      if(role == 'user'){ return h.response({ message: 'only admin and sub-admin have the permission to update status'}).code(400)}

      const id = request.params.id;
      const data = await services.fetchAQueryInfo(id);
      if(data.err){ return h.response({ message : data.err }).code(400)};
      if(!data.queryInfo){ return h.response({ message:data.message }).code(400)}
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
      mobile: Joi.number().required(),
      message: Joi.string().min(10).max(100).required()
    }),
    failAction: (request, h, error) => {
      return h.response({ message: error.details[0].message.replace(/['"]+/g, '') }).code(400).takeover();
    }
  },
  handler:async( request , h )=>{
    try {
      const queryData = request.payload;
      const data = await services.contactMail(queryData);
      if(data.err){ return h.response({ message : data.err }).code(400)};

      if(data){ 
        let mail = await mailer.contactMail(queryData)
        const wellcomeMessage = "Thank You For Contacting Us We Will Get Back To You Soon"
        queryData.wellcomeMessage = wellcomeMessage ;
        if(mail.sent){
          let confirmationMail = await mailer.userConfirmationMail(queryData);
          data.confirmationMail = confirmationMail;
          data.mailInfo = mail;
        }
      }
      return h.response(data).code(200);

    } catch (error) {
      return h.response( error.message ).code(500);
    }
  },
  tags: ['api'] //swagger documentation
};





/********* get all the contsct us detail ************/
exports.getAllContactDetail= { 
  description: 'Fetch all contact us detail',
  auth: 'token',
  handler:async( request , h )=>{
    try {
      const role = request.auth.artifacts.decoded.role;
      if(role == 'user'){ return h.response({ message: 'only admin and sub-admin have the permission'}).code(400)}

      const data = await services.getAllContactDetail();
      if(data.err){ return h.response({ message : data.err }).code(400)};
      return h.response(data).code(200);

    } catch (error) {
      return h.response( error.message ).code(500);
    }
  },
  tags: ['api'] //swagger documentation
};



/********* delete user contact us detail ************/
exports.deleteContactUsDetail = { 
  description: 'contact us detail delete',
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
      if(role == 'user'){ return h.response({ message: 'only admin and sub-admin have the permission to update status'}).code(400)}

      const id = request.params.id;
      const data = await services.deleteContactUsDeatil(id);
      if(data.err){ return h.response({ message : data.err }).code(400)};
      if(!data.queryInfo){ return h.response({ message:data.message }).code(400)}
      return h.response(data).code(200);

    } catch (error) {
      return h.response( error.message ).code(500);
    }
  },
  tags: ['api'] //swagger documentation
};


