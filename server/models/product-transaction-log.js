'use strict';

const logger = require('../../lib/logger')(module);

module.exports = function(ProductTransactionLog) {
  // override deleteById method
  ProductTransactionLog.deleteById = function(id, cb) {
    ProductTransactionLog.update({id: id}, {
      status: ProductTransactionLog.app.umma.commonCode.DATA_STATUS.DELETED,
      deleted: new Date(),
    }, cb);
  };
};
