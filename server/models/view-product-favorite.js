'use strict';

const logger = require('../../lib/logger')(module);

module.exports = function(ViewProductFavorite) {
  // override deleteById method
  ViewProductFavorite.deleteById = function(id, cb) {
    ViewProductFavorite.update({id: id}, {
      status: 0,
      deleted: new Date(),
    }, cb);
  };
};
