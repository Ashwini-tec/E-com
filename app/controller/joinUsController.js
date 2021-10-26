const services = require("../services/joinUsServices");
const Joi = require('joi');
const mailer = require('../../lib/mail')


/********* create Join us detail ************/
exports.joinUsDetail= { 
  description: 'create join us detail',
  auth: false,
  validate: {
    payload : Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().email().required()
    }),
    failAction: (request, h, error) => {
      return h.response({ message: error.details[0].message.replace(/['"]+/g, '') }).code(400).takeover();
    }
  },
  handler:async( request , h )=>{
    try {
      const joinUsData = request.payload;
      let data = await services.joinUsDetail(joinUsData);
      if(data.err){ return h.response({ message : data.err }).code(400)};

      if(data){ 
        let mail = await mailer.joinUsMail(joinUsData)
        const wellcomeMessage = "Thank You For Your Interest In Our Business We Will Get Back To You Soon"
        joinUsData.wellcomeMessage = wellcomeMessage ;
        if(mail.sent){
          let confirmationMail = await mailer.userConfirmationMail(joinUsData);
          data.confirmationMail = confirmationMail;
          data.mailInfo = mail;
        }
      }

      if(!data.detail){ return h.response({ message:data.message }).code(409)}
      return h.response(data).code(201);

    } catch (error) {
      return h.response( error.message ).code(500);
    }
  },
  tags: ['api'] //swagger documentation
};


/********* get all the join us details ************/
exports.joinUsDetailFetchAll= { 
    description: 'Fetch all join detail',
    auth: 'token' ,
    handler:async( request , h )=>{
      try {
        const role = request.auth.artifacts.decoded.role;
        if(role == 'user'){ return h.response({ message: 'only admin and sub-admin have the permission to fetch detail'}).code(400)}
  
        const data = await services.joinUsDetailFetchAll();
        if(data.err){ return h.response({ message : data.err }).code(400)};
        if(!data.detail){ return h.response({ message:data.message }).code(400)}
        return h.response(data).code(200);
  
      } catch (error) {
        return h.response( error.message ).code(500);
      }
    },
    tags: ['api'] //swagger documentation
  };


  
/********* delete detail of join us ************/
exports.deleteJoinUsDeatil= { 
    description: 'delete join detail',
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
        if(role == 'user'){ return h.response({ message: 'only admin and sub-admin have the permission to delete detail'}).code(400)}
  
        const id = request.params.id;
        const data = await services.deleteJoinUsDeatil(id);
        if(data.err){ return h.response({ message : data.err }).code(400)};
        if(!data.detail){ return h.response({ message:data.message }).code(400)}
        return h.response(data).code(200);
  
      } catch (error) {
        return h.response( error.message ).code(500);
      }
    },
    tags: ['api'] //swagger documentation
  };
  