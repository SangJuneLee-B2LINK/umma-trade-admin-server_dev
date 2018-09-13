'use strict';

const logger = require('../../lib/logger')(module);

module.exports = function(ProductSearchCondition) {
  // override deleteById method
  ProductSearchCondition.deleteById = function(id, cb) {
    ProductSearchCondition.update({id: id}, {
      status: ProductSearchCondition.app.umma.commonCode.DATA_STATUS.DELETED,
      deleted: new Date(),
    }, cb);
  };
};
