
const Product = require("../models/Product");
const Category = require("../models/Category");

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
        subCategory : data.subCategory,
        createdBy : data.user,
        sku: data.sku ,
        tags:  data.tags,
        color: data.color ,
        description: data.description ,
        typeProduct:  data.typeProduct ,
        bannerImage:  data.bannerImage 
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
      const product =await Product.find({ status: true })
      .populate( 'category',['name'])
      .populate( 'subCategory',['subCategory'])
      .populate('createdBy',['name'])
      .select({ updatedAt:0 , createdAt:0, __v:0 } );
      return { message: "product successfully fetched", product: product };
  
    } catch (err) {
      return { err: err.message };
    }
  };



/********** show single product ****************/
exports.getProduct = async (id)=>{
  try {
    const product =await Product.findOne({ _id: id })
    .populate( 'category',['name'])
    .populate( 'subCategory',['subCategory'])
    .populate('createdBy',['name'])
    .select({ updatedAt:0 , createdAt:0, __v:0 } );
    if(!product){ return { message: "product not found", product: null }}

    if(!product.description){ 
      const categoryId = product.category;
      const categoryData = await Category.findOne({ _id: categoryId });
      product.description = categoryData.description; 
    }

    return { message: "product successfully fetched", product: product };

  } catch (err) {
    return { err: err.message };
  }
};




/********** edit product ****************/
exports.editProduct = async ( id ,data )=>{
  try {

    const product =await Product.findByIdAndUpdate({ _id : id }, data ,{ new : true });
    if(!product){ return { message : "error in updation please check the detail" , product: null }}
    return { message: "product successfully updated", product: product };

  } catch (err) {
    return { err: err.message };
  }
};


/********** delete product ****************/
exports.deleteProduct = async ( id )=>{
  try {
    const product =await Product.findByIdAndUpdate({ _id : id },{ status: false },{ new : true });
    if(!product){ return { message : "error in delete please check the detail" , product: null }}
    return { message: "product successfully deleted", product: product };

  } catch (err) {
    return { err: err.message };
  }
};




/********** set visibility of the price ****************/
exports.setVisibility = async ( data )=>{
  try {
    const product =await Product.updateMany({ priceFlag: data.priceFlag });
    if(!product){ return { message : "error in updation please check the detail" , product: null }}
    return { message: "priceFlag successfully updated", product: product };

  } catch (err) {
    return { err: err.message };
  }
};




/**********  featured product ****************/
exports.isFeaturedProduct = async ( id ,data )=>{
  try {

    const product =await Product.findByIdAndUpdate({ _id : id }, data ,{ new : true });
    if(!product){ return { message : "error in updation please check the detail" , product: null }}
    return { message: "product successfully updated", product: product };

  } catch (err) {
    return { err: err.message };
  }
};



/********** show all product ****************/
exports.getFeaturedProduct = async ()=>{
  try {
    const product =await Product.find({ $and: [
      { isFeatured : true },
      { status: true  }
  ]})
    .populate( 'category',['name'])
    .populate( 'subCategory',['subCategory'])
    .populate('createdBy',['name'])
    .select({ updatedAt:0 , createdAt:0, __v:0 } );
    return { message: "product successfully fetched", product: product };

  } catch (err) {
    return { err: err.message };
  }
};


// check category already exist or not 

const isAlreadyExist = async(name)=>{
  try {
    const data = await Product.findOne({ $and: [
      { name : name },
      { status: true  }
  ]});
    if(data) return true ;
    else return false ;

  } catch (err) {
    return { err: err.message };
  }
}



/********** admin view show all product ****************/
exports.adminView = async ()=>{
  try {
    const product =await Product.find()
    .populate( 'category',['name'])
    .populate( 'subCategory',['subCategory'])
    .populate('createdBy',['name'])
    .select({ updatedAt:0 , createdAt:0, __v:0 } );
    return { message: "product successfully fetched", product: product };

  } catch (err) {
    return { err: err.message };
  }
};


/********** delete product admin view and delete ****************/
exports.deleteProductPermanent = async ( id )=>{
  try {
    const product =await Product.findByIdAndDelete({ _id : id });
    if(!product){ return { message : "error in delete please check the detail" , product: null }}
    return { message: "product successfully deleted", product: product };

  } catch (err) {
    return { err: err.message };
  }
};


