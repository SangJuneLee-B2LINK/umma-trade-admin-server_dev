'use strict';

const logger = require('../../lib/logger')(module);

module.exports = function(ProductInquiry) {
  // override deleteById method
  ProductInquiry.deleteById = function(id, cb) {
    ProductInquiry.update({id: id}, {
      status: ProductInquiry.app.umma.commonCode.DATA_STATUS.DELETED,
      deleted: new Date(),
    }, cb);
  };
};
