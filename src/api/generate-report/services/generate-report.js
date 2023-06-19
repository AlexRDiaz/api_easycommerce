'use strict';

/**
 * generate-report service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::generate-report.generate-report');
