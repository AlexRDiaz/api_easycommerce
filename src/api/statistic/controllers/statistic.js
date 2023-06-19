'use strict';
const moment = require('moment');

/**
 * statistic controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::statistic.statistic', ({ strapi }) => ({
    async dashboardLogistic(ctx) {
        let result = [];
        let entregado = 0;
        let noEntregado = 0;
        let novedad = 0;
        let reagendado = 0;
        let enRuta = 0;
        let enOficina = 0;
        let pProgramado = 0;

        const {
            desde,
            hasta,
            tienda,
            transporte,
            operator,
            status
        } = ctx.request.body;
        const startDate = moment(desde, "DD/MM/YYYY");
        const endDate = moment(hasta, "DD/MM/YYYY");

        const searchGeneralProduct = await strapi.entityService.findMany('api::pedidos-shopify.pedidos-shopify', {
            limit: -1,
            fields: "*",
            populate: ['pedido_fecha', 'users', 'transportadora', 'operadore'],

        });

        if (tienda == "null" && transporte == "null" && operator == "null") {
            for (let index = 0; index < searchGeneralProduct.length; index++) {
                const element = searchGeneralProduct[index];
                const fechaObjeto = moment(element.pedido_fecha.Fecha, "DD/MM/YYYY");
               if (fechaObjeto.isBetween(startDate, endDate, null, '[]')) {
                switch (element.Status) {
                    case "ENTREGADO":
                        entregado += 1;
                        break;

                    case "NO ENTREGADO":
                        noEntregado += 1;
                        break;

                    case "NOVEDAD":
                        novedad += 1;
                        break;
                    case "REAGENDADO":
                        reagendado += 1;
                        break;
                    case "EN RUTA":
                        enRuta += 1;
                        break;
                    case "EN OFICINA":
                        enOficina += 1;
                        break;
                    case "PEDIDO PROGRAMADO":
                        if (element.Estado_Interno =="CONFIRMADO" &&element.Estado_Logistico =="ENVIADO" ) {
                            pProgramado += 1;
                        }
                        break;
                    default:
                        break;
                }
               }
            }

        }

        if (tienda != "null" && transporte == "null" && operator == "null") {
            for (let index = 0; index < searchGeneralProduct.length; index++) {
                const element = searchGeneralProduct[index];
                const fechaObjeto = moment(element.pedido_fecha.Fecha, "DD/MM/YYYY");
               if (fechaObjeto.isBetween(startDate, endDate, null, '[]')) {
              if (element.IdComercial == tienda) {
                switch (element.Status) {
                    case "ENTREGADO":
                        entregado += 1;
                        break;

                    case "NO ENTREGADO":
                        noEntregado += 1;
                        break;

                    case "NOVEDAD":
                        novedad += 1;
                        break;
                    case "REAGENDADO":
                        reagendado += 1;
                        break;
                    case "EN RUTA":
                        enRuta += 1;
                        break;
                    case "EN OFICINA":
                        enOficina += 1;
                        break;
                    case "PEDIDO PROGRAMADO":
                        if (element.Estado_Interno =="CONFIRMADO" &&element.Estado_Logistico =="ENVIADO" ) {
                            pProgramado += 1;
                        }
                        break;
                    default:
                        break;
                }
              }
               }
            }

        }


        if (tienda != "null" && transporte != "null" && operator == "null") {
            for (let index = 0; index < searchGeneralProduct.length; index++) {
                const element = searchGeneralProduct[index];
                const fechaObjeto = moment(element.pedido_fecha.Fecha, "DD/MM/YYYY");
               if (fechaObjeto.isBetween(startDate, endDate, null, '[]')) {
            if(element.transportadora && element.transportadora.id){
                if (element.IdComercial == tienda && element.transportadora.id == transporte) {
                    switch (element.Status) {
                        case "ENTREGADO":
                            entregado += 1;
                            break;
    
                        case "NO ENTREGADO":
                            noEntregado += 1;
                            break;
    
                        case "NOVEDAD":
                            novedad += 1;
                            break;
                        case "REAGENDADO":
                            reagendado += 1;
                            break;
                        case "EN RUTA":
                            enRuta += 1;
                            break;
                        case "EN OFICINA":
                            enOficina += 1;
                            break;
                        case "PEDIDO PROGRAMADO":
                            if (element.Estado_Interno =="CONFIRMADO" &&element.Estado_Logistico =="ENVIADO" ) {
                                pProgramado += 1;
                            }
                            break;
                        default:
                            break;
                    }
                  }
            }
               }
            }

        }



        if (tienda != "null" && transporte != "null" && operator != "null") {
            for (let index = 0; index < searchGeneralProduct.length; index++) {
                const element = searchGeneralProduct[index];
                const fechaObjeto = moment(element.pedido_fecha.Fecha, "DD/MM/YYYY");
               if (fechaObjeto.isBetween(startDate, endDate, null, '[]')) {
         if (element.operadore && element.operadore.id) {
            if(element.transportadora && element.transportadora.id){
                if (element.IdComercial == tienda && element.transportadora.id == transporte && element.operadore.id == operator) {
                    switch (element.Status) {
                        case "ENTREGADO":
                            entregado += 1;
                            break;
    
                        case "NO ENTREGADO":
                            noEntregado += 1;
                            break;
    
                        case "NOVEDAD":
                            novedad += 1;
                            break;
                        case "REAGENDADO":
                            reagendado += 1;
                            break;
                        case "EN RUTA":
                            enRuta += 1;
                            break;
                        case "EN OFICINA":
                            enOficina += 1;
                            break;
                        case "PEDIDO PROGRAMADO":
                            if (element.Estado_Interno =="CONFIRMADO" &&element.Estado_Logistico =="ENVIADO" ) {
                                pProgramado += 1;
                            }
                            break;
                        default:
                            break;
                    }
                  }
            }
            
         }
               }
            }

        }


        if (tienda == "null" && transporte != "null" && operator == "null") {
            for (let index = 0; index < searchGeneralProduct.length; index++) {
                const element = searchGeneralProduct[index];
                const fechaObjeto = moment(element.pedido_fecha.Fecha, "DD/MM/YYYY");
               if (fechaObjeto.isBetween(startDate, endDate, null, '[]')) {
            if(element.transportadora && element.transportadora.id){
                if (element.transportadora.id == transporte) {
                    switch (element.Status) {
                        case "ENTREGADO":
                            entregado += 1;
                            break;
    
                        case "NO ENTREGADO":
                            noEntregado += 1;
                            break;
    
                        case "NOVEDAD":
                            novedad += 1;
                            break;
                        case "REAGENDADO":
                            reagendado += 1;
                            break;
                        case "EN RUTA":
                            enRuta += 1;
                            break;
                        case "EN OFICINA":
                            enOficina += 1;
                            break;
                        case "PEDIDO PROGRAMADO":
                            if (element.Estado_Interno =="CONFIRMADO" &&element.Estado_Logistico =="ENVIADO" ) {
                                pProgramado += 1;
                            }
                            break;
                        default:
                            break;
                    }
                  }
            }
               }
            }

        }

        if (tienda == "null" && transporte == "null" && operator != "null") {
            for (let index = 0; index < searchGeneralProduct.length; index++) {
                const element = searchGeneralProduct[index];
                const fechaObjeto = moment(element.pedido_fecha.Fecha, "DD/MM/YYYY");
               if (fechaObjeto.isBetween(startDate, endDate, null, '[]')) {
            if(element.operadore && element.operadore.id){
                if (element.operadore.id == operator) {
                    switch (element.Status) {
                        case "ENTREGADO":
                            entregado += 1;
                            break;
    
                        case "NO ENTREGADO":
                            noEntregado += 1;
                            break;
    
                        case "NOVEDAD":
                            novedad += 1;
                            break;
                        case "REAGENDADO":
                            reagendado += 1;
                            break;
                        case "EN RUTA":
                            enRuta += 1;
                            break;
                        case "EN OFICINA":
                            enOficina += 1;
                            break;
                        case "PEDIDO PROGRAMADO":
                            if (element.Estado_Interno =="CONFIRMADO" &&element.Estado_Logistico =="ENVIADO" ) {
                                pProgramado += 1;
                            }
                            break;
                        default:
                            break;
                    }
                  }
            }
               }
            }

        }


        if (tienda == "null" && transporte != "null" && operator != "null") {
            for (let index = 0; index < searchGeneralProduct.length; index++) {
                const element = searchGeneralProduct[index];
                const fechaObjeto = moment(element.pedido_fecha.Fecha, "DD/MM/YYYY");
               if (fechaObjeto.isBetween(startDate, endDate, null, '[]')) {
            if (element.transportadora && element.transportadora.id) {
                console.log(element.transportadora);

                if(element.operadore && element.operadore.id){

                    if (element.operadore.id == operator && element.transportadora.id == transporte) {
                        switch (element.Status) {
                            case "ENTREGADO":
                                entregado += 1;
                                break;
        
                            case "NO ENTREGADO":
                                noEntregado += 1;
                                break;
        
                            case "NOVEDAD":
                                novedad += 1;
                                break;
                            case "REAGENDADO":
                                reagendado += 1;
                                break;
                            case "EN RUTA":
                                enRuta += 1;
                                break;
                            case "EN OFICINA":
                                enOficina += 1;
                                break;
                            case "PEDIDO PROGRAMADO":
                                if (element.Estado_Interno =="CONFIRMADO" &&element.Estado_Logistico =="ENVIADO" ) {
                                    pProgramado += 1;
                                }
                                break;
                            default:
                                break;
                        }
                      }
                }
            }
               }
            }

        }




        for (let index = 0; index < status.length; index++) {
            const element = status[index];
            switch (element) {
                case "ENTREGADO":
                    result.push({
                        domain:"ENTREGADO",
                        measure:entregado
                    });
                    break;

                case "NO ENTREGADO":
                    result.push({
                        domain:"NO ENTREGADO",
                        measure:noEntregado
                    });
                    break;

                case "NOVEDAD":
                    result.push({
                        domain:"NOVEDAD",
                        measure:novedad
                    });
                    break;
                case "REAGENDADO":
                    result.push({
                        domain:"REAGENDADO",
                        measure:reagendado
                    });
                    break;
                case "EN RUTA":
                    result.push({
                        domain:"EN RUTA",
                        measure:enRuta
                    });
                    break;
                case "EN OFICINA":
                    result.push({
                        domain:"EN OFICINA",
                        measure:enOficina
                    });
                    
                    break;
                case "PEDIDO PROGRAMADO":
                    result.push({
                        domain:"PEDIDO PROGRAMADO",
                        measure:pProgramado
                    });
                    break;
                default:
                    break;
            }

        }




        return {
            data: result
        }

    }
}));
