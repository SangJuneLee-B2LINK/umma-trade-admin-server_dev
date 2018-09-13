// 루프백 빌트인 모델과 커스텀 모델의 데이터베이스 테이블을 만든다.
'use strict';

const appRoot = require('app-root-path');
const app = appRoot.require('/server/server');
const ds = app.dataSources.ummaDs;

// the basic loopback model tables
// const base = ['User', 'AccessToken', 'ACL', 'RoleMapping', 'Role'];
const base = [];// ['ACL', 'RoleMapping', 'Role'];

// custom models
const models = [];// ['CustomAcl', 'CustomRole', 'CustomAccessToken', 'Admin', 'Buyer', 'Seller'];

const lbTables = [].concat(base, models);

// Run through and create all of them
ds.automigrate(lbTables, function(err) {
  if (err) throw err;
  console.log(' ');
  console.log('Tables [' + lbTables + '] migrated in ' + ds.adapter.name);
  console.log(' ');
  ds.disconnect();
  process.exit();
});
