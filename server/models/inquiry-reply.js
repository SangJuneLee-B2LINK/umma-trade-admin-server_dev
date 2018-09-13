'use strict';

const logger = require('../../lib/logger')(module);

module.exports = function(InquiryReply) {
  // override deleteById method
  InquiryReply.deleteById = function(id, cb) {
    InquiryReply.update({id: id}, {
      deleted: new Date(),
    }, cb);
  };
};
