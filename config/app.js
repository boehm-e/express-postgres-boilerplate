const password = "dashboard";

import express		from	 'express';
import bodyParser	from	 'body-parser';
import logger		from	 'morgan';
import cookieParser	from	 'cookie-parser';

// setup passport-ldap
import passport from 'passport';
import LdapStrategy from 'passport-ldapauth';
import session from 'express-session';
const RedisStore = require('connect-redis')(session)



const app	= express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('seedup'));

//setup passport-ldap

var OPTS = {
  server: {
    url: 'ldap://localhost:1389',
    bindDN: 'uid=dashboard,ou=services,dc=seed-up,dc=org',
    bindCredentials: password,
    searchBase: 'ou=people,dc=seed-up,dc=org',
    searchFilter: '(uid={{username}})',
    reconnect: true
  }
};
passport.use(new LdapStrategy(OPTS));
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});
passport.authenticationMiddleware = function () {
  return function (req, res, next) {
    console.log(req.isAuthenticated());
    console.log(req.cookies);
    if (req.isAuthenticated()) {
      return next()
    }
    res.status(401).send('you are not authenticated')
  }
}
const redis = require('redis').createClient();

app.use(session({
  store: new RedisStore({ host: 'localhost', port: 6397, client: redis}),
  secret: "seedup",
  cookie : {
    expires: false
  }
}))
app.use(passport.initialize())
app.use(passport.session())


export default app;
