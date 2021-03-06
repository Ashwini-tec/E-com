const Category = require("../models/Category");

/********** create category ****************/
exports.createCategory = async (data)=>{
  try {
    const valid = await isAlreadyExist(data.name);
    if(valid){ return { message : "category already exist" ,category : null }};

    const categoryData = {
        name: data.name,
        description: data.description,
        image: data.image,
        createdBy: data.user
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
      const category =await Category.find({ status: true }).populate('createdBy',['name']);
      return { message: "category successfully fetched", category: category };
  
    } catch (err) {
      return { err: err.message };
    }
  };


/********** show single category ****************/
exports.getCategory = async (id)=>{
  try {
    const category =await Category.findOne({ _id : id }).populate("createdBy",{ name : 1 });
    if(!category){ return { message : "category not found" , category: null }}
    return { message: "category successfully fetched", category: category };

  } catch (err) {
    return { err: err.message };
  }
};


/********** edit category ****************/
exports.editCategory = async ( id ,data)=>{
  try {
    const valid = await isAlreadyExistForId(data.name, id);
    if(valid){ return { message : "category already exist" ,category : null }};

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



/********************** check data is already exist or not while editing ****************/
const isAlreadyExistForId = async(name , id )=>{
  try {
    const data = await Category.findOne({ $and: [
      { _id: id },
      { name : name }
    ]});

    if(data){
      return false;
    }else
    {
      const check = await isAlreadyExist(name);
      if(check) return true 
      else return false 
    }
  } catch (err) {
    return { err: err.message };
  }
}



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


/******************** admin view to get all the category ***********************/
exports.adminView = async ()=>{
  try {
    const category =await Category.find({ status: false }).populate('createdBy',['name']);
    return { message: "deactivated category successfully fetched", category: category };

  } catch (err) {
    return { err: err.message };
  }
};



/********** activate Category ****************/
exports.activateCategory = async ( id )=>{
  try {
    const category =await Category.findByIdAndUpdate({ _id : id }, { status: true } ,{ new : true });
    if(!category){ return { message : "error in updation please check the detail" , category: null }}
    return { message: "category activated successfully", category: category };

  } catch (err) {
    return { err: err.message };
  }
};
