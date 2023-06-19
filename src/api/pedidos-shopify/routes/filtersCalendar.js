module.exports = {
    routes: [
      {
        method: 'POST',
        path: '/pedidos/filter/transporter/:id',
        handler: 'pedidos-shopify.filterTransporter',
      }
    ]
  }