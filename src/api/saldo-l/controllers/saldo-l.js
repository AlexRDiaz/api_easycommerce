'use strict';
const moment = require('moment');

/**
 * saldo-l controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::saldo-l.saldo-l',({ strapi }) =>({
    async searchDates(ctx){
        const {
            start, 
            end
            } = ctx.request.body;
        const startDate = moment(start, "DD/MM/YYYY");
        const endDate = moment(end, "DD/MM/YYYY");

        const searchRegisters = await strapi.entityService.findMany('api::saldo-l.saldo-l', {
            limit: -1,
            fields: "*",
        });
        const filtersRegisters = searchRegisters.filter(objeto => {
            const fechaObjeto = moment(objeto.Fecha, "DD/MM/YYYY");
            return fechaObjeto.isBetween(startDate, endDate, null, '[]');

          });
          
          filtersRegisters.sort(function(a, b) {
            var dateA = new Date(a.Fecha);
            var dateB = new Date(b.Fecha);
            return dateB - dateA;
          });
        return {
            data:filtersRegisters
        }

    }
}));
