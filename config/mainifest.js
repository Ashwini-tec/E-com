const config = require("./config");
const Confidence = require('confidence');
require('dotenv').config();
const Pack = require('../package.json');

let internals ={
    criteria: {
        env:  'development'
    }
};


internals.manifest = {
    server : {
        host : process.env.HOST,
        port : process.env.PORT,
        routes: {
            cors: {
                origin: ['*'],
                additionalHeaders: ['headers']
            }
        } 
    },
    register: {
        plugins : [
            {
                plugin: '@hapi/inert'
            },
            {
                plugin: '@hapi/vision'
            },
            // Swagger support 
            {
                plugin: 'hapi-swagger',
                options: {
                        info: {
                            title: 'Test API Documentation',
                            version: Pack.version,
                        },
                        host:process.env.SWAGGER_HOST,  //'localhost:8000',//process.env.SWAGGER_HOST,
                        securityDefinitions: {
                            'jwt': {
                                'type': 'apiKey',
                                'name': 'Authorization',
                                'in': 'header'
                            }
    
                        },
                        security: [{ 'jwt': [] }]
                    }
            },
            {
                plugin: 'hapi-auth-jwt2'
            },

            /*******  mongoose plugin register **************/
            {
                plugin : '../lib/mongoose',
                options : {
                    config : config.get('/mongoose')
                }
            },

            /******* register APIs ********/
            {
                plugin : "../app/routes/v1/userRoutes"
            },
            {
                plugin : "../app/routes/v1/loginRoutes"
            },
            {
                plugin : "../app/routes/v1/categoryRoutes"
            },
            {
                plugin : "../app/routes/v1/productRoutes"
            },
            {
                plugin : "../app/routes/v1/subCategoryRoutes"
            },
            {
                plugin : "../app/routes/v1/filterRoutes"
            },
        ]
    }
};


internals.store = new Confidence.Store(internals.manifest);

exports.get = (key) =>{
    console.log("key",key,"internals.criteria :",internals.criteria);
    return internals.store.get(key, internals.criteria);
};