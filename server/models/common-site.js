'use strict';

const logger = require('../../lib/logger')(module);
const commonSite = require('../../lib/common-site');

module.exports = function(CommonSite) {
  // 사이트정보 리로드
  CommonSite.reload = function(cb) {
    try {
      commonSite.load(CommonSite.app, function() {
        cb(null, true);
      });
    } catch (err) {
      logger.error(err);
      cb(err, false);
    }
  };

  CommonSite.remoteMethod('reload', {
    returns: {arg: 'success', type: 'boolean'},
    http: {verb: 'post'},
  });
};
