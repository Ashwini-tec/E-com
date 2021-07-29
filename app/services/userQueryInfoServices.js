const UserQuery = require("../models/userQueryInfo");

/********** user Query info ****************/
exports.userQueryInfo = async (data)=>{
  try {
    const queryData = {
        name: data.name,
        productId: data.productId,
        email: data.email,
        contact: data.contact,
        message: data.message
    };

    const queryInfo =await UserQuery.create(queryData);
    return { message: "query created successfully", queryData: queryInfo };

  } catch (err) {
    return { err: err.message };
  }
};



/********** show all user query ****************/
exports.getAllQuery = async ()=>{
    try {
      const queryInfo =await UserQuery.find().populate('productId', ['name']);
      return { message: "queryInfo successfully fetched", queryInfo: queryInfo };
  
    } catch (err) {
      return { err: err.message };
    }
};
