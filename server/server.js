'use strict';

const path = require('path');
const result = require('dotenv').config();
if (result.error) {
  throw result.error;
}
const loopback = require('loopback');
const boot = require('loopback-boot');
const app = module.exports = loopback();

// set custom object
app.umma = {};

app.set('view engine', 'ejs'); // LoopBack comes with EJS out-of-box
app.set('views', path.resolve(__dirname, 'views'));
app.set('json spaces', 2); // format json responses for easier viewing

/*
// sample code - middleware
// If you would rather use middleware.json ... make sure to
// install this middleware among the first middleware,
// as it needs to hook into the response object before
// any other middleware sends back the response.
app.middleware('initial', function(req, res, next) {
  // install a listener for when the response is finished
  res.on('finish', function() {
    // the request was handled, print the log entry
    console.log(req.method, req.originalUrl, res.statusCode);
  });

  // resume the routing pipeline,
  // let other middleware to actually handle the request
  next();
});
*/

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');

    const baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at %s', baseUrl);

    const explorer = app.get('loopback-component-explorer');
    if (explorer) {
      console.log('Browse your REST API at %s%s', baseUrl, explorer.mountPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module) {
    // 토큰 기간 연장
    app.use(loopback.token({}));
    app.use(function updateToken(req, res, next) {
      const token = req.accessToken; // get the accessToken from the request
      if (!token) return next(); // if there's no token we use next() to delegate handling back to loopback
      const now = new Date();
      // EDIT: to make sure we don't use a token that's already expired, we don't update it
      // this line is not really needed, because the framework will catch invalid tokens already
      if (token.created.getTime() + (token.ttl * 1000) < now.getTime())
        return next();
      // performance optimization, we do not update the token more often than once per five seconds
      if (now.getTime() - token.created.getTime() < 3600)
        return next();
      token.updateAttribute('created', now, next); // save to db and move on
    });
    app.start();
  }
});
