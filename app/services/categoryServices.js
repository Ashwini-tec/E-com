
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
      const category =await Category.find();
      return { message: "category successfully fetched", category: category };
  
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