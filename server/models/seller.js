'use strict';

const logger = require('../../lib/logger')(module);

module.exports = function(Seller) {
  // override deleteById method
  Seller.deleteById = function(id, cb) {
    Seller.update({id: id}, {
      status: Seller.app.umma.commonCode.USER_STATUS.DELETED,
      deleted: new Date(),
    }, cb);
  };
};
