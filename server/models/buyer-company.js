'use strict';

const logger = require('../../lib/logger')(module);

module.exports = function(BuyerCompany) {
  // override deleteById method
  BuyerCompany.deleteById = function(id, cb) {
    BuyerCompany.update({id: id}, {
      status: BuyerCompany.app.umma.commonCode.DATA_STATUS.DELETED,
      deleted: new Date(),
    }, cb);
  };
};
