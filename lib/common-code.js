'use strict';

const logger = require('./logger')(module);

module.exports = {
  load: function(app, callback) {
    app.models.CommonCode.find({
      order: 'parentId ASC, depth ASC',
    }, function(err, results) {
      if (err) throw err;

      // make to JSON Object
      const commonCode = {};
      const tempCommonCode = {};
      for (let i = 0; i < results.length; i += 1) {
        const r = results[i];
        tempCommonCode[r.id] = {
          parentId: r.parentId,
          depth: r.depth,
          code: r.code,
          name: r.name,
        };
      }

      for (let i = 0; i < results.length; i += 1) {
        const r = results[i];
        // 1 depth
        if (r.depth === 1) {
          commonCode[r.name] = {};
          continue;
        }

        // 2 depth 이상
        let t = tempCommonCode[r.parentId];
        for (let j = 2; j <= r.depth; j += 1) {
          if (typeof commonCode[t.name] !== 'object') {
            commonCode[t.name] = {};
          }
          commonCode[t.name][r.name] = r.code;
          t = tempCommonCode[t.parentId];
        }
      }

      app.umma.commonCode = commonCode;
      //logger.debug(app.umma.commonCode, 'CommonCode load complete');
      if (typeof callback === 'function') callback();
    });
  },
};
