module.exports = {
    routes: [
      {
        method: 'POST',
        path: '/shopify/pedidos/:id',
        handler: 'pedidos-shopify.shopifyPedidos',
      }
    ]
  }