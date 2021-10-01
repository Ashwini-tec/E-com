const Product = require("../models/Product");
const SubCategory = require("../models/SubCategory");
const Review = require("../models/Review");


/********** get all product according to category ****************/
exports.getCatProduct = async (id)=>{
    try {
      const product =await Product.find({ $and: [
        { category: id },
        { status: true  }
      ]})
      .populate( 'category',{ updatedAt:0 , createdAt:0, __v:0 , status: 0 })
      .populate( 'subCategory',{ updatedAt:0 , createdAt:0, __v:0 , status: 0 , category: 0 })
      .select({ updatedAt:0 , createdAt:0, __v:0 } );

      if(!product){ return { message: "data not found" }}
      return { message: "product successfully fetched according to category", product: product };
  
    } catch (err) {
      return { err: err.message };
    }
  };


/********** get all product according to subCategory ****************/
exports.getSubProduct = async (id)=>{
    try {
      const product =await Product.find({ $and: [
        { subCategory: id  },
        { status: true  }
      ]})
      .populate( 'category',{ updatedAt:0 , createdAt:0, __v:0 , status: 0 })
      .populate( 'subCategory',{ updatedAt:0 , createdAt:0, __v:0 , status: 0 , category: 0 })
      .select({ updatedAt:0 , createdAt:0, __v:0 } );

      if(!product){ return { message: "data not found" }}
      return { message: "product successfully fetched according to subCategory", product: product };
  
    } catch (err) {
      return { err: err.message };
    }
  };




/********** get subCategory according to category ****************/
exports.getSubCategory = async (id)=>{
    try {
      const subCategory =await SubCategory.find({  $and: [
        { category: id  },
        { status: true  }
      ]})
      .populate( 'category',{ updatedAt:0 , createdAt:0, __v:0 , status: 0 })
      .select({ updatedAt:0 , createdAt:0, __v:0 } );

      if(!subCategory){ return { message: "data not found" }}
      return { message: "subCategory successfully fetched according to category", product: subCategory };
  
    } catch (err) {
      return { err: err.message };
    }
  };

  
/********** get product according to typeProduct ****************/
exports.typeProductAndCategory = async (id , catid)=>{
  try {
    const typeProduct =await Product.find({ $and: [
      { category: catid },
      { typeProduct: id },
      { status: true  }
    ]})
    .populate( 'category',['name'])
    .populate( 'subCategory',['subCategory'])
    .populate('createdBy',['name'])
    .select({ updatedAt:0 , createdAt:0, __v:0 } );

    if(!typeProduct){ return { message: "data not found" }}
    return { message: "product successfully fetched according to typeProduct", typeProduct: typeProduct };

  } catch (err) {
    return { err: err.message };
  }
};

 
/********** get product according to typeProduct ****************/
exports.typeProduct = async (id)=>{
  try {
    const typeProduct =await Product.find({ $and: [
      { typeProduct: id },
      { status: true  }
    ]})
    .populate( 'category',['name'])
    .populate( 'subCategory',['subCategory'])
    .populate('createdBy',['name'])
    .select({ updatedAt:0 , createdAt:0, __v:0 } );

    if(!typeProduct){ return { message: "data not found" }}
    return { message: "product successfully fetched according to typeProduct", typeProduct: typeProduct };

  } catch (err) {
    return { err: err.message };
  }
};



/********** get review according to product ****************/
exports.reviewOfProduct = async (id)=>{
  try {
    const review =await Review.find({ $and: [
      { productId: id },
      { verified: true  }
    ]})
    .populate( 'productId',['name'])
    .select({ updatedAt:0 , createdAt:0, __v:0 } );

    if(!review){ return { message: "data not found" }}
    return { message: "review successfully fetched according to product", review: review };

  } catch (err) {
    return { err: err.message };
  }
};
