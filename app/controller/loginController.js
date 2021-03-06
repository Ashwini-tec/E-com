require('dotenv').config();
const jwt = require("jsonwebtoken");
const services = require("../services/loginServices");
const Joi = require('joi');


/******************* user login *****************/
exports.login = {
    description : "login user",
    validate: {
      payload : Joi.object({
        email :  Joi.string().email().required(),
        password: Joi.string().min(5).required(),
      }),
      failAction: (request, h, error) => {
          return h.response({ message: error.details[0].message.replace(/['"]+/g, '') }).code(400).takeover();
        }
      },
    handler :async(req ,h)=>{
    try {
      const user = req.payload;
      const data = await services.loginUser(user);
      if(data.err){ return h.response({ message : data.err }).code(400)};
      if(!data.user){ return h.response({ data : data }).code(400)}
      const role = data.user.role;
      const id = data.user._id; 
      let jwtToken = jwt.sign( { id , role } , `${process.env.JWT_SECRET_KEY}`, { expiresIn: '1 day' });
      return h.response({ data: data , token: jwtToken }).code(200);
    } catch (error) {
      return h.response( error.message ).code(500);
    }
  },
  tags: ['api'] //swagger documentation
  }
  