module.exports = {
    routes: [
      {
        method: 'POST',
        path: '/generate-code/:email',
        handler: 'generate-code.generateCodeEmail',
      }
    ]
  }