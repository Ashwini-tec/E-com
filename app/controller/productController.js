const services = require("../services/productServices");
const Joi = require('joi');
const path = require('path');
const appDir = path.dirname(require.main.filename);
const fs = require("fs");


/********* create product ************/
exports.createProduct= { 
  description: 'create product',
  auth: 'token',
  plugins: {
    'hapi-swagger':{
      payloadType:'form'
    }
  },
  payload: {
    output: "stream",
    parse: true,
    multipart : true,
    allow: "multipart/form-data",
    maxBytes: 4 * 1000 * 1000
  },
  validate: {
    payload : Joi.object({
      name: Joi.string().min(3).required(),
      image: Joi.any().meta({ swaggerType: 'file' }).description('image').required(),
      price: Joi.number().required(),
      category: Joi.string().required(),
      subCategory: Joi.string().required(),
      sku: Joi.string().required(),
      tags: Joi.string().required(),
      color: Joi.string().required(),
      description: Joi.string().required(),
      typeProduct: Joi.string().required(),
      bannerImage: Joi.any().meta({ swaggerType: 'file' }).description('image').required(),
    }),
    failAction: (request, h, error) => {
      return h.response({ message: error.details[0].message.replace(/['"]+/g, '') }).code(400).takeover();
    }
  },
  handler:async( request , h )=>{
    try {
      const image = [];
      let productData = request.payload;
      let images = { image : productData.image , bannerImage : productData.bannerImage } ;
      const imageUpload = await uploadImage(images);

      if(imageUpload){
        imageUpload.image.forEach(element => {
          image.push(element.filename);
        });
        productData.image =image;
        productData.bannerImage = imageUpload.bannerImage.filename;
      }
     
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
  auth: 'token' ,
  validate:{
    payload :Joi.object({
      priceFlag: Joi.boolean().required()
    })
  },
  handler:async( request , h )=>{
    try {
      const role = request.auth.artifacts.decoded.role;
      if(role == 'user'){ return h.response({ message: 'only admin and sub admin have the permission to set price visibility'}).code(400)}

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



/********* admin view get all the product ************/
exports.adminView= { 
  description: 'admin view Fetch all product',
  auth: 'token' ,
  handler:async( request , h )=>{
    try {
      const role = request.auth.artifacts.decoded.role;
      if(role == 'user'){ return h.response({ message: 'only admin and sub admin have the permission to fetch product detail'}).code(400)}

      const data = await services.adminView();

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





/***************************** upload image in local storage *********************/
const uploadImage = async(productData)=>{
  const result =[];
  if(productData.image instanceof Array){
    for(var i = 0; i < productData["image"].length; i++) {
      await result.push(productData["image"][i].hapi);
      await productData["image"][i].pipe(fs.createWriteStream("./uploads/" + productData["image"][i].hapi.filename))
    }
  }else{
    await result.push(productData['image'].hapi);
    await productData["image"].pipe(fs.createWriteStream("./uploads/" + productData["image"].hapi.filename))
  }

  productData.image = result;
  await productData["bannerImage"].pipe(fs.createWriteStream("./uploads/" + productData["bannerImage"].hapi.filename))
  productData.bannerImage = productData['bannerImage'].hapi
 
  return productData;
}


/********* get image ************/
exports.image= { 
  description: 'Fetch image',
  auth: false ,
  validate: {
    params : Joi.object({
      image: Joi.string().required(),
    }),
    failAction: (request, h, error) => {
      return h.response({ message: error.details[0].message.replace(/['"]+/g, '') }).code(400).takeover();
    }
  },
  handler:async( request , h )=>{
    const image = request.params.image;
    return h.file(appDir+"/uploads/"+image)
  },
  tags: ['api'] //swagger documentation
}