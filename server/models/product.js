'use strict';

const logger = require('../../lib/logger')(module);
// const fs = require('fs');
// const path = require('path');

module.exports = function(Product) {
  // override deleteById method
  Product.deleteById = function(id, cb) {
    Product.update({id: id}, {
      status: Product.app.umma.commonCode.DATA_STATUS.DELETED,
      deleted: new Date(),
    }, cb);
  };

  /*
  // sample code - remote method
  Product.revEngine = function(sound, cb) {
    cb(null, sound + ' ' + sound + ' ' + sound);
  };
  Product.remoteMethod(
    'revEngine',
    {
      accepts: [{arg: 'sound', type: 'string'}],
      returns: {arg: 'engineSound', type: 'string'},
      http: {path: '/rev-engine', verb: 'post'},
    }
  );

  // sample code - remote method before hooks
  Product.beforeRemote('revEngine', function(context, unused, next) {
    console.log('Putting in the car key, starting the engine.');
    next();
  });

  // sample code - afterInitialize is a model hook which is still used in loopback
  Product.afterInitialize = function() {
    // http://docs.strongloop.com/display/public/LB/Model+hooks#Modelhooks-afterInitialize
    console.log('> afterInitialize triggered');
  };

  // sample code - the rest are all operation hooks
  // - http://docs.strongloop.com/display/public/LB/Operation+hooks
  Product.observe('before save', function(ctx, next) {
    console.log('> before save triggered:', ctx.Model.modelName, ctx.instance ||
      ctx.data);
    next();
  });
  Product.observe('after save', function(ctx, next) {
    console.log('> after save triggered:', ctx.Model.modelName, ctx.instance);
    next();
  });
  Product.observe('before delete', function(ctx, next) {
    console.log('> before delete triggered:',
      ctx.Model.modelName, ctx.instance);
    next();
  });
  Product.observe('after delete', function(ctx, next) {
    console.log('> after delete triggered:',
      ctx.Model.modelName, (ctx.instance || ctx.where));
    next();
  });

  // sample code - remote method after hook
  Product.afterRemote('revEngine', function(context, remoteMethodOutput, next) {
    console.log('Turning off the engine, removing the key.');
    next();
  });

  // sample code - model operation hook
  Product.observe('before save', function(ctx, next) {
    if (ctx.instance) {
      console.log('About to save a car instance:', ctx.instance);
    } else {
      console.log('About to update cars that match the query %j:', ctx.where);
    }
    next();
  });

  // sample code
  Product.download = function(cb) {
    const filePath = path.resolve(__dirname, '../../client/favicon.ico');
    fs.readFile(filePath, function(err, stream) {
      if (err) return cb(err);
      // stream can be any of: string, buffer, ReadableStream (e.g. http.IncomingMessage)
      cb(null, stream, 'application/octet-stream');
    });
  };

  // sample code
  Product.remoteMethod('download', {
    returns: [
      {arg: 'body', type: 'file', root: true},
      {arg: 'Content-Type', type: 'string', http: {target: 'header'}},
    ],
    http: {path: '/downloadTest', verb: 'get'},
  });
  */
};
