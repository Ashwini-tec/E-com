const Category = require("../models/Category");

/********** create category ****************/
exports.createCategory = async (data)=>{
  try {
    const valid = await isAlreadyExist(data.name);
    if(valid){ return { message : "category already exist" ,category : null }};

    const categoryData = {
        name: data.name,
    };

    const category =await Category.create(categoryData);
    return { message: "category created successfully", category: category };

  } catch (err) {
    return { err: err.message };
  }
};


/********** show all category ****************/
exports.getAllCategory = async ()=>{
    try {
      const category =await Category.find({ status: true });
      return { message: "category successfully fetched", category: category };
  
    } catch (err) {
      return { err: err.message };
    }
  };


/********** show single category ****************/
exports.getCategory = async (id)=>{
  try {
    const category =await Category.findOne({ _id : id });
    if(!category){ return { message : "category not found please check the detail" , category: null }}
    return { message: "category successfully fetched", category: category };

  } catch (err) {
    return { err: err.message };
  }
};


/********** edit category ****************/
exports.editCategory = async ( id ,data)=>{
  try {
    const category =await Category.findByIdAndUpdate({ _id : id }, data ,{ new : true });
    if(!category){ return { message : "error in updation please check the detail" , category: null }}
    return { message: "category successfully updated", category: category };

  } catch (err) {
    return { err: err.message };
  }
};


/********** delete category ****************/
exports.deleteCategory = async ( id )=>{
  try {
    const category =await Category.findByIdAndUpdate({ _id : id },{ status: false },{ new : true });
    if(!category){ return { message : "error in delete please check the detail" , category: null }}
    return { message: "category successfully deleted", category: category };

  } catch (err) {
    return { err: err.message };
  }
};



// check category already exist or not 

const isAlreadyExist = async(name)=>{
  try {
    const data = await Category.findOne({ name : name });
    if(data) return true ;
    else return false ;

  } catch (err) {
    return { err: err.message };
  }
}