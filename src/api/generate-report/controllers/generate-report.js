'use strict';
var json2xls = require('json2xls');
const path = require('path');
const fs = require('fs');
const moment = require('moment');

/**
 * generate-report controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::generate-report.generate-report',({ strapi }) =>({
    async generateReport(ctx) {
        const { id } = ctx.params;
        const {
            fecha, 
            desde,
            hasta,
            estado,
            estadoLogistico,
            idMaster
        } = ctx.request.body;
        console.log(idMaster);
        const startDate = moment(desde, "DD/MM/YYYY");
        const endDate = moment(hasta, "DD/MM/YYYY");
        const searchGeneralProduct = await strapi.entityService.findMany('api::pedidos-shopify.pedidos-shopify', {
            limit: -1,
            fields: "*",
            populate: {
                transportadora:true,
                pedido_fecha:true,
                operadore:true,users:{
                    populate: {
                        vendedores: true,
                      },
                }
            },
        
        });

        const filtersOrders = searchGeneralProduct.filter(objeto => {
            const fechaObjeto = moment(objeto.pedido_fecha.Fecha, "DD/MM/YYYY");
            if (objeto.IdComercial.toString()===idMaster.toString()) {
                return  fechaObjeto.isBetween(startDate, endDate, null, '[]') && estado.includes(objeto.Status) || estadoLogistico.includes(objeto.Estado_Interno) ;
            }            
          });

       if (filtersOrders.length === 0) {
        return {
            code:400,
            Result:"No Existe Ningun Registro"
        }
        
       }else{
        var nuevaListaJson = filtersOrders.map(function(objeto) {
            return {
              "Fecha de Ingreso": objeto.Marca_T_I,
              "Fecha de Entrega": objeto.Fecha_Entrega,
              "Codigo": `${objeto.Tienda_Temporal}-${objeto.NumeroOrden}`,
              "Nombre":objeto.NombreShipping,
              "Ciudad":objeto.CiudadShipping,
              "Direccion":objeto.DireccionShipping,
              "Telefono":objeto.TelefonoShipping,
              "Cantidad":objeto.Cantidad_Total,
              "Producto": objeto.ProductoP,
              "Producto Extra":objeto.ProductoExtra,
              "Precio Total":objeto.PrecioTotal,
              "Comentario":objeto.Comentario,
              "Estado de Confirmacion": objeto.Estado_Interno,
              "Status":objeto.Status,
              "Estado de Entrega":objeto.Estado_Logistico,
              "Estado Devolucion": objeto.Estado_Devolucion,
              "Costo Transporte":objeto.Status ==="ENTREGADO" ||objeto.Status ==="NO ENTREGADO"? objeto.users!=null?objeto.users[0].vendedores[0]!=null?objeto.users[0].vendedores[0].CostoEnvio:"":"":"",
              "Costo Devolucion":objeto.DO ==="ENTREGADO EN OFICINA" || objeto.DT === "DEVOLUCION EN RUTA"||objeto.DL === "EN BODEGA"? objeto.users!=null?objeto.users[0].vendedores[0]!=null?objeto.users[0].vendedores[0].CostoDevolucion:"":"":""


            };
          });
          
        var json = nuevaListaJson;
        
        //export only the field 'poo'
        var xls = json2xls(json);
        
        const numerosUnicos = new Set();
  
        while (numerosUnicos.size < 6) {
          const numeroAleatorio = Math.floor(Math.random() * 1000) + 1;
          numerosUnicos.add(numeroAleatorio);
        }
        
        let resultCode = Array.from(numerosUnicos).join('').slice(0, 6).toString();
        

       const uploadsFolderPath = path.join(__dirname, '..', '..', '..','..', 'public', 'uploads/');
       const filePath = path.join(uploadsFolderPath, `${resultCode}data.xlsx`);
        fs.writeFileSync(filePath, xls, 'binary');

        // Obtener el path resultante
        const resultPath = path.resolve(filePath);


        const createEntity =  await strapi.entityService.create('api::generate-report.generate-report', {
            data: {
                Fecha:fecha.toString(),
                Archivo:resultPath.split("public")[1].toString(),
                Id_Master:id
            }
        })

        return {
            code:200,
            Result:resultPath
        }
       }

    }
}));
