'use strict';

const logger = require('../../lib/logger')(module);

module.exports = function(CountryCity) {
  // override deleteById method
  CountryCity.deleteById = function(id, cb) {
    CountryCity.update({id: id}, {
      status: CountryCity.app.umma.commonCode.DATA_STATUS.DELETED,
      deleted: new Date(),
    }, cb);
  };
};
