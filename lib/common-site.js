'use strict';

const logger = require('./logger')(module);

module.exports = {
  load: function(app, callback) {
    app.models.CommonSite.find({}, function(err, results) {
      if (err) throw err;

      // make to JSON Object
      const commonSite = {};
      for (let i = 0; i < results.length; i += 1) {
        const r = results[i];
        commonSite[r.name] = r.contents;
      }

      app.umma.commonSite = commonSite;
      //logger.debug(app.umma.commonSite, 'CommonSite load complete');
      if (typeof callback === 'function') callback();
    });
  },
};
