/* eslint-disable max-len */
/**
 * 실행 후 생성된 모델 파일을 하나하나 열어서 세부적인 설정을 추가하거나 수정해주어야 한다.
 */

'use strict';

const loopback = require('loopback');
const promisify = require('util').promisify;
const fs = require('fs');
const path = require('path');
const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);

const appRoot = require('app-root-path');
const modelsFilePath = appRoot.resolve('/bin/models');
const DATASOURCE_NAME = 'ummaDs';
const dsConfig = appRoot.require('/server/datasources.local');
const dbName = dsConfig[DATASOURCE_NAME]['database'];
const ds = new loopback.DataSource(dsConfig[DATASOURCE_NAME]);

let cnt = 0;
let newConfig = {};

/*
function capitalize(str) {
  if (!str) {
    return str;
  }
  return str.charAt(0).toUpperCase() + ((str.length > 1) ? str.slice(1).toLowerCase() : '');
}
function fromDBName(dbName, camelCase) {
  if (!dbName) {
    return dbName;
  }
  // return dbName;
  const parts = dbName.split(/-|_/);
  parts[0] = camelCase ? parts[0].toLowerCase() : capitalize(parts[0]);
  parts[0] = camelCase ? parts[0].toLowerCase() : capitalize(parts[0]);

  for (let i = 1; i < parts.length; i++) {
    parts[i] = capitalize(parts[i]);
  }
  return parts.join('');
}
*/

const createModel = async function(tableName, base) {
  // It's important to pass the same "options" object to all calls
  // of dataSource.discoverSchemas(), it allows the method to cache
  // discovered related models
  const options = {relations: true};
  /*
  // properties name camelCase column name to camelCase
  options.nameMapper = function mapName(type, name) {
    if (type === 'table') {
      return fromDBName(name, true);
    } else if (type === 'model') {
      return fromDBName(name, true);
    } else if (type === 'fk') {
      return fromDBName(name + 'Rel', true);
    } else {
      return fromDBName(name, false);
    }
  };
  */

  // Discover models and relations
  const schemas = await ds.discoverSchemas(tableName, options);
  const tableSchema = schemas[dbName + '.' + tableName];

  const resultSchema = {};
  for (const key in tableSchema) {
    if (key === 'options') {
      resultSchema[key] = {};
      for (const key2 in tableSchema[key]) {
        resultSchema[key][key2] = tableSchema[key][key2];
        if (key2 === 'idInjection') {
          resultSchema[key]['validateUpsert'] = true;
        }
      }
      if (base === 'User') {
        resultSchema['excludeBaseProperties'] = ['username'];
      }
      return;
    }

    resultSchema[key] = tableSchema[key];

    if (key === 'name') {
    	// add base
      resultSchema['base'] = base;
      resultSchema['plural'] = '';
    }
  }

  // add key and value
  resultSchema['hidden'] = [];
  resultSchema['validations'] = [];
  resultSchema['relations'] = resultSchema['options']['relations'];
  delete resultSchema['options']['relations'];
  if (base === 'User') {
    resultSchema['relations'] = {
      'accessTokens': {
        'type': 'hasMany',
        'model': 'CustomAccessToken',
        'polymorphic': {
          'foreignKey': 'userId',
          'discriminator': 'principalType',
        },
        'options': {
          'disableInclude': true,
        },
      },
    };
  } else if (base === 'AccessToken') {
    resultSchema['relations'] = {
      'Admin': {
        'type': 'belongsTo',
        'idName': 'id',
        'polymorphic': {
          'idType': 'string',
          'foreignKey': 'userId',
          'discriminator': 'principalType',
        },
      },
      'Buyer': {
        'type': 'belongsTo',
        'idName': 'id',
        'polymorphic': {
          'idType': 'string',
          'foreignKey': 'userId',
          'discriminator': 'principalType',
        },
      },
      'Seller': {
        'type': 'belongsTo',
        'idName': 'id',
        'polymorphic': {
          'idType': 'string',
          'foreignKey': 'userId',
          'discriminator': 'principalType',
        },
      },
    };
  } else if (base === 'Role') {
    resultSchema['relations'] = {
      'principals': {
        'type': 'hasMany',
        'model': 'CustomRoleMapping',
        'foreignKey': 'roleId',
      },
    };
  } else if (base === 'RoleMapping') {
    resultSchema['relations'] = {
      'role': {
        'type': 'belongsTo',
        'model': 'CustomRole',
        'foreignKey': 'roleId',
      },
    };
  }

  resultSchema['acls'] = [];
  if (base === 'PersistedModel') {
    resultSchema['acls'] = [
      {
        'accessType': '*',
        'principalType': 'ROLE',
        'principalId': '$everyone',
        'permission': 'DENY',
      },
      {
        'accessType': '*',
        'principalType': 'ROLE',
        'principalId': '$authenticated',
        'permission': 'ALLOW',
      },
    ];
  } else if (base === 'AccessToken') {
    resultSchema['acls'] = [
      {
        'principalType': 'ROLE',
        'principalId': '$everyone',
        'permission': 'DENY',
      },
      {
        'principalType': 'ROLE',
        'principalId': '$everyone',
        'property': 'create',
        'permission': 'ALLOW',
      },
    ];
  }

  resultSchema['scopes'] = {};
  resultSchema['indexes'] = {};
  resultSchema['methods'] = {};
  resultSchema['remoting'] = {};
  resultSchema['http'] = {'path': ''};

  const fileName = tableName.replace(/_/gi, '-');
  const filePath = path.join(modelsFilePath, fileName);

  // writing model json
  await writeFile(
    filePath + '.json',
    JSON.stringify(resultSchema, null, 2)
  );

  newConfig[tableSchema['name']] = {dataSource: DATASOURCE_NAME, public: true};
  cnt++;

  // writing model js
  if (fs.existsSync(filePath + '.js')) return;
  await writeFile(
    filePath + '.js',
    '\'use strict\';\n\n' +
    'module.exports = function(' + tableSchema['name'] + ') {\n\n};\n'
  );
};

const discover = async function() {
  // Create model definition files
  await fs.mkdirSync(modelsFilePath);

  // 테이블을 읽어서 모델을 생성한다.
  // await createModel('custom_acl', 'ACL');
  // await createModel('custom_role', 'Role');
  // await createModel('custom_role_mapping', 'RoleMapping');
  // await createModel('custom_access_token', 'AccessToken');

  await createModel('common_code', 'PersistedModel');
  await createModel('common_site', 'PersistedModel');
  await createModel('country', 'PersistedModel');
  await createModel('country_state', 'PersistedModel');
  await createModel('country_city', 'PersistedModel');
  await createModel('brand', 'PersistedModel');
  await createModel('category', 'PersistedModel');
  await createModel('admin', 'User');
  await createModel('buyer', 'User');
  await createModel('buyer_company', 'PersistedModel');
  await createModel('seller', 'User');
  await createModel('seller_company', 'PersistedModel');
  await createModel('product', 'PersistedModel');
  await createModel('product_favorite', 'PersistedModel');
  await createModel('product_inquiry', 'PersistedModel');
  await createModel('product_tag', 'PersistedModel');
  await createModel('product_transaction_log', 'PersistedModel');
  await createModel('inquiry', 'PersistedModel');

  // 뷰테이블을 읽어서 모델을 생성한다.
  // 뷰테이블에는 PK컬럼이 없으므로 Primary Key가 될만한 컬럼에 "id": 1 넣어주어야 findById 사용이 가능하다.
  await createModel('view_product'); // "prId" 속성에 "id": 1 넣어준다.

  if (cnt > 0) {
    // Expose models via REST API
    const configJson = await readFile('server/model-config.json', 'utf-8');
    const config = JSON.parse(configJson);
    const resultConfig = {};
    for (const key in config) resultConfig[key] = config[key];
    for (const key in newConfig) resultConfig[key] = newConfig[key];

    // writing model config
    await writeFile(
      'server/model-config.json',
      JSON.stringify(resultConfig, null, 2)
    );
  }
};

discover().then(
  success => { console.log('Create Model Complete!'); process.exit(); },
  error => { console.error('UNHANDLED ERROR:\n', error); process.exit(1); },
);
