'use strict';

const logger = require('../../lib/logger')(module);

module.exports = function(SellerCompany) {
  // override deleteById method
  SellerCompany.deleteById = function(id, cb) {
    SellerCompany.update({id: id}, {
      status: SellerCompany.app.umma.commonCode.DATA_STATUS.DELETED,
      deleted: new Date(),
    }, cb);
  };
};
