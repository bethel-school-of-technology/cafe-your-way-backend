var express = require('express');
var router = express.Router();
var models = require('../models');
var authService = require('../services/auth');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

//Create new user if one does not exist
router.post('/signup', function (req, res, next) {
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
    .spread(function (result, created) {
      if (created) {
        res.send('User successfully created');
      } else {
        res.send('This user already exists');
      }
    });
});

//Login user and return JWT as cookie
router.post('/login', function (req, res, next) {
  models.users.findOne({
    where: { UserName: req.body.userName }
  })
    .then(user => {
    if (!user) {
      console.log('User not found');
      return res.status(401).json({ message: 'Login Failed' });
    } else {
      let passwordMatch = authService.comparePasswords(req.body.password, user.Password);
      if (passwordMatch) {
      let token = authService.signUser(user);  // Use the authService to create jwt token
      res.cookie('jwt', token);  //Adds token to response as a cookie
      res.send('Login successful');
    }
    else {
      console.log('Wrong Password');
      res.redirect('login')
    }
  }});
});

//This route for /profile will use the authentication service to determine if a user can be found based on the JWT token stored as a cookie. This route will use the "authentication" service .verifyUser() method.
router.get('/profile', function (req, res, next) {
  let token = req.cookies.jwt;
  if (token) {
    authService.verifyUser(token)
      .then(user => {
        if (user) {
          // res.send(JSON.stringify(user));
          res.json(user)
        } else {
          res.status(401);
          res.send('Must be logged in');
        }
      });
  } else {
    res.status(401);
    res.send('Must be logged in');
  }
});

//Logging out with JWT
router.get('/logout', function (req, res, next) {
  res.cookie('jwt', '', { expires: new Date(0) });
  res.send('Logged out');
});


module.exports = router;
