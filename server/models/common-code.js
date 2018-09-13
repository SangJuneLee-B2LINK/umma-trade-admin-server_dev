'use strict';

const logger = require('../../lib/logger')(module);
const commonCode = require('../../lib/common-code');

module.exports = function(CommonCode) {
  // 공통코드 리로드
  CommonCode.reload = function(cb) {
    try {
      commonCode.load(CommonCode.app, function() {
        cb(null, true);
      });
    } catch (err) {
      logger.error(err);
      cb(err, false);
    }
  };

  CommonCode.remoteMethod('reload', {
    returns: {arg: 'success', type: 'boolean'},
    http: {verb: 'post'},
  });
};
