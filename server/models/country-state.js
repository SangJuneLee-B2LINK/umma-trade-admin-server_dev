'use strict';

const logger = require('../../lib/logger')(module);

module.exports = function(CountryState) {
  // override deleteById method
  CountryState.deleteById = function(id, cb) {
    CountryState.update({id: id}, {
      status: CountryState.app.umma.commonCode.DATA_STATUS.DELETED,
      deleted: new Date(),
    }, cb);
  };
};
