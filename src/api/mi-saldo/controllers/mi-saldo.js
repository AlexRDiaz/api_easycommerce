'use strict';

/**
 * mi-saldo controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::mi-saldo.mi-saldo',({ strapi }) =>({
    async mybalance(ctx) {
        let sumaEntregados =0.0;
        let sumaCostoInicial =0.0;
        let sumaCosto =0.0;

        let sumaDevolucionInicial =0.0;
        let sumaDevolucion =0.0;

        let sumaRetiros =0.0;

        const { id } = ctx.params;
      
        const searchGeneralProduct = await strapi.entityService.findMany('api::pedidos-shopify.pedidos-shopify', {
            limit: -1,
            fields: "*",
            populate: ['pedido_fecha','users'],
        
        });

        const searchGeneralSellers = await strapi.entityService.findMany('api::vendedor.vendedor', {
            limit: -1,
            fields: "*",
        });

        const searchWithDrawal = await strapi.entityService.findMany('api::ordenes-retiro.ordenes-retiro', {
            limit: -1,
            fields: "*",
            populate: ['users_permissions_user'],
        });



        //SUMA ENTREGADOS
        for (let index = 0; index < searchGeneralProduct.length; index++) {
            if (searchGeneralProduct[index].IdComercial.toString() ===id.toString()) {
                if (searchGeneralProduct[index].Status.toString() ==="ENTREGADO") {
                    sumaEntregados += parseFloat(searchGeneralProduct[index].PrecioTotal.toString());                    
                }
                
            }
            
        }

        //OBTENER COSTO SUMA SELLER
        for (let index = 0; index < searchGeneralSellers.length; index++) {
            if (searchGeneralSellers[index].Id_Master.toString() ===id.toString()) {
                sumaCostoInicial = parseFloat(searchGeneralSellers[index].CostoEnvio);
            }
            
        }
        
        //SUMA COSTO
        for (let index = 0; index < searchGeneralProduct.length; index++) {
            if (searchGeneralProduct[index].IdComercial.toString() ===id.toString()) {
                if (searchGeneralProduct[index].Status.toString() ==="ENTREGADO" || searchGeneralProduct[index].Status.toString() ==="NO ENTREGADO") {
                    sumaCosto +=  sumaCostoInicial;                   
                }
                
            }
            
        }

           //OBTENER DEVOLUCION SUMA SELLER
           for (let index = 0; index < searchGeneralSellers.length; index++) {
            if (searchGeneralSellers[index].Id_Master.toString() ===id.toString()) {
                sumaDevolucionInicial = parseFloat(searchGeneralSellers[index].CostoDevolucion   );
            }
            
        }

        //SUMA DEVOLUCION

        for (let index = 0; index < searchGeneralProduct.length; index++) {
            if (searchGeneralProduct[index].IdComercial.toString() ===id.toString()) {
                if (searchGeneralProduct[index].Estado_Devolucion.toString() ==="ENTREGADO EN OFICINA" || searchGeneralProduct[index].Estado_Devolucion.toString() ==="DEVOLUCION EN RUTA" || searchGeneralProduct[index].Estado_Devolucion.toString() ==="EN BODEGA") {
                    if (searchGeneralProduct[index].Status.toString() === "NOVEDAD") {
                        sumaDevolucion +=  sumaDevolucionInicial; 
                    }
                }
                
            }
            
        }
        

        for (let index = 0; index < searchWithDrawal.length; index++) {
            if (searchWithDrawal[index].users_permissions_user.id.toString() ===id.toString()) {
                //estado en REALIZADO

                    if (searchWithDrawal[index].Estado.toString() === "REALIZADO") {
                        sumaRetiros +=  parseFloat(searchWithDrawal[index].Monto.toString()); 
                    }
                
                
            }
            
        }
        
        let responseFinal = ((sumaEntregados) - (sumaCosto+sumaDevolucion+sumaRetiros));



        return {
            code:200,
            value:responseFinal
        }

    },


    async mybalanceVF(ctx) {
        let sumaEntregados =0.0;
        let sumaCostoInicial =0.0;
        let sumaCosto =0.0;

        let sumaDevolucionInicial =0.0;
        let sumaDevolucion =0.0;

        let sumaRetiros =0.0;

        const { id } = ctx.params;
      
        const searchGeneralProduct = await strapi.entityService.findMany('api::pedidos-shopify.pedidos-shopify', {
            limit: -1,
            fields: "*",
            populate: ['pedido_fecha','users'],
        
        });

        const searchGeneralSellers = await strapi.entityService.findMany('api::vendedor.vendedor', {
            limit: -1,
            fields: "*",
        });

        const searchWithDrawal = await strapi.entityService.findMany('api::ordenes-retiro.ordenes-retiro', {
            limit: -1,
            fields: "*",
            populate: ['users_permissions_user'],
        });



        //SUMA ENTREGADOS
        for (let index = 0; index < searchGeneralProduct.length; index++) {
            if (searchGeneralProduct[index].IdComercial.toString() ===id.toString()) {
                if (searchGeneralProduct[index].Status.toString() ==="ENTREGADO") {
                    sumaEntregados += parseFloat(searchGeneralProduct[index].PrecioTotal.toString());                    
                }
                
            }
            
        }

        //OBTENER COSTO SUMA SELLER
        for (let index = 0; index < searchGeneralSellers.length; index++) {
            if (searchGeneralSellers[index].Id_Master.toString() ===id.toString()) {
                sumaCostoInicial = parseFloat(searchGeneralSellers[index].CostoEnvio);
            }
            
        }
        
        //SUMA COSTO
        for (let index = 0; index < searchGeneralProduct.length; index++) {
            if (searchGeneralProduct[index].IdComercial.toString() ===id.toString()) {
                if (searchGeneralProduct[index].Status.toString() ==="ENTREGADO" || searchGeneralProduct[index].Status.toString() ==="NO ENTREGADO") {
                    sumaCosto +=  sumaCostoInicial;                   
                }
                
            }
            
        }

           //OBTENER DEVOLUCION SUMA SELLER
           for (let index = 0; index < searchGeneralSellers.length; index++) {
            if (searchGeneralSellers[index].Id_Master.toString() ===id.toString()) {
                sumaDevolucionInicial = parseFloat(searchGeneralSellers[index].CostoDevolucion   );
            }
            
        }

        //SUMA DEVOLUCION

        for (let index = 0; index < searchGeneralProduct.length; index++) {
            if (searchGeneralProduct[index].IdComercial.toString() ===id.toString()) {
                if (searchGeneralProduct[index].Estado_Devolucion.toString() ==="ENTREGADO EN OFICINA" || searchGeneralProduct[index].Estado_Devolucion.toString() ==="DEVOLUCION EN RUTA" || searchGeneralProduct[index].Estado_Devolucion.toString() ==="EN BODEGA") {
                    if (searchGeneralProduct[index].Status.toString() === "NOVEDAD") {
                        sumaDevolucion +=  sumaDevolucionInicial; 
                    }
                }
                
            }
            
        }


        for (let index = 0; index < searchWithDrawal.length; index++) {
            if (searchWithDrawal[index].users_permissions_user.id.toString() ===id.toString()) {
                //estado en REALIZADO

                    if (searchWithDrawal[index].Estado.toString() === "REALIZADO") {
                        sumaRetiros +=  parseFloat(searchWithDrawal[index].Monto.toString()); 
                    }
                
                
            }
            
        }
        
        let responseFinal = ((sumaEntregados) - (sumaCosto+sumaDevolucion));



        return {
            code:200,
            value:responseFinal
        }

    },





    async mybalanceVFDates(ctx) {
        let sumaEntregados =0.0;
        let sumaCostoInicial =0.0;
        let sumaCosto =0.0;
        let dates = [];
        let sumaDevolucionInicial =0.0;
        let sumaDevolucion =0.0;

        let sumaRetiros =0.0;

        const { id } = ctx.params;
      
        const searchGeneralProduct = await strapi.entityService.findMany('api::pedidos-shopify.pedidos-shopify', {
            limit: -1,
            fields: "*",
            populate: ['pedido_fecha','users'],
        
        });

        const searchGeneralSellers = await strapi.entityService.findMany('api::vendedor.vendedor', {
            limit: -1,
            fields: "*",
        });

         //GENERATE DATE
         searchGeneralProduct.forEach(producto => {
            if (producto.IdComercial.toString() === id.toString()) {
              if (dates.length === 0) {
                if (producto.Status.toString() === "ENTREGADO") {
                  dates.push({"date": (producto.Fecha_Entrega.split("/")[1] +"/"+ producto.Fecha_Entrega.split("/")[2]), "montoE": parseFloat(producto.PrecioTotal.toString()), "costo":0.0, "costoD":0.0});
                }
                if (producto.Status.toString() === "NOVEDAD") {
                    dates.push({"date": (producto.Fecha_Entrega.split("/")[1] +"/"+ producto.Fecha_Entrega.split("/")[2]), "montoE": 0.0, "costo":0.0, "costoD":0.0});
                  }

              } else {
                if (producto.Status.toString() === "ENTREGADO") {
                  let found = false;
                  dates.forEach(dateObj => {
                    if (dateObj.date === (producto.Fecha_Entrega.split("/")[1] +"/"+ producto.Fecha_Entrega.split("/")[2])) {
                      dateObj.montoE += parseFloat(producto.PrecioTotal.toString());
                      found = true;
                    }
                  });
                  if (!found) {
                    dates.push({"date": (producto.Fecha_Entrega.split("/")[1] +"/"+ producto.Fecha_Entrega.split("/")[2]), "montoE": parseFloat(producto.PrecioTotal.toString()), "costo":0.0, "costoD":0.0});
                  }
                }else{
                    if (producto.Status.toString() === "NOVEDAD") {
                        let found = false;
                        dates.forEach(dateObj => {
                          if (dateObj.date === (producto.Fecha_Entrega.split("/")[1] +"/"+ producto.Fecha_Entrega.split("/")[2])) {
                            found = true;
                          }
                        });
                        if (!found) {
                            dates.push({"date": (producto.Fecha_Entrega.split("/")[1] +"/"+ producto.Fecha_Entrega.split("/")[2]), "montoE": 0.0, "costo":0.0, "costoD":0.0});
                        }
                    }
                }
              
              }
            }
          });
          
        



        //OBTENER COSTO SUMA SELLER
        for (let index = 0; index < searchGeneralSellers.length; index++) {
            if (searchGeneralSellers[index].Id_Master.toString() ===id.toString()) {
                sumaCostoInicial = parseFloat(searchGeneralSellers[index].CostoEnvio);
            }
            
        }
        
      

        searchGeneralProduct.forEach(producto => {
            if (producto.IdComercial.toString() === id.toString()) {
            if (dates.length !== 0){
                if ( producto.Status.toString() === "ENTREGADO" || producto.Status.toString() === "NO ENTREGADO") {
                  dates.forEach(dateObj => {
                    if (dateObj.date === (producto.Fecha_Entrega.split("/")[1] +"/"+ producto.Fecha_Entrega.split("/")[2])) {
                      dateObj.costo += sumaCostoInicial;
                    }
                  });
                 
                }
              }
            }
          });

          

          
           //OBTENER DEVOLUCION SUMA SELLER
           for (let index = 0; index < searchGeneralSellers.length; index++) {
            if (searchGeneralSellers[index].Id_Master.toString() ===id.toString()) {
                sumaDevolucionInicial = parseFloat(searchGeneralSellers[index].CostoDevolucion   );
            }
            
        }

   
        searchGeneralProduct.forEach(producto => {
            if (producto.IdComercial.toString() === id.toString()) {
            if (dates.length !== 0){
                if ( producto.Estado_Devolucion.toString() === "ENTREGADO EN OFICINA" || producto.Estado_Devolucion.toString() === "DEVOLUCION EN RUTA" || producto.Estado_Devolucion.toString() === "EN BODEGA") {
                 if(producto.Status.toString() === "NOVEDAD"){
                    dates.forEach(dateObj => {
                        if (dateObj.date === (producto.Fecha_Entrega.split("/")[1] +"/"+ producto.Fecha_Entrega.split("/")[2])) {
                          dateObj.costoD += sumaDevolucionInicial;
                        }
                      });
                 }
                 
                }
              }
            }
          });
        return {
            code:200,
            value:dates
        }

    },


   async contableSaldo(){
    let sumaRecibidos = 0.0;
    let sumaRealizado = 0.0;
    let sumaTransportadora = 0.0;
    //suma todos los depositos de las transportadoras y resta todos los retiros de los vendedores
    //SUMA LOS QUE ESTAN COMO RECIBIDOS EL ESTADO PAGO LOGISTICA - RETIROS EN ESTADO REALIZADO

    const searchGeneralProduct = await strapi.entityService.findMany('api::pedidos-shopify.pedidos-shopify', {
        limit: -1,
        fields: "*",
        populate: ['transportadora'],

    });
    for (let index = 0; index < searchGeneralProduct.length; index++) {
        const element = searchGeneralProduct[index];
        if (element.Estado_Pago_Logistica=="RECIBIDO") {
            let valor = parseFloat(element.PrecioTotal.toString());
            sumaRecibidos +=valor;
            if (element.Status=="ENTREGADO"||element.Status=="NO ENTREGADO") {
                let valor = parseFloat(element.transportadora!=null? element.transportadora.Costo_Transportadora.toString():"0");
                sumaTransportadora +=valor;
            }
        }
        
    }

    





    const searchGeneralOrdersWithrawal = await strapi.entityService.findMany('api::ordenes-retiro.ordenes-retiro', {
        limit: -1,
        fields: "*",
    });
    for (let index = 0; index < searchGeneralOrdersWithrawal.length; index++) {
        const element = searchGeneralOrdersWithrawal[index];
        if (searchGeneralOrdersWithrawal[index].Estado=="REALIZADO") {
            let valor = parseFloat(searchGeneralOrdersWithrawal[index].Monto.toString());
            sumaRealizado +=valor;
        }
        
    }

    let sumaRecibidoTransportadora = sumaRecibidos- sumaTransportadora;
    let result = sumaRecibidoTransportadora - sumaRealizado;
   

        return {
            data:{
                monto:result
            }
        };
    },

    async saldoTL(ctx){
        const { dateP } =ctx.request.body;
        let date = dateP;
        let sumaRecibidos = 0.0;
        let sumaCostoTransportadora = 0.0;
        //DEPOSITOS RECIBIDOS TRANSPORTADORA
        let sumaRecibidoTransportadora = 0.0;
        //RETIROS
        let sumaRetirosVendedores = 0.0;
        let totalSumaRetirosVendedores = 0.0;

        //SALDO A LA FECHA
        let saldoALaFecha = 0.0;

        //UTILIDAD TOTAL
         //VENDEDOR  
         let listVendedoresEnvio =[];
         let listVendedoresCostoDevolucion =[];

        let sumaCostoEnvioVendedor = 0.0;
        let sumaCostoDevolucionVendedor = 0.0;

        //TOTAL VENDEDOR SUMA
        let sumaCostoEnvioVendedorAndsumaCostoDevolucionVendedor = 0.0;


        //INGRESOS
        let sumaIngresos = 0.0;
        let sumaEgresos =0.0;
        //EGRESOS
        const searchGeneralProduct = await strapi.entityService.findMany('api::pedidos-shopify.pedidos-shopify', {
            limit: -1,
            fields: "*",
            populate: ['transportadora'],
    
        });
                //AQUI FILTRAR POR FECHAAS

        for (let index = 0; index < searchGeneralProduct.length; index++) {
            const element = searchGeneralProduct[index];
           if (element.Fecha_Entrega ===date ) {
            if (element.Estado_Pago_Logistica=="RECIBIDO") {
                let valor = parseFloat(element.PrecioTotal.toString());
                sumaRecibidos +=valor;
                if (element.Status=="ENTREGADO"||element.Status=="NO ENTREGADO") {
                    let valor = parseFloat(element.transportadora.Costo_Transportadora.toString());
                    sumaCostoTransportadora +=valor;
                }
            }
           }
            
        }
        //TOTAL
        sumaRecibidoTransportadora = sumaRecibidos-sumaCostoTransportadora;



        const searchGeneralOrdersWithrawal = await strapi.entityService.findMany('api::ordenes-retiro.ordenes-retiro', {
            limit: -1,
            fields: "*",
        });
                //AQUI FILTRAR POR FECHAAS

        for (let index = 0; index < searchGeneralOrdersWithrawal.length; index++) {
            const element = searchGeneralOrdersWithrawal[index];
            if (element.Fecha ===date ) {
                if (searchGeneralOrdersWithrawal[index].Estado=="REALIZADO") {
                    let valor = parseFloat(searchGeneralOrdersWithrawal[index].Monto.toString());
                    sumaRetirosVendedores +=valor;
                }
            }
            
            
        }

        //TOTAL
        totalSumaRetirosVendedores = sumaRetirosVendedores;

        //sumar anterior
        const ultimoCreado = await strapi.entityService.findMany('api::saldo-l.saldo-l', {
            limit: -1,
            sort: { createdAt: 'DESC' },
            fields: "*",
        });
        
        let sumaRecibidoTemp = 0.0;

        if (ultimoCreado.length>0) {
            var suma = parseFloat(ultimoCreado[0].Saldo);
            sumaRecibidoTemp +=suma;
            console.log(ultimoCreado[0]);
            
        }
        

        //TOTAL SALDO A LA FECHA

        saldoALaFecha = (sumaRecibidoTransportadora+sumaRecibidoTemp)-totalSumaRetirosVendedores;



        //  UTILIDAD TOTAL

        //VENDEDORES
        //AQUI FILTRAR POR FECHAAS

        for (let index = 0; index < searchGeneralProduct.length; index++) {
            const element = searchGeneralProduct[index];
         
               if (element.Fecha_Entrega === date) {
                if (element.Status=="ENTREGADO"||element.Status=="NO ENTREGADO") {
                    listVendedoresEnvio.push(element.IdComercial);
                }

                if (element.Estado_Devolucion!="PENDIENTE" && element.Status=="NOVEDAD") {
                    listVendedoresCostoDevolucion.push(element.IdComercial);
                }
               }
            
        }

        const searchGeneralSellers = await strapi.entityService.findMany('api::vendedor.vendedor', {
            limit: -1,
            fields: "*",
        });

        for (let i = 0; i < searchGeneralSellers.length; i++) {
            for (let j = 0; j < listVendedoresEnvio.length; j++) {
              if (searchGeneralSellers[i].Id_Master === listVendedoresEnvio[j]) {
                sumaCostoEnvioVendedor += parseFloat(searchGeneralSellers[i].CostoEnvio);
              }
            }
          }

          for (let i = 0; i < searchGeneralSellers.length; i++) {
            for (let j = 0; j < listVendedoresCostoDevolucion.length; j++) {
              if (searchGeneralSellers[i].Id_Master === listVendedoresCostoDevolucion[j]) {
                sumaCostoDevolucionVendedor += parseFloat(searchGeneralSellers[i].CostoDevolucion);
              }
            }
          }

          sumaCostoEnvioVendedorAndsumaCostoDevolucionVendedor = sumaCostoEnvioVendedor+sumaCostoDevolucionVendedor;
          let restaTemporal = (sumaCostoEnvioVendedorAndsumaCostoDevolucionVendedor-sumaCostoTransportadora);

        const searchIngresosEgresos = await strapi.entityService.findMany('api::ingresos-egreso.ingresos-egreso', {
            limit: -1,
            fields: "*",
        });

    //AQUI FILTRAR POR FECHAAS

    for (let index = 0; index < searchIngresosEgresos.length; index++) {
        const element = searchIngresosEgresos[index];
      if (element.Fecha.toString().split(" ")[0] ===date) {
        if (element.Tipo =="INGRESO") {
            let valor = parseFloat(element.Monto.toString());
            sumaIngresos +=valor;
        }
        if (element.Tipo =="EGRESO") {
            let valor = parseFloat(element.Monto.toString());
            sumaEgresos +=valor;
        }
      }


        
    }

    let restaTemporalIngresos = (restaTemporal+sumaIngresos);
        //sumar anterior
        const ultimoCreadoUtilidad = await strapi.entityService.findMany('api::saldo-l.saldo-l', {
            limit: -1,
            sort: { createdAt: 'DESC' },
            fields: "*",
        });
    

        if (ultimoCreadoUtilidad.length>0) {
            var suma = parseFloat(ultimoCreadoUtilidad[0].UtilidadTotal);
            restaTemporalIngresos +=suma;
            console.log(ultimoCreadoUtilidad[0]);
            
        }
        
    let utilidadTotal = (restaTemporalIngresos-sumaEgresos);

    // //DEPOSITOS RECIBIDOS
    // console.log(sumaRecibidoTransportadora);
    // //RETIROS VENDEDORES
    // console.log(totalSumaRetirosVendedores);
    // //SALDO A LA FECHA
    // console.log(saldoALaFecha);
    // //INGRESOS
    // console.log(sumaIngresos);

    // //EGRESOS
    // console.log(sumaEgresos);

    // //UTILIDAD TOTAL

    // console.log(utilidadTotal);
    
    let find = false;
    let id = 0;
    const searchRegisters = await strapi.entityService.findMany('api::saldo-l.saldo-l', {
        limit: -1,
        fields: "*",
    });
    for (let index = 0; index < searchRegisters.length; index++) {
        const element = searchRegisters[index];
        if (element.Fecha ==date) {
            find = true;
            id = element.id;
        }
        
    }
  
  
 

    if (find == false) {
        const createRegister =  await strapi.entityService.create('api::saldo-l.saldo-l', {
            data: {
                Fecha:date,
                Depositos:sumaRecibidoTransportadora.toFixed(2).toString(),
                Retiros:totalSumaRetirosVendedores.toFixed(2).toString(),
                Saldo: saldoALaFecha.toFixed(2).toString(),
                Ingresos:sumaIngresos.toFixed(2).toString(),
                Egresos:sumaEgresos.toFixed(2).toString(),
                UtilidadTotal:utilidadTotal.toFixed(2).toString()
            }
        })
    }else{
        const entryUpdate = await strapi.entityService.update('api::saldo-l.saldo-l', id, {
            data: {
                Fecha:date,
                Depositos:sumaRecibidoTransportadora.toFixed(2).toString(),
                Retiros:totalSumaRetirosVendedores.toFixed(2).toString(),
                Saldo: saldoALaFecha.toFixed(2).toString(),
                Ingresos:sumaIngresos.toFixed(2).toString(),
                Egresos:sumaEgresos.toFixed(2).toString(),
                UtilidadTotal:utilidadTotal.toFixed(2).toString()
            },
          });
    }
        
        return {
            code:200
        }

    }




    
}));
