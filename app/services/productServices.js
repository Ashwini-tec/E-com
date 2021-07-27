
const Product = require("../models/Product");
const filter = require("lodash.filter");

/********** create product ****************/
exports.createProduct = async (data)=>{
  try {
    const valid = await isAlreadyExist(data.name);
    if(valid){ return { message : "product already exist" ,product : null }};

    const productData = {
        name: data.name,
        image : data.image,
        price : data.price,
        category : data.category,
    };

    const product =await Product.create(productData);
    return { message: "product created successfully", product: product };

  } catch (err) {
    return { err: err.message };
  }
};


/********** show all product ****************/
exports.getAllProduct = async ()=>{
    try {
      const product =await Product.find().populate( 'category',{ updatedAt:0 , createdAt:0, __v:0 }).select({ updatedAt:0 , createdAt:0, __v:0 } );
      return { message: "product successfully fetched", product: product };
  
    } catch (err) {
      return { err: err.message };
    }
  };


/********** get all product according to category ****************/
exports.getfilteredProduct = async (id)=>{
    try {
      const product =await Product.find().populate( 'category',{ updatedAt:0 , createdAt:0, __v:0 }).select({ updatedAt:0 , createdAt:0, __v:0 } );
      const results = filter(product, (item)=>{
       return item.category._id == id;
      });
      return { message: "product successfully fetched", product: results };
  
    } catch (err) {
      return { err: err.message };
    }
  };


// check category already exist or not 

const isAlreadyExist = async(name)=>{
  try {
    const data = await Product.findOne({ name : name });
    if(data) return true ;
    else return false ;

  } catch (err) {
    return { err: err.message };
  }
}