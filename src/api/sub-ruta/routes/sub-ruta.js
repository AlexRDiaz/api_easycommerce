'use strict';

/**
 * sub-ruta router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::sub-ruta.sub-ruta');
