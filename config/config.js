const Confidence = require('confidence');
require('dotenv').config();

let internals ={
    criteria : {
        env : "development"
    }
}

internals.config = {
    mongoose : {
        production :{
            uri : process.env.MONGO_URL
        }
    },
    jwtAuthOptions: {
        key: process.env.JWT_SECRET_KEY,
        algorithm: 'HS256'
    },
    email: {
        host : process.env.MAIL_HOST,
        port : process.env.MAIL_PORT,
        email: process.env.GMAIL_ID,
        adminEmail: process.env.ADMIN_GMAIL_ID,
        password: process.env.GMAIL_PASSWORD,
        service : process.env.SERVICE
    },
}

// console.log(process.env.JWT_SECRET_KEY)
internals.store = new Confidence.Store(internals.config);

exports.get = (key) =>{
    return internals.store.get(key, internals.criteria);
};
