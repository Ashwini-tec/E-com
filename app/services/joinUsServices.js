const JoinUsDetail = require("../models/JoinUsDetail");

/********** create join detail ****************/
exports.joinUsDetail = async (data)=>{
  try {
   
    const joinData = {
        name: data.name,
        email : data.email
    };

    const detail =await JoinUsDetail.create(joinData);
    return { message: "data created successfully", detail: detail };

  } catch (err) {
    return { err: err.message };
  }
};


/********** show all join us detail ****************/
exports.joinUsDetailFetchAll = async ()=>{
    try {
      const detail =await JoinUsDetail.find();
      return { message: "data successfully fetched", detail: detail };
  
    } catch (err) {
      return { err: err.message };
    }
  };


/********** delete join us detail ****************/
exports.deleteJoinUsDeatil = async ( id )=>{
    try {
      const detail =await JoinUsDetail.findOneAndDelete({_id : id });
      if(!detail){ return { message : "error in delete please check the detail" , detail: null }}
      return { message: "data successfully deleted", detail: detail };
  
    } catch (err) {
      return { err: err.message };
    }
  };
  