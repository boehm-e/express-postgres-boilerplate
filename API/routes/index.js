import express		from 'express';
import usersRoutes	from './users';
import passport from 'passport';

const router = express.Router();

router.get('/health-check', (_, res) => res.send('OK'));

router.get('/profile', passport.authenticationMiddleware(), (req,res) => {
  res.send("AUTHETICATED :)");
});

router.post('/login', passport.authenticate('ldapauth', {
    successRedirect: '/api/loginSuccess',
    failureRedirect: '/api/loginFailure'
  })
);

router.use('/users', usersRoutes);

export default router;
