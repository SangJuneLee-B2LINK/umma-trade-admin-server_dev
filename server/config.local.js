'use strict';

const gConfig = require('../global-config');

module.exports = {
  restApiRoot: gConfig.restApiRoot,
  host: gConfig.host,
  port: gConfig.port,
  legacyExplorer: gConfig.legacyExplorer,
  isDevEnv: gConfig.isDevEnv,
};
