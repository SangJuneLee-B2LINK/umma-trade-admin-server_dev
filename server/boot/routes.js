'use strict';

const p = require('../../package.json');

module.exports = function(app) {
  // const router = app.loopback.Router();
  const Admin = app.models.Admin;

  // robots.txt
  app.get('/robots.txt', function(req, res) {
    res.send('User-agent: *\nDisallow: /');
  });

  // root
  // app.get('/', function(req, res) {
  //   res.send(`${p.productName} v${p.version}`);
  // });

  // sample code - status
  app.get('/status', app.loopback.status());

  // sample code - memory
  app.get('/memory', function(req, res) {
    const used = process.memoryUsage();
    for (let key in used) {
      if (used.hasOwnProperty(key)) {
        used[key] = `${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`;
      }
    }
    res.send(used);
  });

  // sample code - login page
  app.get('/login', function(req, res) {
    res.render('login', {
      email: 'gisholic+umma.admin@gmail.com',
      password: 'admin',
    });
  });

  // sample code - verified
  app.get('/verified', function(req, res) {
    res.render('verified');
  });

  // sample code - log a user in
  app.post('/login', function(req, res) {
    Admin.login({
      email: req.body.email,
      password: req.body.password,
      ttl: 86400,
    }, 'user', function(err, token) {
      if (err) {
        if (err.details && err.code === 'LOGIN_FAILED_EMAIL_NOT_VERIFIED') {
          res.render('reponseToTriggerEmail', {
            title: 'Login failed',
            content: err,
            redirectToEmail: '/api/admins/' + err.details.userId + '/verify',
            redirectTo: '/',
            redirectToLinkText: 'Click here',
            userId: err.details.userId,
          });
        } else {
          res.render('response', {
            title: 'Login failed. Wrong username or password',
            content: err,
            redirectTo: '/',
            redirectToLinkText: 'Please login again',
          });
        }
        return;
      }
      res.render('home', {
        email: req.body.email,
        accessToken: token.id,
        redirectUrl: '/api/admins/change-password?access_token=' + token.id,
      });
    });
  });

  // sample code - logout
  app.get('/logout', function(req, res, next) {
    if (!req.accessToken) return res.sendStatus(401);
    Admin.logout(req.accessToken.id, function(err) {
      if (err) return next(err);
      res.redirect(req.redirectUrl || '/login');
    });
    // if (!req.accessToken) return res.send({success: false, error: {code: 'ACCESSTOKEN_NOT_FOUND', statusCode: 401, message: 'request parameter accessToken not found.'}});
    // const CustomAccessToken = app.models.CustomAccessToken;
    // const token = new CustomAccessToken({id: req.accessToken});
    // token.destroy();
    // res.send({success: true});
  });

  // sample code - send an email with instructions to reset an existing user's password
  app.post('/request-password-reset', function(req, res, next) {
    if (!req.body.email) return res.sendStatus(401);
    Admin.resetPassword({
      email: req.body.email,
    }, function(err) {
      if (err) return res.status(401).send(err);
      res.render('response', {
        title: 'Password reset requested',
        content: 'Check your email for further instructions',
        redirectTo: '/login',
        redirectToLinkText: 'Log in',
      });
    });
  });

  // sample code - show password reset form
  app.get('/reset-password', function(req, res, next) {
    if (!req.accessToken) return res.sendStatus(401);
    res.render('password-reset', {
      redirectUrl: '/api/admins/reset-password?access_token=' +
        req.accessToken.id,
    });
  });
};
