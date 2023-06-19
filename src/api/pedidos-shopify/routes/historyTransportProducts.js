module.exports = {
    routes: [
      {
        method: 'POST',
        path: '/history/transport',
        handler: 'pedidos-shopify.getProductsForHistoryTransport',
      }
    ]
  }