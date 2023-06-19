'use strict';

/**
 * generate-code router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::generate-code.generate-code');
