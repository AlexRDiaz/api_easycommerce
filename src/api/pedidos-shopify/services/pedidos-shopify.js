'use strict';

/**
 * pedidos-shopify service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::pedidos-shopify.pedidos-shopify');
