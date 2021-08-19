const SubCategory = require("../models/SubCategory");
const filter = require("lodash.filter");

/********** create SubCategory ****************/
exports.createSubCategory = async (data)=>{
  try {
    const valid = await isAlreadyExist( data.subCategory , data.category );
    if(valid){ return { message : "subCategory already exist in this category" , subCategory : null }};

    const subCategory = {
        subCategory: data.subCategory,
        category: data.category,
        createdBy: data.user
    };

    const subCat =await SubCategory.create(subCategory);
    return { message: "subCategory created successfully", subCategory: subCat };

  } catch (err) {
    return { err: err.message };
  }
};


/********** show all subCategory ****************/
exports.getAllSubCategory = async ()=>{
    try {
      const subCategory =await SubCategory.find({ status : true })
      .populate('category',['name'])
      .populate("createdBy",['name']);
      return { message: "subCategory successfully fetched", subCategory: subCategory };
  
    } catch (err) {
      return { err: err.message };
    }
  };


  
/********** show single subCategory ****************/
exports.getSubCategory = async (id)=>{
  try {
    const subCategory =await SubCategory.findOne({_id : id })
    .populate('category',['name'])
    .populate("createdBy",['name']);
    if(!subCategory){ return { message: "not found check the detail", subCategory: null }}
    return { message: "subCategory successfully fetched", subCategory: subCategory };

  } catch (err) {
    return { err: err.message };
  }
};


/********** edit subCategory ****************/
exports.editSubCategory = async ( id ,data)=>{
  try {
    const valid = await isAlreadyExist( data.subCategory, data.category );
    if(valid){ return { message : "subCategory already exist in this category" , subCategory : null }};
    const subCategory =await SubCategory.findByIdAndUpdate({ _id : id }, data ,{ new : true });
    if(!subCategory){ return { message : "error in updation please check the detail" , subCategory: null }}
    return { message: "subCategory successfully updated", subCategory: subCategory };

  } catch (err) {
    return { err: err.message };
  }
};



/********** delete subCategory ****************/
exports.deleteSubCategory = async ( id )=>{
  try {
    const subCategory =await SubCategory.findByIdAndUpdate({ _id : id },{ status: false },{ new : true });
    if(!subCategory){ return { message : "error in delete please check the detail" , subCategory: null }}
    return { message: "category successfully deleted", subCategory: subCategory };

  } catch (err) {
    return { err: err.message };
  }
};





// check subCategory already exist or not 

const isAlreadyExist = async( name , category )=>{
  try {
    const data = await SubCategory.find({ subCategory : name });
    if(data == ""){ return false }
    const result = filter(data ,(item)=>{
      return item.category == category;
    });

    if(result == "")
      return false;
    else
    return true;

  } catch (err) {
    return { err: err.message };
  }
}



/********** admin view show all subCategory ****************/
exports.adminView = async ()=>{
  try {
    const subCategory =await SubCategory.find()
    .populate('category',['name'])
    .populate("createdBy",['name']);
    return { message: "subCategory successfully fetched", subCategory: subCategory };

  } catch (err) {
    return { err: err.message };
  }
};
