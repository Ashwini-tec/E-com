
const Product = require("../models/Product");

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
        subCategory : data.subCategory
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
      .populate( 'category',{ updatedAt:0 , createdAt:0, __v:0 , status: 0 })
      .populate( 'subCategory',{ category:0, updatedAt:0 , createdAt:0, __v:0 , status: 0 })
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
    .populate( 'category',{ updatedAt:0 , createdAt:0, __v:0 , status: 0 })
    .populate( 'subCategory',{ category:0, updatedAt:0 , createdAt:0, __v:0 , status: 0 })
    .select({ updatedAt:0 , createdAt:0, __v:0 } );
    if(!product){ return { message: "product not found check the detail", product: null }}
    return { message: "product successfully fetched", product: product };

  } catch (err) {
    return { err: err.message };
  }
};




/********** edit product ****************/
exports.editProduct = async ( id ,data )=>{
  try {
    const valid = await isAlreadyExist(data.name);
    if(valid){ return { message : "product already exist" ,product : null }};

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
    return { message: "category successfully deleted", product: product };

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