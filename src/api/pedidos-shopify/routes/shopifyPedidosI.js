module.exports = {
    routes: [
      {
        method: 'POST',
        path: '/shopify/pedidos/',
        handler: 'pedidos-shopify.generateDateCreateOrderI',
      }
    ]
  }