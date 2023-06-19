'use strict';
const moment = require('moment');

/**
 * pedidos-shopify controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::pedidos-shopify.pedidos-shopify',({ strapi }) =>({
    async shopifyPedidos(ctx) {
        //GENERATE DATE
        const currentDate = new Date();
        const day = currentDate.getUTCDate();
        const month = currentDate.getUTCMonth() + 1; // Sumamos 1 porque los meses empiezan en 0
        const year = currentDate.getUTCFullYear();
        const fechaActual = `${day}/${month}/${year}`;

        // ID DATE ORDER FOR RELATION
        var dateOrder = "";

        //VARIABLES FOR ENTITY
        const listOfProducts =[];
        const { id } = ctx.params;
        const {
        order_number, 
        shipping_address:{name}, 
        shipping_address:{address1}, 
        shipping_address:{phone},
        total_price,
        customer_note,
        shipping_address:{city},
        line_items:productos
    } = ctx.request.body;
    console.log(name);
    //ADD PRODUCT TO LIST FOR NEW OBJECT
    productos.forEach(element => {
        listOfProducts.push({
           id: element.id,
           quantity:element.quantity,
           price:element.price,
           title:element.title
        });
    });

    // SEARCH EQUAL ORDERS
    const search = await strapi.entityService.findMany('api::pedidos-shopify.pedidos-shopify', {
        limit: -1,
        fields: ['NumeroOrden', 'Tienda_Temporal'],
        filters: { NumeroOrden: order_number.toString(),Tienda_Temporal:productos[0].vendor },
      });


      // IF ORDER NOT EXIST CREATE ORDER 

      if(!search.length){
        // SEARCH DATE ORDER FOR RELLATION
        const searchDate = await strapi.entityService.findMany('api::pedido-fecha.pedido-fecha', {
            limit: -1,
            fields: ['Fecha'],
            filters: { Fecha: fechaActual.toString()},
          });

          // IF DATE ORDER NOT EXIST CREATE ORDER AND ADD ID ELSE IF ONLY ADD DATE ORDER ID VALUE

          if(!searchDate.length){
          const createDate =  await strapi.entityService.create('api::pedido-fecha.pedido-fecha', {
                data: {
                    Fecha:fechaActual.toString(),
                 
                }
            })
            dateOrder = createDate.id;
          }else{
            dateOrder = searchDate[0].id;
          }

          const ahora = new Date();

          // obtener los valores de la fecha y hora actuales
          const dia = ahora.getDate();
          const mes = ahora.getMonth() + 1; // los meses comienzan en 0, por lo que debemos sumar 1
          const anio = ahora.getFullYear();
          const hora = ahora.getHours();
          const minuto = ahora.getMinutes();
          
          // formatear la fecha y hora en el formato deseado
          const fechaHoraActual = `${dia}/${mes}/${anio} ${hora}:${minuto}`;
          
          // imprimir la fecha y hora actual formateada
          // CREATE ORDER WITH VALUES
      const createOrder=  await strapi.entityService.create('api::pedidos-shopify.pedidos-shopify', {
                data: {
                    Marca_T_I:fechaHoraActual.toString(),
                    Tienda_Temporal:productos[0].vendor,
                    NumeroOrden:order_number.toString(),
                    DireccionShipping:address1.toString(),
                    NombreShipping:name.toString(),
                    TelefonoShipping:phone.toString(),
                    PrecioTotal:total_price.toString(),
                    Observacion:customer_note!=undefined?customer_note.toString():"",
                    CiudadShipping:city.toString(),
                    pedido_fecha:dateOrder.toString(),
                    users:id,
                    IdComercial:id,
                    ProductoP:`${listOfProducts[0].title.toString()}`,
                    ProductoExtra:listOfProducts.slice(1).map(elemento => `${elemento.title}` ).join(', '),
                    Cantidad_Total:`${listOfProducts[0].quantity.toString()}`
                }
            })

            // // CREATE PRODUCTS FOR ORDER 
            // listOfProducts.forEach(async element => {
               
            //     await strapi.entityService.create('api::producto-shopify.producto-shopify', {
            //         data: {
            //             id_shopify:element.id.toString(),
            //             Cantidad:element.quantity.toString(),
            //             Precio:element.price.toString(),
            //             Titulo:element.title.toString(),
            //             pedidos_shopify:createOrder.id
            //         }
            //     })
            // });
      }

    },


    async filterOrdersByDates(ctx) {
        const { id } = ctx.params;
        const {
        start, 
        end
        } = ctx.request.body;
        const startDate = moment(start, "DD/MM/YYYY");
        const endDate = moment(end, "DD/MM/YYYY");


        const search = await strapi.entityService.findMany('api::pedidos-shopify.pedidos-shopify', {
            limit: -1,
            fields: "*",
            populate: ['pedido_fecha','users'],
            filters: { users: {
                id:id
            }},
        });
        const filtersOrders = search.filter(objeto => {
            const fechaObjeto = moment(objeto.pedido_fecha.Fecha, "DD/MM/YYYY");
            return fechaObjeto.isBetween(startDate, endDate, null, '[]');

          });
        return {
            data:filtersOrders
        };
    }, 


     async filterTransporter(ctx) {
        const { id } = ctx.params;

        const {
        mes,
        year
        } = ctx.request.body;



        const search = await strapi.entityService.findMany('api::pedidos-shopify.pedidos-shopify', {
            limit: -1,
            fields: "*",
            populate: ['pedido_fecha','transportadora'],
          
        });
        

        const filtersOrders = search.filter(objeto => {
            if (objeto.Fecha_Entrega !== null) {
                if (objeto.transportadora!==null) {
                    objeto.Fecha_Entrega.toString().replace(/-/g, "/")
                    
                    return objeto.Fecha_Entrega.toString().split('/')[1] === mes && objeto.Fecha_Entrega.toString().split('/')[2].toString() === year && objeto.transportadora.id.toString() === id 
                          
            
                }

            }

          });
        return {
            data:filtersOrders
        };
    }, 

    async getProductsForHistoryTransport(ctx){
        const {
            start, 
            end
            } = ctx.request.body;
            const startDate = moment(start, "DD/MM/YYYY");
            const endDate = moment(end, "DD/MM/YYYY");
        const search = await strapi.entityService.findMany('api::pedidos-shopify.pedidos-shopify', {
            limit: -1,
            fields: "*",
            populate: ['pedido_fecha','transportadora','ruta', 'sub_ruta','operadore', "operadore.user", "users","users.vendedores"],
          
        });
        const filtersOrders = search.filter(objeto => {
            const fechaObjeto = moment(objeto.pedido_fecha.Fecha, "DD/MM/YYYY");
            return fechaObjeto.isBetween(startDate, endDate, null, '[]');

          });
        return {data:filtersOrders};

    },

    async generateDateCreateOrderI(ctx){
        const {
            date
            } = ctx.request.body;
            var dateOrder = "";

            const searchDate = await strapi.entityService.findMany('api::pedido-fecha.pedido-fecha', {
                limit: -1,
                fields: ['Fecha'],
                filters: { Fecha: date.toString()},
              });
    
              // IF DATE ORDER NOT EXIST CREATE ORDER AND ADD ID ELSE IF ONLY ADD DATE ORDER ID VALUE
    
              if(!searchDate.length){
              const createDate =  await strapi.entityService.create('api::pedido-fecha.pedido-fecha', {
                    data: {
                        Fecha:date.toString(),
                     
                    }
                })
                dateOrder = createDate.id;
              }else{
                dateOrder = searchDate[0].id;
              }
        return {
            data:{
                id:dateOrder
            }
        }

    }






}));
