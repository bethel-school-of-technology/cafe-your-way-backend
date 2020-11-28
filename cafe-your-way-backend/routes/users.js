var  express = require('express');
const res = require('express/lib/response');
var router = express.Router();
var models = require('../models');
const users = require('../models/users');
var authService = require('../services/auth');


// GET users listing. */
router.get('/', function (req, res) {
res.json({ message: 'respond with a resource'});
});


// POST SIGNUP (users sign up and create an account if an account does not exist and returns JWT token as cookie)
router.post('/signup', function(req, res) {
  models.users.findOrCreate({
    where: { UserName: req.body.userName },
    defaults: {
      FirstName: req.body.firstName,
      LastName: req.body.lastName,
      PhysicalAddress: req.body.physicalAddress,
      PhoneNumber: req.body.phoneNumber,
      Email: req.body.email,
      Password: authService.hashPassword(req.body.password)  
    }
  })
.spread(function(result, created) {
  if (created) {
  let token = authService.signUser(users);
  res.cookie('jwt', token);
  res.json({ message: 'User successfully created'});
  } else {
    res.json({ message: 'This user already exists'});
    }
  });
});


// POST LOGIN (users login and JWT is returned as cookie.  User is authenticated with a JWT token.
router.post('/login', function(req, res) {
  models.users.findOne({ 
    where: {
    UserName: req.body.userName}
  })
    .then(user => {
      if (!user) {
        console.log('User not found');
        return res.status(401).json({ message: 'Login failed'});
      }  else {
        let passwordMatch = authService.comparePasswords(req.body.password, user.Password);
        if (passwordMatch) {
        let token = authService.signUser(user); 
        res.cookie('jwt', token);
        res.json({ message: 'Login successful'});
      } else {
        console.log('Wrong password');
        res.json({ message: 'wrong password'});
        }
      }
    })
});


// GET LOGOUT (user logs out using JWT token that expires immediately)
router.get('/logout', function(req, res) {
  res.cookie('jwt', '', {expires: new Date(0) });
  res.json({ message: 'Successfully logged out'});
});


// GET PROFILE (a user will only be able to access and view their profile and no one else's profile once they are logged in). This route will use the authentication service to determine if a user can be found based on the JWT token stored as a cookie. This route will use the authentication service .verifyUser() method.
router.get('/profile', function(req, res) {
  let token = req.cookies.jwt;
  if (token) {
  authService.verifyUser(token)
    .then(user => {
      if (user) {
        res.json(user)
      } else {
        res.status(401).json({ message: 'Invalid authentication token'});
      }
    });
  } else {
    res.status(401).json({ message: 'Must be logged in'});
  }
});


module.exports = router;