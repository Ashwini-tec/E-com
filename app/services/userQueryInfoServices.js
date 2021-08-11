const UserQuery = require("../models/UserQueryInfo");

/********** user Query info ****************/
exports.userQueryInfo = async (data)=>{
  try {
    const queryData = {
        name: data.name,
        productId: data.productId,
        productName: data.productName,
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
      const queryInfo =await UserQuery.find().populate('productId', ['name']).select({ productName: 0 });
      return { message: "queryInfo successfully fetched", queryInfo: queryInfo };
  
    } catch (err) {
      return { err: err.message };
    }
};
