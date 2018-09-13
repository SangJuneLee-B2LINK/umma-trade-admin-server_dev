'use strict';

const path = require('path');
const bunyan = require('bunyan');

// set logger stream
const streams = [];

if (process.env.NODE_ENV === 'production') {
  const createCWStream = require('bunyan-cloudwatch');
  const cloudWatchStream = createCWStream({
    logGroupName: process.env.AWS_CW_LOG_GROUP,
    logStreamName: process.env.AWS_CW_LOG_STREAM,
    cloudWatchLogsOptions: {
      region: process.env.AWS_CW_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });
  streams.push({
    level: 'info',
    type: 'raw',
    stream: cloudWatchStream,
  });
}

if (process.env.NODE_ENV !== 'production') {
  // development
  const PrettyStream = require('bunyan-prettystream');
  const prettyStdOut = new PrettyStream();
  prettyStdOut.pipe(process.stdout);
  streams.push({
    level: 'debug',
    type: 'raw',
    stream: prettyStdOut,
  });
}

// initialize root logger
const p = require('../package.json');
const rootLogger = bunyan.createLogger({
  name: p.name.toLowerCase(),
  streams: streams,
});
require('loopback-component-logger')(rootLogger);

module.exports = function(Module) {
  let submoduleName = '';
  if (Module.filename) {
    // make submodule name: /root/dir/file.js => dir/file
    const dirname = path.dirname(Module.filename);
    submoduleName = dirname.split(path.sep).pop() +
      path.sep +
      Module.filename.slice(dirname.length + 1, -3);
  }
  // child logger
  return require('loopback-component-logger')(submoduleName);
};
