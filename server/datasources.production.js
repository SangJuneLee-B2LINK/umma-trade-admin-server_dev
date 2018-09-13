'use strict';

module.exports = {
  ummaDs: {
    name: 'ummaDs',
    connector: 'mysql',
    hostname: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    collation: 'utf8_unicode_ci',
    supportBigNumbers: true,
  },
  emailDs: {
    name: 'emailDs',
    connector: 'mail',
    transports: [
      {
        type: process.env.MAIL_TYPE,
        host: process.env.MAIL_HOST,
        secure: process.env.MAIL_SECURE,
        port: process.env.MAIL_PORT,
        tls: {
          'rejectUnauthorized': false,
        },
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        },
      },
    ],
  },
  storage: {
    name: 'storage',
    connector: 'loopback-component-storage',
    provider: 'amazon',
    keyId: process.env.AWS_S3_KEY_ID,
    key: process.env.AWS_S3_KEY,
  },
};
