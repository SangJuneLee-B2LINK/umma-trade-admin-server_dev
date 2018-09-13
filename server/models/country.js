'use strict';

const logger = require('../../lib/logger')(module);

module.exports = function(Country) {
  // override deleteById method
  Country.deleteById = function(id, cb) {
    Country.update({id: id}, {
      status: Country.app.umma.commonCode.DATA_STATUS.DELETED,
      deleted: new Date(),
    }, cb);
  };
};
