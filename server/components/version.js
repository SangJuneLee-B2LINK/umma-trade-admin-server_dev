'use strict';

const p = require('../../package.json');

module.exports = function(app) {
  console.log('');
  console.log('--------------------------------------------------');
  console.log('  %s v%s ', p.name, p.version);
  console.log('  with LoopBack v%s', app.loopback.version);
  console.log('  environment: %s', process.env.NODE_ENV);
  console.log('  [ %s ] ', p.companyName);
  console.log('--------------------------------------------------');
  console.log('');
};
