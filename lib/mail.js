const nodemailer = require('nodemailer');

exports.plugin = {
    register: (plugin, options) => {

/**********************************//* send query to admin via mail *//*****************************/

        exports.sendMail= async(detail)=> {
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
                from: `Learts<${options.email}>`,
                to: `${options.adminEmail}`,
                subject: ` ${name} send his query`,
                html: `<h2>${query}</h2><br>
                        <p><b>Name : ${name} <br>
                        query about the product :id: ${product} , name: ${productName}<br>
                        Contact Number : ${contact}<br> 
                        Email: ${email}</b></p>`
            };
        
            await transporter.sendMail(message, (err, info) => {
                if (err) {
                    console.log('Error occurred. ' + err.message);
                    return process.exit(1);
                }
        
                console.log('Message sent: %s', info.messageId);
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            });
        };


        /**********************************//* contact via mail *//*****************************/

        exports.contactMail= async(detail)=> {
            const email= detail.email;
            const name= detail.name;
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
                from: `Learts<${options.email}>`,
                to: `${options.adminEmail}`,
                subject: `${name} send his query`,
                html: `<h2>${query}</h2><br>
                        <p><b>Name : ${name} <br>
                        Email: ${email}</b></p>`
            };
        
            await transporter.sendMail(message, (err, info) => {
                if (err) {
                    console.log('Error occurred. ' + err.message);
                    return process.exit(1);
                }
                console.log('Message sent: %s', info.messageId);
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            });
        };


    },
    pkg: require('../package.json'),
    name: 'email'
};

