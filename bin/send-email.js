'use strict';

const appRoot = require('app-root-path');
const dsConfig = appRoot.require('/server/datasources.local');
const app = appRoot.require('/server/server');

if (process.env.CI) {
  console.log('skipping sending email from CI');
}
const emailAddress = dsConfig.emailDs.transports[0].auth.user;

app.models.Email.send({
  to: 'gisholic+umma@gmail.com',
  from: emailAddress,
  subject: 'umma test email message',
  text: '<strong>HTML</strong> tags are not converted',
  html: '<strong>HTML</strong> tags are converted',
}, function(err) {
  if (err) throw err;
  console.log('> email sent successfully');
  process.exit();
});
