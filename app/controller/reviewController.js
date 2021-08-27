const services = require("../services/reviewServices");
const Joi = require('joi');


/********* review product ************/
exports.reviewProduct= { 
  description: 'review product',
  auth: false,
  validate: {
    params : Joi.object({
      productId: Joi.string().required(),
    }),
    payload : Joi.object({
      name: Joi.string().min(3).required(),
      email: Joi.string().email().required(),
      message: Joi.string().min(10).max(100).required()
    }),
    failAction: (request, h, error) => {
      return h.response({ message: error.details[0].message.replace(/['"]+/g, '') }).code(400).takeover();
    }
  },
  handler: async( request , h )=>{
    try {
      const reviewData = request.payload;
      reviewData.productId = request.params.productId;
      let data = await services.reviewProduct(reviewData);
      if(data.err){ return h.response({ message : data.err }).code(400)};
      if(!data.review){ return h.response({ message: data.message }).code(409)}
      return h.response(data).code(201);

    } catch (error) {
      return h.response( error.message ).code(500);
    }
  },
  tags: ['api'] //swagger documentation
};




/********* get all the review ************/
exports.getAllReview= { 
    description: 'Fetch all review',
    auth: 'token',
    handler:async( request , h )=>{
      try {
        const data = await services.getAllReview();
        if(data.err){ return h.response({ message : data.err }).code(400)};
        if(!data.review){ return h.response({ message: data.message }).code(400)}
        return h.response(data).code(200);
  
      } catch (error) {
        return h.response( error.message ).code(500);
      }
    },
    tags: ['api'] //swagger documentation
  };



/********* get all the unverified review ************/
exports.getAllReviewVerify= { 
    description: 'Fetch all unverified review',
    auth: 'token',
    handler:async( request , h )=>{
      try {
        const data = await services.getAllReviewVerify();
        if(data.err){ return h.response({ message : data.err }).code(400)};
        if(!data.review){ return h.response({ message: data.message }).code(400)}
        return h.response(data).code(200);
  
      } catch (error) {
        return h.response( error.message ).code(500);
      }
    },
    tags: ['api'] //swagger documentation
  };


  
/********* get a the review ************/
exports.getReview= { 
    description: 'Fetch single review',
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
        const id = request.params.id;
        const data = await services.getReview(id);
        if(data.err){ return h.response({ message : data.err }).code(400)};
        if(!data.review){ return h.response({ message:data.message }).code(400)}
        return h.response(data).code(200);
  
      } catch (error) {
        return h.response( error.message ).code(500);
      }
    },
    tags: ['api'] //swagger documentation
  };
  
  

/********* delete a the review ************/
exports.deleteReview= { 
    description: 'delete review',
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
        const data = await services.deleteReview(id);
        if(data.err){ return h.response({ message : data.err }).code(400)};
        if(!data.review){ return h.response({ message: data.message }).code(400)}
        return h.response(data).code(200);
  
      } catch (error) {
        return h.response( error.message ).code(500);
      }
    },
    tags: ['api'] //swagger documentation
  };


  

/********* edit a the review ************/
exports.editReview= { 
    description: 'edit review',
    auth: 'token',
    validate: {
      params : Joi.object({
        id: Joi.string().required(),
      }),
      payload : Joi.object({
        verified: Joi.boolean().required(),
      }),
      failAction: (request, h, error) => {
        return h.response({ message: error.details[0].message.replace(/['"]+/g, '') }).code(400).takeover();
      }
    },
    handler:async( request , h )=>{
      try {
        const id = request.params.id;
        const detail = request.payload;
        const data = await services.editReview(id , detail);
        if(data.err){ return h.response({ message : data.err }).code(400)};
        if(!data.review){ return h.response({ message:data.message }).code(400)}
        return h.response(data).code(200);
  
      } catch (error) {
        return h.response( error.message ).code(500);
      }
    },
    tags: ['api'] //swagger documentation
  };
  
  