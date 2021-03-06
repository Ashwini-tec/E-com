const mongoose = require("mongoose");

exports.plugin = {
    register : (plugin , options ) =>{
        try {
            const url = options.config.production.uri;

            mongoose.connect(url,{ useNewUrlParser: true,  useUnifiedTopology: true , useCreateIndex: true, useFindAndModify: false 
            }).then(()=>console.log("DataBase is Connected"))
            .catch((err)=> console.log("error occured inside mongoose.js",err.message))

        } catch (error) {
            console.log("connection error occured inside mongoose.js: ", error.message);
        }
    },
    pkg : require("../package.json"),
    name : "mongoose"
}
