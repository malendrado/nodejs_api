'use strict';
/* jshint strict: false, esversion: 6 */
/* globals RedisService, Synchronizer */
const pkg = require('../package.json');
const os = require('os');

module.exports = {
  health: async (_ctx) => {
    _ctx.body = {
      app: {
        version: pkg.version,
        build: process.env.APP_BUILD || 'no-build',
        commit: process.env.APP_COMMIT || 'no-commit',
        name: Koa.config.appName,
        environment: process.env.NODE_ENV,
        newrelic: process.env.NEWRELIC_LICENSE_KEY && process.env.NODE_ENV === 'production' ? 'on' : 'off'
      },
      hostname: os.hostname()
    };
    _ctx.status = 200;
  }
}