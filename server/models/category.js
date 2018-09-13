'use strict';

const logger = require('../../lib/logger')(module);

module.exports = function(Category) {
  // override deleteById method
  Category.deleteById = function(id, cb) {
    Category.update({id: id}, {
      status: Category.app.umma.commonCode.DATA_STATUS.DELETED,
      deleted: new Date(),
    }, cb);
  };
};
