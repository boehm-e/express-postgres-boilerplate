const password = "dashboard";
const express      = require('express');
const passport     = require('passport');
const bodyParser   = require('body-parser');
const LdapStrategy = require('passport-ldapauth');

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
var app = express();

passport.use(new LdapStrategy(OPTS));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(passport.initialize());

app.post('/login', function(req, res) {
  passport.authenticate('ldapauth', {session: false}, function(err, user, info) {
    if (err) {
      return res.error(err);
    }
    if (! user) {
      return res.send({ success : false, message : 'authentication failed' });
    }
    return res.send({ success : true, message : 'authentication succeeded', data: user });
  })(req, res);
});

app.listen(8080);
