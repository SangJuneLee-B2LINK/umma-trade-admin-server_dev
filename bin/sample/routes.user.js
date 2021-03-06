'use strict';

const dsConfig = require('../datasources.json');

module.exports = function(app) {
  const User = app.models.user;

  // login page
  app.get('/', function(req, res) {
    const credentials = dsConfig.ummaDs.transports[0].auth;
    res.render('login', {
      email: credentials.user,
      password: credentials.pass,
    });
  });

  // verified
  app.get('/verified', function(req, res) {
    res.render('verified');
  });

  // log a user in
  app.post('/login', function(req, res) {
    const ttl = 60 * 60 * 24 * 7 * 2; // 2 weeks
    User.login({
      email: req.body.email,
      password: req.body.password,
      ttl: ttl
    }, 'user', function(err, token) {
      if (err) {
        if (err.details && err.code === 'LOGIN_FAILED_EMAIL_NOT_VERIFIED'){
          res.render('reponseToTriggerEmail', {
            title: 'Login failed',
            content: err,
            redirectToEmail: '/api/users/' + err.details.userId + '/verify',
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
        redirectUrl: '/api/users/change-password?access_token=' + token.id,
      });
    });
  });

  // log a user out
  app.get('/logout', function(req, res, next) {
    if (!req.accessToken) return res.sendStatus(401);
    User.logout(req.accessToken.id, function(err) {
      if (err) return next(err);
      res.redirect('/');
    });
  });

  // send an email with instructions to reset an existing user's password
  app.post('/request-password-reset', function(req, res, next) {
    User.resetPassword({
      email: req.body.email,
    }, function(err) {
      if (err) return res.status(401).send(err);

      res.render('response', {
        title: 'Password reset requested',
        content: 'Check your email for further instructions',
        redirectTo: '/',
        redirectToLinkText: 'Log in',
      });
    });
  });

  // show password reset form
  app.get('/reset-password', function(req, res, next) {
    if (!req.accessToken) return res.sendStatus(401);
    res.render('password-reset', {
      redirectUrl: '/api/users/reset-password?access_token=' +
      req.accessToken.id,
    });
  });
};
