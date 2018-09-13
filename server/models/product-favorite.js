'use strict';

const logger = require('../../lib/logger')(module);

module.exports = function(ProductFavorite) {
  // override deleteById method
  ProductFavorite.deleteById = function(id, cb) {
    ProductFavorite.upsert({id: id}, {
      status: 0,
      deleted: new Date(),
    }, cb);
  };
};
