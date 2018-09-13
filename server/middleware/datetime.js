// sample code
'use strict';

const logger = require('../../lib/logger')(module);

module.exports = function() {
  return function datetime(req, res, next) {
    logger.debug('Date time middleware triggered.');

    res.json({datetime: new Date()});
  };
};
