'use strict';
const nodemailer = require("nodemailer");

/**
 * generate-code controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::generate-code.generate-code',({ strapi }) =>({

    async generateCodeEmail(ctx){
        const { email } = ctx.params;
        
        const numerosUnicos = new Set();
  
        while (numerosUnicos.size < 6) {
          const numeroAleatorio = Math.floor(Math.random() * 1000) + 1;
          numerosUnicos.add(numeroAleatorio);
        }
        
        let resultCode = Array.from(numerosUnicos).join('').slice(0, 6).toString();

        let transporter = nodemailer.createTransport({
            host: "smtpout.secureserver.net",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: "info@easyecomerce.com", // generated ethereal user
              pass: "64WDBGR9Sm@!E5tM", // generated ethereal password
            },
          });
        
          // send mail with defined transport object
          let info = await transporter.sendMail({
            from: '"EasyEcommer" < info@easyecomerce.com>', // sender address
            to: `${email}`, // list of receivers
            subject: "Código de Validación Cuenta", // Subject line
            text: "Código de Validación Cuenta", // plain text body
            html: `<b>Código de Validación Cuenta\n ${resultCode}</b>`, // html body
          });
        
          console.log("Message sent: %s", info.messageId);

        return {
            code:200,
            code:resultCode
        }
    }

 }));
