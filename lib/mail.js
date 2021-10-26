const nodemailer = require('nodemailer');

exports.plugin = {
    register: (plugin, options) => {

/**********************************//* send query to admin via mail *//*****************************/

        exports.sendMail= async(detail)=> {
            return new Promise(async (resolve,reject)=>{
                const email= detail.email;
                const name= detail.name;
                const productName = detail.productName;
                const contact = detail.contact;
                const query = detail.message;
                const productImage = detail.productImage;
        
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
                    subject: `Query Generated`,
                    html: `<table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tbody>
                      <tr>
                        <td width="100%">
                          <div style="max-width:600px;Margin:0 auto">
                            <table
                              align="center"
                              cellpadding="0"
                              cellspacing="0"
                              style="border-spacing:0;font-family:gt-eesti,ArialMT,Helvetica,Arial,sans-serif;Margin:0 auto;padding:24px;width:100%;max-width:500px"
                            >
                              <tbody>
                              <tr>
                              <td>
                                <table style="margin-bottom:40px;width:100%" width="100%">
                                  <tbody>
                                    <tr>
                                      <td>
                                        <a
                                          href="#"
                                          style="font-family:Helvetica,Arial,sans-serif;color:#0086bf"
                                          target="_blank"
                                        >
                                          <img
                                            src="https://megazone.nyc3.digitaloceanspaces.com/thumbnail/megazone/neona_logopCkZQ5GJcU.png"
                                            style="display:block;margin: auto;"
                                            alt="NeonaCreations"
                                            height="auto"
                                          />
                                        </a>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                                <tr>
                                  <td style="text-align:justify;word-break:break-word">
                                    <table style="margin-bottom:20px;width:100%" width="100%">
                                      <tbody>
                                        <tr>
                                          <td>
                                            <table style="width:100%;margin-bottom:20px" width="100%" cellpadding="0" cellspacing="0">
                                              <tbody>
                                                <tr>
                                                  <td>
                                                  <h1
                                                  style="font-size:26px;line-height:30px;color:#054752;word-break:normal;text-align: center;"
                                                >
                                                Welcome to NeonaCreations 
                                                </h1>
                                                <p style="font-size:15px;line-height:5px;color:#054752;word-break:normal; text-align: center;"> Query Generated Sucessfully </p><br>
                                                    <strong style="font-family:Helvetica,Arial,sans-serif;color:#234567">Query : ${query} </strong><br><br>
                                                    <strong style="font-family:Helvetica,Arial,sans-serif;color:#234567"> ${name}, Generated Product Query </strong><br>
                                                    <strong style="font-family:Helvetica,Arial,sans-serif;color:#234567"> Generated Query About The : ${productName} </strong><br>
                                                    <strong style="font-family:Helvetica,Arial,sans-serif;color:#234567">  User Contact : ${contact} </strong><br>
                                                    <strong style="font-family:Helvetica,Arial,sans-serif;color:#234567"> User Email: ${email} </strong><br>
                                                    <p style="text-align:center">
                                                        <img
                                                          src=${productImage}
                                                          alt="productImage"
                                                          style="display:block;width:100%;height:auto;margin-left:auto;margin-right:auto;margin-bottom:10px"
                                                          height="auto"
                                                        />
                                                    </p>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td></td>
                                </tr>
                                <tr>
                                  <td>
                                    <table width="100%" style="margin-bottom:20px;width:100%">
                                      <tbody>
                                        <tr>
                                          <td width="100%">
                                            <div style="width:100%;height:1px;background-color:#ddd" color="#DDD" width="100%" ></div>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td style="text-align:center;font-size:13px">
                                    <a
                                      href="#"
                                      style="color:#00aff5"
                                      target="_blank"
                                    >
                                      Goto NeonaCreations Page
                                    </a>
                                    <span style="color:#00aff5">|</span>
                                    <a
                                      href="#"
                                      style="color:#00aff5"
                                      target="_blank"
                                    >
                                      FAQ
                                    </a>
                                  </td>
                                </tr>
                                <tr>
                                  <td style="text-align:center">
                                    <table
                                      style="max-width:100%;width:100%;text-align:center;font-family:ArialMT,Arial,sans-serif"
                                      cellspacing="0"
                                      cellpadding="0"
                                    >
                                      <tbody>
                                        <tr>
                                          <td style="text-align:center">
                                            <p
                                              style="font-size:10px;color:#708c91;text-align:center;padding:0;margin-top:10px;margin-bottom:2px"
                                            >
                                              This email was sent to you by
                                              NeonaCreations (Do not reply)
                                            </p>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>`
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
                    html: `<table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tbody>
                      <tr>
                        <td width="100%">
                          <div style="max-width:600px;Margin:0 auto">
                            <table
                              align="center"
                              cellpadding="0"
                              cellspacing="0"
                              style="border-spacing:0;font-family:gt-eesti,ArialMT,Helvetica,Arial,sans-serif;Margin:0 auto;padding:24px;width:100%;max-width:500px"
                            >
                              <tbody>
                              <tr>
                              <td>
                                <table style="margin-bottom:40px;width:100%" width="100%">
                                  <tbody>
                                    <tr>
                                      <td>
                                        <a
                                          href="#"
                                          style="font-family:Helvetica,Arial,sans-serif;color:#0086bf"
                                          target="_blank"
                                        >
                                          <img
                                            src="https://megazone.nyc3.digitaloceanspaces.com/thumbnail/megazone/neona_logopCkZQ5GJcU.png"
                                            style="display:block;margin: auto;"
                                            alt="NeonaCreations"
                                            height="auto"
                                          />
                                        </a>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                                <tr>
                                  <td style="text-align:justify;word-break:break-word">
                                    <table style="margin-bottom:20px;width:100%" width="100%">
                                      <tbody>
                                        <tr>
                                          <td>
                                            <table style="width:100%;margin-bottom:20px" width="100%" cellpadding="0" cellspacing="0">
                                            <tbody>
                                                <tr>
                                                <td>
                                                    <h1
                                                    style="font-size:26px;line-height:30px;color:#054752;word-break:normal;text-align: center;"
                                                    >
                                                    Welcome to NeonaCreations 
                                                    </h1>
                                                    <p style="font-size:15px;line-height:5px;color:#054752;word-break:normal; text-align: center;">Contact Us Query Generated </p><br>
                                                    <strong style="font-family:Helvetica,Arial,sans-serif;color:#234567">Query : ${query} </strong><br><br>
                                                    <strong style="font-family:Helvetica,Arial,sans-serif;color:#234567"> User Name : ${name} </strong><br>
                                                    <strong style="font-family:Helvetica,Arial,sans-serif;color:#234567">  User Contact : ${mobile} </strong><br>
                                                    <strong style="font-family:Helvetica,Arial,sans-serif;color:#234567"> User Email: ${email} </strong><br>
                                                </td>
                                                </tr>
                                            </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td></td>
                                </tr>
                                <tr>
                                  <td>
                                    <table width="100%" style="margin-bottom:20px;width:100%">
                                      <tbody>
                                        <tr>
                                          <td width="100%">
                                            <div style="width:100%;height:1px;background-color:#ddd" color="#DDD" width="100%" ></div>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td style="text-align:center;font-size:13px">
                                    <a
                                      href="#"
                                      style="color:#00aff5"
                                      target="_blank"
                                    >
                                      Goto NeonaCreations Page
                                    </a>
                                    <span style="color:#00aff5">|</span>
                                    <a
                                      href="#"
                                      style="color:#00aff5"
                                      target="_blank"
                                    >
                                      FAQ
                                    </a>
                                  </td>
                                </tr>
                                <tr>
                                  <td style="text-align:center">
                                    <table
                                      style="max-width:100%;width:100%;text-align:center;font-family:ArialMT,Arial,sans-serif"
                                      cellspacing="0"
                                      cellpadding="0"
                                    >
                                      <tbody>
                                        <tr>
                                          <td style="text-align:center">
                                            <p
                                              style="font-size:10px;color:#708c91;text-align:center;padding:0;margin-top:10px;margin-bottom:2px"
                                            >
                                              This email was sent to you by
                                              NeonaCreations (Do not reply)
                                            </p>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>`
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
     




        /**********************************//* Join us mail *//*****************************/

        exports.joinUsMail= async(detail)=> {
            return new Promise(async (resolve,reject)=>{
                const email= detail.email;
                const name= detail.name;
        
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
                    subject: `Join Query for NeonaCreation`,
                    html: `<table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tbody>
                      <tr>
                        <td width="100%">
                          <div style="max-width:600px;Margin:0 auto">
                            <table
                              align="center"
                              cellpadding="0"
                              cellspacing="0"
                              style="border-spacing:0;font-family:gt-eesti,ArialMT,Helvetica,Arial,sans-serif;Margin:0 auto;padding:24px;width:100%;max-width:500px"
                            >
                              <tbody>
                                <tr>
                                  <td style="text-align:justify;word-break:break-word">
                                    <table style="margin-bottom:20px;width:100%" width="100%">
                                      <tbody>
                                      <tr>
                                      <td>
                                        <table style="margin-bottom:40px;width:100%" width="100%">
                                          <tbody>
                                            <tr>
                                              <td>
                                                <a
                                                  href="#"
                                                  style="font-family:Helvetica,Arial,sans-serif;color:#0086bf"
                                                  target="_blank"
                                                >
                                                  <img
                                                    src="https://megazone.nyc3.digitaloceanspaces.com/thumbnail/megazone/neona_logopCkZQ5GJcU.png"
                                                    style="display:block;margin: auto;"
                                                    alt="NeonaCreations"
                                                    height="auto"
                                                  />
                                                </a>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <table style="width:100%;margin-bottom:20px" width="100%" cellpadding="0" cellspacing="0">
                                            <tbody>
                                                <tr>
                                                <td>
                                                    <h1
                                                    style="font-size:26px;line-height:30px;color:#054752;word-break:normal;text-align: center;"
                                                    >
                                                    Welcome to NeonaCreations 
                                                    </h1>
                                                    <p style="font-size:15px;line-height:5px;color:#054752;word-break:normal; text-align: center;">Joining Query Generated</p><br>
                                                    <strong style="font-family:Helvetica,Arial,sans-serif;color:#234567"> ${name} ,Wants To Join Neona Creation</strong><br>
                                                    <strong style="font-family:Helvetica,Arial,sans-serif;color:#234567"> User Email: ${email} </strong><br>
                                                </td>
                                                </tr>
                                            </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td></td>
                                </tr>
                                <tr>
                                  <td>
                                    <table width="100%" style="margin-bottom:20px;width:100%">
                                      <tbody>
                                        <tr>
                                          <td width="100%">
                                            <div style="width:100%;height:1px;background-color:#ddd" color="#DDD" width="100%" ></div>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td style="text-align:center;font-size:13px">
                                    <a
                                      href="#"
                                      style="color:#00aff5"
                                      target="_blank"
                                    >
                                      Goto NeonaCreations Page
                                    </a>
                                    <span style="color:#00aff5">|</span>
                                    <a
                                      href="#"
                                      style="color:#00aff5"
                                      target="_blank"
                                    >
                                      FAQ
                                    </a>
                                  </td>
                                </tr>
                                <tr>
                                  <td style="text-align:center">
                                    <table
                                      style="max-width:100%;width:100%;text-align:center;font-family:ArialMT,Arial,sans-serif"
                                      cellspacing="0"
                                      cellpadding="0"
                                    >
                                      <tbody>
                                        <tr>
                                          <td style="text-align:center">
                                            <p
                                              style="font-size:10px;color:#708c91;text-align:center;padding:0;margin-top:10px;margin-bottom:2px"
                                            >
                                              This email was sent to you by
                                              NeonaCreations (Do not reply)
                                            </p>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>`
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
     

        
        /**********************************//* user confirmation mail *//*****************************/

        exports.userConfirmationMail= async(detail)=> {
            return new Promise(async (resolve,reject)=>{
                const email= detail.email;
                const wellcomeMessage= detail.wellcomeMessage;
                const subject= detail.subject;
        
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
                    to: `${email}`,
                    subject: `Confirmation Mail By NeonaCreation`,
                    html: `<table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tbody>
                      <tr>
                        <td width="100%">
                          <div style="max-width:600px;Margin:0 auto">
                            <table
                              align="center"
                              cellpadding="0"
                              cellspacing="0"
                              style="border-spacing:0;font-family:gt-eesti,ArialMT,Helvetica,Arial,sans-serif;Margin:0 auto;padding:24px;width:100%;max-width:500px"
                            >
                              <tbody>
                              <tr>
                              <td>
                                <table style="margin-bottom:40px;width:100%" width="100%">
                                  <tbody>
                                    <tr>
                                      <td>
                                        <a
                                          href="#"
                                          style="font-family:Helvetica,Arial,sans-serif;color:#0086bf"
                                          target="_blank"
                                        >
                                          <img
                                            src="https://megazone.nyc3.digitaloceanspaces.com/thumbnail/megazone/neona_logopCkZQ5GJcU.png"
                                            style="display:block;margin: auto;"
                                            alt="NeonaCreations"
                                            height="auto"
                                          />
                                        </a>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                                <tr>
                                  <td style="text-align:justify;word-break:break-word">
                                    <table style="margin-bottom:20px;width:100%" width="100%">
                                      <tbody>
                                        <tr>
                                          <td>
                                            <table style="width:100%;margin-bottom:20px" width="100%" cellpadding="0" cellspacing="0">
                                            <tbody>
                                                <tr>
                                                <td>
                                                    <h1
                                                    style="font-size:26px;line-height:30px;color:#054752;word-break:normal;text-align: center;"
                                                    >
                                                    Welcome to NeonaCreations 
                                                    </h1>
                                                    <p style="font-size:15px;line-height:20px;color:#054752;word-break:normal; text-align: center;">${wellcomeMessage}</p><br>
                                                </td>
                                                </tr>
                                                <tr>
                                                <td>
                                                <center>
                                                    <table style="background-color:#fff;margin-bottom:20px;table-layout:fixed" align="center" width="" cellspacing="0" cellpadding="0" >
                                                    <tbody>
                                                        <tr>
                                                        <td
                                                            style="background-color:#00aff5;color:#fff;text-align:center;border-radius:48px;padding:16px 24px;border-color:transparent;font-weight:bold;font-size:16px;line-height:1"
                                                        >
                                                            <a style="color: white; text-decoration: none;" href= "#"> Go To NeonaCreations Page </a>
                                                        </td>
                                                        </tr>
                                                    </tbody>
                                                    </table>
                                                </center>
                                                </td>
                                            </tr>
                                            </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td></td>
                                </tr>
                                <tr>
                                  <td>
                                    <table width="100%" style="margin-bottom:20px;width:100%">
                                      <tbody>
                                        <tr>
                                          <td width="100%">
                                            <div style="width:100%;height:1px;background-color:#ddd" color="#DDD" width="100%" ></div>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td style="text-align:center;font-size:13px">
                                    <a
                                      href="#"
                                      style="color:#00aff5"
                                      target="_blank"
                                    >
                                      Goto NeonaCreations Page
                                    </a>
                                    <span style="color:#00aff5">|</span>
                                    <a
                                      href="#"
                                      style="color:#00aff5"
                                      target="_blank"
                                    >
                                      FAQ
                                    </a>
                                  </td>
                                </tr>
                                <tr>
                                  <td style="text-align:center">
                                    <table
                                      style="max-width:100%;width:100%;text-align:center;font-family:ArialMT,Arial,sans-serif"
                                      cellspacing="0"
                                      cellpadding="0"
                                    >
                                      <tbody>
                                        <tr>
                                          <td style="text-align:center">
                                            <p
                                              style="font-size:10px;color:#708c91;text-align:center;padding:0;margin-top:10px;margin-bottom:2px"
                                            >
                                              This email was sent to you by
                                              NeonaCreations (Do not reply)
                                            </p>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>`
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