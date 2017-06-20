import express		from 'express';
import usersRoutes	from './users';
const router = express.Router();
const passport     = require('passport');

router.get('/health-check', (_, res) => res.send('OK'));

router.get('/profile', passport.authenticationMiddleware(), (req,res) => {
  res.send("AUTHETICATED :)");
});

router.post('/login',
  passport.authenticate('ldapauth', {
    successRedirect: '/api/loginSuccess',
    failureRedirect: '/api/loginFailure'
  })
);

router.get('/loginFailure', (req, res) => {
  res.send('Failed to authenticate');
});

router.get('/loginSuccess', (req, res) => {
  res.send('Successfully authenticated');
});

router.use('/users', usersRoutes);

export default router;
