// @ts-nocheck
var  express = require('express');
const res = require('express/lib/response');
var hbs = require('hbs');
var router = express.Router();
var models = require('../models');
var users = require('../models/users');
var authService = require('../services/auth');
var customers = require('../models/customers');
var products = require('../models/products');
var orders = require('../models/orders');
var OrderDetails = require('../models/OrderDetails');
const { redirect } = require('express/lib/response');

// GET ALL users listing. */
router.get('/', function(req, res) {
  models.users.findAll({}).then(users => {
    res.json({ users });
  })
});


// GET BY ID users listing
router.get('/:id', function (req, res) {
  models.users.findOne({
    where: { UserId: parseInt(req.params.id)
    }})
    .then(userFound => {
      if(userFound) {
        res.json(
        {
          UserId:          userFound.UserId,
          FirstName:       userFound.FirstName,
          LastName:        userFound.LastName,
          PhysicalAddress: userFound.PhysicalAddress,
          PhoneNumber:     userFound.PhoneNumber,
          Email:           userFound.Email,
          UserName:        userFound.UserName
        });
      } else {
        res.json('User not found');
      }
    })
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
      Email: req.body.Email,
      Password: authService.hashPassword(req.body.Password)  
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
        let passwordMatch = authService.comparePasswords(req.body.Password, user.Password);
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


// POST LOGOUT (user logs out using JWT token that expires immediately)
router.post('/logout', function(req, res) {
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
        res.json({ user} )
      } else {
        res.status(401).json({ message: 'Invalid authentication token'});
      }
    });
  } else {
    res.status(401).json({ message: 'Must be logged in'});
  };
});


// PUT Update User by ID
router.put("/:id", function (req, res) {
  let userId = parseInt(req.params.id);
  models.users
    .update(req.body, { where: { UserId: userId } })
    .then(result => res.redirect('/users/' + userId))
    .catch(err => {
      res.status(400).json({ message: "There was a problem updating the user. Please check the user information."});
    });
});


// DELETE User by ID
router.delete("/:id", function (req, res) {
  let userId = parseInt(req.params.id);
  models.users
    .destroy({where: { UserId: userId }})
    .then(result => res.json({message: 'User successfully deleted.'}))
    .catch(err => { 
      res.status(400).json({ message: "There was a problem deleting the user. Please make sure you are specifying the user id."});
    }
);
});

// router.get('/admin', authUser, (req, res) => {
//   res.json(Admin)
// })


module.exports = router;
