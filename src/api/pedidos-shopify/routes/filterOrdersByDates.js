module.exports = {
    routes: [
      {
        method: 'POST',
        path: '/shopify/pedidos/filter/dates/:id',
        handler: 'pedidos-shopify.filterOrdersByDates',
      }
    ]
  }