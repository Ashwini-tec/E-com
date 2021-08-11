const services = require("../services/productServices");
const Joi = require('joi');


/********* create product ************/
exports.createProduct= { 
  description: 'create product',
  auth: 'token',
  validate: {
    payload : Joi.object({
      name: Joi.string().min(3).required(),
      image: Joi.array().items(Joi.string()).required(),
      price: Joi.number().required(),
      category: Joi.string().required(),
      subCategory: Joi.string().required(),
      sku: Joi.string().required(),
      tags: Joi.string().required(),
      color: Joi.string().required(),
      description: Joi.string().required(),
      typeProduct: Joi.string().required(),
      bannerImage: Joi.string().required(),
    }),
    failAction: (request, h, error) => {
      return h.response({ message: error.details[0].message.replace(/['"]+/g, '') }).code(400).takeover();
    }
  },
  handler:async( request , h )=>{
    try {
      const productData = request.payload;
      productData.user = request.auth.artifacts.decoded.id;
      let data = await services.createProduct(productData);
      if(data.err){ return h.response({ message : data.err }).code(400)};
      if(!data.product){ return h.response({ message:data.message }).code(409)}
      return h.response(data).code(201);

    } catch (error) {
      return h.response( error.message ).code(500);
    }
  },
  tags: ['api'] //swagger documentation
};


/********* get all the product ************/
exports.getAllProduct= { 
    description: 'Fetch all product',
    auth: false ,
    handler:async( request , h )=>{
      try {
        const data = await services.getAllProduct();

        await data.product.find( item =>{
          if(!item.priceFlag){
            return ( item.price = undefined , item.priceFlag = undefined );  
          }
          return item.priceFlag = undefined ;
        });

        if(data.err){ return h.response({ message : data.err }).code(400)};
        if(!data.product){ return h.response({ message:data.message }).code(400)}
        return h.response(data).code(200);
  
      } catch (error) {
        return h.response( error.message ).code(500);
      }
    },
    tags: ['api'] //swagger documentation
  };



/********* get product ************/
exports.getProduct= { 
  description: 'Fetch single product',
  auth: false ,
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
      const data = await services.getProduct(id);
      if(data.err){ return h.response({ message : data.err }).code(400)};
      if(!data.product){ return h.response({ message:data.message }).code(400)}

      const priceFlag = data.product.priceFlag;
      if(!priceFlag){
        data.product.price = undefined
      }
      data.product.priceFlag = undefined ;
      return h.response(data).code(200);

    } catch (error) {
      return h.response( error.message ).code(500);
    }
  },
  tags: ['api'] //swagger documentation
};



/********* edit a the product ************/
exports.editProduct= { 
  description: 'edit product',
  auth: 'token',
  validate: {
    params : Joi.object({
      id: Joi.string().required(),
    }),
    payload : Joi.object({
      name: Joi.string().min(3).optional(),
      image: Joi.array().items(Joi.string()).optional(),
      price: Joi.number().optional(),
      category: Joi.string().optional(),
      subCategory: Joi.string().optional(),
      sku: Joi.string().optional(),
      tags: Joi.string().optional(),
      color: Joi.string().optional(),
      description: Joi.string().optional(),
      typeProduct: Joi.string().optional(),
      bannerImage: Joi.string().optional(),
    }),
    failAction: (request, h, error) => {
      return h.response({ message: error.details[0].message.replace(/['"]+/g, '') }).code(400).takeover();
    }
  },
  handler:async( request , h )=>{
    try {
      const id = request.params.id;
      const detail = request.payload;
      const data = await services.editProduct(id , detail);
      if(data.err){ return h.response({ message : data.err }).code(400)};
      if(!data.product){ return h.response({ message:data.message }).code(400)}
      return h.response(data).code(200);

    } catch (error) {
      return h.response( error.message ).code(500);
    }
  },
  tags: ['api'] //swagger documentation
};



/********* delete product ************/
exports.deleteProduct= { 
  description: 'delete product',
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
      const data = await services.deleteProduct(id);
      if(data.err){ return h.response({ message : data.err }).code(400)};
      if(!data.product){ return h.response({ message:data.message }).code(400)}
      return h.response(data).code(200);

    } catch (error) {
      return h.response( error.message ).code(500);
    }
  },
  tags: ['api'] //swagger documentation
};


/******************* set price visibility{ true or false } ****************/

exports.setVisibility= { 
  description: 'set visibility of the price',
  auth: false ,
  validate:{
    payload :Joi.object({
      priceFlag: Joi.boolean().required()
    })
  },
  handler:async( request , h )=>{
    try {
      const visible = request.payload;
      const data = await services.setVisibility(visible);
      if(data.err){ return h.response({ message : data.err }).code(400)};
      if(!data){ return h.response({ message:data.message }).code(400)}
      return h.response(data).code(200);

    } catch (error) {
      return h.response( error.message ).code(500);
    }
  },
  tags: ['api'] //swagger documentation
};

