'use strict';

const appRoot = require('app-root-path');
const app = appRoot.require('/server/server');
const sampleData = require('./sample-data__admin_company.json');
//const sampleData = require('./sample-data__buyer.json');
//const sampleData = require('./sample-data__buyer_company.json');

const promises = [];

Object.keys(sampleData).forEach(modelName => {
  const Model = app.models[modelName];
  const modelItems = sampleData[modelName];

  modelItems.forEach(modelItem => {
    promises.push(new Promise(resolve => {
      Model.upsert(modelItem).then(resolve);
    }));
  });
});

return Promise
  .all(promises)
  .then((res) => {
    console.log('-------------------------------------');
    console.log('Created %s items', res.length);
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
