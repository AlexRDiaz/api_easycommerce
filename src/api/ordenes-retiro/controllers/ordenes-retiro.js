'use strict';
const nodemailer = require("nodemailer");

/**
 * ordenes-retiro controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::ordenes-retiro.ordenes-retiro',({ strapi }) =>({
    async withdrawal(ctx) {
        const { id } = ctx.params;
        const {
            monto, 
            fecha, 
            mail
        } = ctx.request.body;
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
            from: '"EasyEcommer" < nfo@easyecomerce.com>', // sender address
            to: `${mail}`, // list of receivers
            subject: "Código de Validación", // Subject line
            text: "Código de Validación", // plain text body
            html: `<b>Código de Validación\n ${resultCode}</b>`, // html body
          });
        
          console.log("Message sent: %s", info.messageId);


        const createWithdrawal =  await strapi.entityService.create('api::ordenes-retiro.ordenes-retiro', {
            data: {
                Monto:monto,
                Fecha:fecha,
                users_permissions_user:id,
                CodigoGenerado: resultCode,
                Estado:"PENDIENTE"
            }
        })

        return {
            code:200
        }

    }
}));
