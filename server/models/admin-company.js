'use strict';

const logger = require('../../lib/logger')(module);

module.exports = function(AdminCompany) {
  // override deleteById method
  AdminCompany.deleteById = function(id, cb) {
    AdminCompany.update({id: id}, {
      status: AdminCompany.app.umma.commonCode.DATA_STATUS.DELETED,
      deleted: new Date(),
    }, cb);
  };
};
