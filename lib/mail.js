const nodemailer = require('nodemailer');

exports.plugin = {
    register: (plugin, options) => {

/**********************************//* send query to admin via mail *//*****************************/

        exports.sendMail= async(detail)=> {
            return new Promise(async (resolve,reject)=>{
                const email= detail.email;
                const name= detail.name;
                const product= detail.productId;
                const productName = detail.productName;
                const contact = detail.contact;
                const query = detail.message;
        
                // Create a SMTP transporter object
                let transporter = nodemailer.createTransport({
                    service: options.service,
                    host: options.host,
                    port: options.port,
                    secure: false,
                    auth: {
                        user: options.email,
                        pass: options.password
                    }
                });

                // Message object
                let message = {
                    from: `NeonaCreations<${options.email}>`,
                    to: `${options.adminEmail}`,
                    subject: ` ${name} send query`,
                    html: `<h2>${query}</h2><br>
                            <p><b>Name : ${name} <br>
                            query about the product :id: ${product} , name: ${productName}<br>
                            Contact Number : ${contact}<br> 
                            Email: ${email}</b></p>`
                };
            
                await transporter.sendMail(message, (err, info) => {
                    if (err) {
                        console.log('Error occurred. ' + err.message);
                        return resolve({
                            sent: false,
                            message: err.message
                        });
                    }
            
                    console.log('Message sent: %s', info.messageId);
                    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                    return resolve({
                        sent: true,
                        message: "Query generated"
                    });
                });
            });
        };


        /**********************************//* contact via mail *//*****************************/

        exports.contactMail= async(detail)=> {
            return new Promise(async (resolve,reject)=>{
                const email= detail.email;
                const name= detail.name;
                const query = detail.message;
                const subject = detail.subject;
                const mobile = detail.mobile;
        
                // Create a SMTP transporter object
                let transporter = nodemailer.createTransport({
                    service: options.service,
                    host: options.host,
                    port: options.port,
                    secure: false,
                    auth: {
                        user: options.email,
                        pass: options.password
                    }
                });

                // Message object
                let message = {
                    from: `NeonaCreations<${options.email}>`,
                    to: `${options.adminEmail}`,
                    subject: `${subject}`,
                    html: `<h2>${query}</h2><br>
                            <p><b>Name : ${name} <br>
                            Email: ${email}<br>
                            Mobile: ${mobile}</b></p>`
                };
            
                await transporter.sendMail(message, (err, info) => {
                    if (err) {
                        console.log('Error occurred. ' + err.message);
                        return resolve({
                            sent: false,
                            message: err.message
                        });
                    }
                    console.log('Message sent: %s', info.messageId);
                    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                    return resolve({
                        sent: true,
                        message: `mail send suessfully ${info.messageId}`
                    });
                });
            });
        };
     

    },
    pkg: require('../package.json'),
    name: 'email'
};

