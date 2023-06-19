'use strict';

/**
 * generate-code service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::generate-code.generate-code');
