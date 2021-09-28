const Review = require("../models/Review");

/**********review product ****************/
exports.reviewProduct = async (data)=>{
  try {
    const reviewData = {
        name: data.name,
        email: data.email,
        message: data.message,
        productId: data.productId
    };

    const review =await Review.create(reviewData);
    return { message: "review created successfully", review: review };

  } catch (err) {
    return { err: err.message };
  }
};



/********** show all review ****************/
exports.getAllReview = async ()=>{
    try {
      const review =await Review.find({ verified: true }).populate('productId',['name']);
      return { message: "review successfully fetched", review: review };
  
    } catch (err) {
      return { err: err.message };
    }
  };


/********** show all review for verify ****************/
exports.getAllReviewVerify = async ()=>{
    try {
      const review =await Review.find({ verified: false }).populate('productId',['name']);
      return { message: "review successfully fetched", review: review };
  
    } catch (err) {
      return { err: err.message };
    }
  };

  
/********** show single review ****************/
exports.getReview = async (id)=>{
    try {
      const review =await Review.findOne({ _id : id }).populate("productId",{ name : 1 });
      if(!review){ return { message : "review product detail not found" , review: null }}
      return { message: "category successfully fetched", review: review };
  
    } catch (err) {
      return { err: err.message };
    }
  };
  


/********** delete review  ****************/
exports.deleteReview = async ( id )=>{
    try {
      const review =await Review.findOneAndDelete({ _id: id });
      if(!review){ return { message : "error in delete please check the detail" , review: null }}
      return { message: "review successfully deleted", review: review };
  
    } catch (err) {
      return { err: err.message };
    }
  };
  

  
/********** edit review ****************/
exports.editReview = async ( id ,data)=>{
    try {
      const review =await Review.findByIdAndUpdate({ _id : id }, data ,{ new : true });
      if(!review){ return { message : "error in verify please check the detail" , review: null }}
      return { message: "review successfully updated", review: review };
  
    } catch (err) {
      return { err: err.message };
    }
  };