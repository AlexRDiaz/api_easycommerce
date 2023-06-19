'use strict';

/**
 * vendedor service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::vendedor.vendedor');
