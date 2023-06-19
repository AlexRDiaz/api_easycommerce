module.exports = {
    routes: [
      {
        method: 'POST',
        path: '/ordenes/retiros/withdrawal/:id',
        handler: 'ordenes-retiro.withdrawal',
      }
    ]
  }