module.exports = {
    routes: [
      {
        method: 'POST',
        path: '/reporte/:id',
        handler: 'generate-report.generateReport',
      }
    ]
  }