import express		from 'express';
import usersRoutes	from './users';
const router = express.Router();
const passport     = require('passport');

router.get('/health-check', (_, res) => res.send('OK'));


router.get('/profile', passport.authenticationMiddleware(), function(req,res) {
  console.log("YOU ARE AUTHETICATED");
  res.send("YOU ARE AUTHETICATED")
})

router.post('/login',
  passport.authenticate('ldapauth', {
    successRedirect: '/api/loginSuccess',
    failureRedirect: '/api/loginFailure'
  })
);

router.get('/loginFailure', function(req, res, next) {
  res.send('Failed to authenticate');
});

router.get('/loginSuccess', function(req, res, next) {
  res.send('Successfully authenticated');
});




router.use('/users', usersRoutes);

export default router;
