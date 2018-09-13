// sample code
'use strict';

const logger = require('../../lib/logger')(module);

module.exports = function(app) {
  const models = [];

  Object.keys(app.models).forEach(function(model) {
    const modelName = app.models[model].modelName;

    if (models.indexOf(modelName) === -1)
      models.push(modelName);
  });

  //logger.info({Models: models});
};
