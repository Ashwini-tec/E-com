const Product = require("../models/Product");
const SubCategory = require("../models/SubCategory");
const filter = require("lodash.filter");


/********** get all product according to category ****************/
exports.getCatProduct = async (id)=>{
    try {
      const product =await Product.find()
      .populate( 'category',{ updatedAt:0 , createdAt:0, __v:0 , status: 0 })
      .populate( 'subCategory',{ updatedAt:0 , createdAt:0, __v:0 , status: 0 , category: 0 })
      .select({ updatedAt:0 , createdAt:0, __v:0 } );
      const results = filter(product, (item)=>{
      return item.category._id == id;
      });
      return { message: "product successfully fetched according to category", product: results };
  
    } catch (err) {
      return { err: err.message };
    }
  };


/********** get all product according to subCategory ****************/
exports.getSubProduct = async (id)=>{
    try {
      const product =await Product.find()
      .populate( 'category',{ updatedAt:0 , createdAt:0, __v:0 , status: 0 })
      .populate( 'subCategory',{ updatedAt:0 , createdAt:0, __v:0 , status: 0 , category: 0 })
      .select({ updatedAt:0 , createdAt:0, __v:0 } );
      const results = filter(product, (item)=>{
      return item.subCategory._id == id;
      });
      return { message: "product successfully fetched according to subCategory", product: results };
  
    } catch (err) {
      return { err: err.message };
    }
  };




/********** get subCategory according to category ****************/
exports.getSubCategory = async (id)=>{
    try {
      const subCategory =await SubCategory.find()
      .populate( 'category',{ updatedAt:0 , createdAt:0, __v:0 , status: 0 })
      .select({ updatedAt:0 , createdAt:0, __v:0 } );
      const results = filter(subCategory, (item)=>{
      return item.category._id == id;
      });
      return { message: "subCategory successfully fetched according to category", product: results };
  
    } catch (err) {
      return { err: err.message };
    }
  };
