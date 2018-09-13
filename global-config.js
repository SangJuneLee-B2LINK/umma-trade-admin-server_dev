/*
 * Global configuration shared by components.
 */
'use strict';

const url = require('url');
const p = require('./package.json');
const version = p.version.split('.').shift();
const env = process.env.NODE_ENV || 'development';
const isDevEnv = env === 'development' || env === 'test';

const conf = {
  host: 'localhost',
  port: 4000,
  restApiRoot: '/api' + (version > 0 ? '/v' + version : ''),
  legacyExplorer: false,
  isDevEnv: isDevEnv,
};

// The URL where the browser client can access the REST API is available.
// Replace with a full url (including hostname) if your client is being
// served from a different server than your REST API.
conf.restApiUrl = url.format({
  protocol: 'http',
  slashes: true,
  host: conf.host,
  port: conf.port,
  pathname: conf.restApiRoot,
});

module.exports = conf;
