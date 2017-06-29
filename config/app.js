import express		from	 'express';
import bodyParser	from	 'body-parser';
import logger		from	 'morgan';
import passport     from     'passport';
import cookieParser	from	 'cookie-parser';
import LdapStrategy from     'passport-ldapauth';
import session      from     'express-session';
import RedisStore   from     'connect-redis';
import Redis        from     'redis';
import passportConf from     '../config/passport';

const redisStore = RedisStore(session);
const redis = Redis.createClient();
const app	= express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(passportConf.secret));

//setup passport-ldap
passport.use(new LdapStrategy(passportConf.strategy));
passport.serializeUser((user, done) =>  done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// TODO: implement access control
passport.authenticationMiddleware = () => (req, res, next) => (
   req.isAuthenticated() ?
    ? next()
    : res.status(401).send('NOT AUTHETICATED :(')
);

app.use(session({
  store: new redisStore({ host: passportConf.redis.host, port: passportConf.redis.port, client: redis}),
  secret: passportConf.secret,
  cookie : {
    expires: false
  }
}));

app.use(passport.initialize());
app.use(passport.session());


export default app;
