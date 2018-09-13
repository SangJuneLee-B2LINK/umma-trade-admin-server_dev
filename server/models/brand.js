'use strict';

const logger = require('../../lib/logger')(module);

module.exports = function(Brand) {
  // override deleteById method
  Brand.deleteById = function(id, cb) {
    Brand.update({id: id}, {
      status: Brand.app.umma.commonCode.DATA_STATUS.DELETED,
      deleted: new Date(),
    }, cb);
  };
};
