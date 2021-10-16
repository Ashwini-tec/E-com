const UserQuery = require("../models/UserQueryInfo");
const ContactUs = require("../models/ContactUs");

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


/********** edit query ****************/
exports.editQueryStatus = async ( id ,data)=>{
  try {
    const queryInfo =await UserQuery.findByIdAndUpdate({ _id : id }, data ,{ new : true });
    if(!queryInfo){ return { message : "error in updation please check the detail" , queryInfo: null }}
    return { message: "query status successfully updated", queryInfo: queryInfo };

  } catch (err) {
    return { err: err.message };
  }
};



/********** delete query ****************/
exports.deleteQuery = async ( id )=>{
  try {
    const queryInfo =await UserQuery.findOneAndDelete({ _id : id });
    if(!queryInfo){ return { message : "error on delete please check the detail" , queryInfo: null }}
    return { message: "query status successfully deleted", queryInfo: queryInfo };

  } catch (err) {
    return { err: err.message };
  }
};


/********** user contact us info ****************/
exports.contactMail = async (data)=>{
  try {
    const queryData = {
        name: data.name,
        email: data.email,
        mobile: data.mobile,
        subject: data.subject,
        message: data.message
    };

    const queryInfo =await ContactUs.create(queryData);
    return { message: "contact us detail saved successfully", queryData: queryInfo };

  } catch (err) {
    return { err: err.message };
  }
};


/********** show all user contact detail ****************/
exports.getAllContactDetail = async ()=>{
  try {
    const queryInfo =await ContactUs.find();
    return { message: "contact us detail  successfully fetched", queryInfo: queryInfo };

  } catch (err) {
    return { err: err.message };
  }
};


/********** delete constct us detail ****************/
exports.deleteContactUsDeatil = async ( id )=>{
  try {
    const queryInfo =await ContactUs.findOneAndDelete({ _id : id });
    if(!queryInfo){ return { message : "error on delete please check the detail" , queryInfo: null }}
    return { message: "contact us detail  successfully deleted", queryInfo: queryInfo };

  } catch (err) {
    return { err: err.message };
  }
};
