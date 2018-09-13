'use strict';

const logger = require('../../lib/logger')(module);

module.exports = function(Inquiry) {
  // override deleteById method
  Inquiry.deleteById = function(id, cb) {
    Inquiry.update({id: id}, {
      status: Inquiry.app.umma.commonCode.DATA_STATUS.DELETED,
      deleted: new Date(),
    }, cb);
  };
};
