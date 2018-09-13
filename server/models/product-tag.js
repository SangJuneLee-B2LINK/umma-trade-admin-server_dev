'use strict';

const logger = require('../../lib/logger')(module);

module.exports = function(ProductTag) {
  // override deleteById method
  ProductTag.deleteById = function(id, cb) {
    ProductTag.update({id: id}, {
      status: ProductTag.app.umma.commonCode.DATA_STATUS.DELETED,
      deleted: new Date(),
    }, cb);
  };
};
