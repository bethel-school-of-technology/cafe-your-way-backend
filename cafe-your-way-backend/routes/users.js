// @ts-nocheck
var express = require('express');
var router = express.Router();
var models = require('../models');
var users = require('../models/users');
var authService = require('../services/auth');
var products = require('../models/products');
var orders = require('../models/orders');



// POST SIGNUP users (users sign up and create an account if an account does not exist and returns JWT token as cookie).  Password is hashed/encrypted - (Accessible by All Users)
router.post('/signup', function (req, res) {
  models.users.findOrCreate({
    where: { UserName: req.body.UserName },
    defaults: {
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      Email: req.body.Email,
      Address1: req.body.Address1,
      Address2: req.body.Address2,
      City: req.body.City,
      State: req.body.State,
      ZipCode: req.body.ZipCode,
      PhoneNumber: req.body.PhoneNumber,
      Password: authService.hashPassword(req.body.Password),
      Deleted: false
    }
  })
    .spread(function (result, created) {
      if (created) {
        // Status 200: OK status/success
        res.json({ message: 'User successfully created', status: 200 });
      } else {
        // Status 400:  bad request/client error
        res.json({ message: 'This user already exists', status: 400 });
      }
    });
});




// POST LOGIN (users login and JWT is returned as cookie. The authorization service used is  ".signUser ()" method".  User is authenticated with a JWT token. Also, checks if the requesting user is marked as an "Admin" in the database. (Accessible by All Users)
router.post('/login', function (req, res) {
  models.users.findOne({
    where: {
      UserName: req.body.UserName
    }
  })
    .then(user => {
      if (user) {
        let passwordMatch = authService.comparePasswords(req.body.Password, user.Password);
        if (passwordMatch) {
          let token = authService.signUser(user);
          res.cookie('jwt', token, { httpOnly: true });
          // Status 200: OK status/success
          res.json({ message: 'User successfully logged in', status: 200, token });
        } else {
          // Status 400:  bad request/client error
          res.json({ message: 'wrong password', status: 400 });
        }
      } else {
        // Status 400:  bad request/client error
        res.json({ message: 'wrong user name', status: 400 });
      }
    })
});




// POST LOGOUT (user logs out using JWT token that expires immediately). (Accessible by All Users)
router.post('/logout', function (req, res) {
  res.cookie('jwt', '', { expires: new Date(0) });
  res.json({ message: 'Successfully logged out' });
});




// GET ALL users listing.  This route will use the authorization service .verifyUser() method.  (Admin Protected)
router.get('/', function (req, res) {
  let token = req.cookies.jwt;
  if (token) {
    authService.verifyUser(token)
      .then(user => {
        if (user.Admin) {
          models.users.findAll({
            where: {
              Deleted: false
            }
          }).then(users => {
            res.json({
              users
              // These are the fields that are rendered from the users object:
              // UserId:          userFound.UserId,
              // FirstName:       userFound.FirstName,
              // LastName:        userFound.LastName,
              // Email:           userFound.Email,
              // Address1:        userFound.Address1,
              // Address2:        userFound.Address2,
              // City:            userFound.City,
              // State:           userFound.State,
              // ZipCode:         userFound.ZipCode,
              // PhoneNumber:     userFound.PhoneNumber,
              // UserName:        userFound.UserName,
              // Admin:           userFound.Admin,
              // Deleted:         userFound.Deleted
            });
          })
        } else {
          // Status 401: unauthorized client/lacks valid authentication credentials 
          res.status(401).json({ message: 'Unauthorized User' });
        }
      });
  } else {
    // Status 401: unauthorized client/lacks valid authentication credentials 
    res.status(401).json({ message: 'Must be logged in' });
  };
});



// This route will use the authentication service .verifyUser() method to determine if a user can be found based on the JWT token stored as a cookie. 
router.get('/profile', function (req, res) {
  // let token = req.cookies.jwt;
  let token = req.headers['authorization'];
  console.log(token);
  token = token.slice(4)
  if (token) {
    authService.verifyUser(token)
      .then(user => {
        if (user) {
          // Status 200: OK status/success
          res.json({ user, status: 200 })
        } else {
          // Status 403: Forbidden / server understood the request, but refused to authorize
          res.json({ message: 'Invalid authentication token', status: 403 });
        }
      });
  } else {
    // Status 403: Forbidden / server understood the request, but refused to authorize
    res.json({ message: 'Must be logged in', status: 403 });
  };
});



// GET BY ID users listing.  This route will use the authorization service .verifyUser() method.  (Admin Protected)
router.get('/:id', function (req, res) {
  let token = req.cookies.jwt;
  if (token) {
    authService.verifyUser(token)
      .then(user => {
        if (user.Admin) {
          models.users.findOne({
            where: {
              UserId: parseInt(req.params.id)
            }
          })
            .then(userFound => {
              if (userFound) {
                res.json(
                  {
                    userFound
                    // These are the fields that are rendered from the users object:
                    // UserId:          userFound.UserId,
                    // FirstName:       userFound.FirstName,
                    // LastName:        userFound.LastName,
                    // Email:           userFound.Email,
                    // Address1:        userFound.Address1,
                    // Address2:        userFound.Address2,
                    // City:            userFound.City,
                    // State:           userFound.State,
                    // ZipCode:         userFound.ZipCode,
                    // PhoneNumber:     userFound.PhoneNumber,
                    // UserName:        userFound.UserName,
                    // Admin:           userFound.Admin,
                    // Deleted:         userFound.Deleted
                  });
              } else {
                res.json('User not found');
              }
            })
        } else {
          // Status 401: unauthorized client/lacks valid authentication credentials 
          res.status(401).json({ message: 'Unauthorized User' });
        }
      });
  } else {
    // Status 401: unauthorized client/lacks valid authentication credentials 
    res.status(401).json({ message: 'Must be logged in' });
  };
});



// PUT Update User by ID.  This route will use the authorization service .verifyUser()method.  (Admin Protected)
router.put("/:id", function (req, res) {
  let token = req.cookies.jwt;
  if (token) {
    authService.verifyUser(token)
      .then(user => {
        if (user.Admin) {
          let userId = parseInt(req.params.id);
          models.users
            .update(req.body, { where: { UserId: userId } })
            .then(result => res.redirect('/users/' + userId))
            .catch(err => {
              // Status 400:  bad request/client error
              res.status(400).json({ message: "There was a problem updating the user. Please check the user information." });
            });
        } else {
          // Status 401: unauthorized client/lacks valid authentication credentials 
          res.status(401).json({ message: 'Unauthorized User' });
        }
      });
  } else {
    // Status 401: unauthorized client/lacks valid authentication credentials 
    res.status(401).json({ message: 'Must be logged in' });
  };
});



// DELETE User by ID. This route will use the authorization service .verifyUser()method. (Admin Protected)
router.delete("/:id", function (req, res) {
  let token = req.cookies.jwt;
  if (token) {
    authService.verifyUser(token)
      .then(user => {
        if (user.Admin) {
          let UserId = parseInt(req.params.id);
          models.users
            .update({ Deleted: true }, { where: { UserId: UserId } })
            .then(result => res.json({ message: 'User successfully deleted.' }))
            .catch(err => {
              // Status 400:  bad request/client error
              res.status(400).json({ message: "There was a problem deleting the product. Please make sure you are specifying the product id." });
            })
        } else {
          // Status 401: unauthorized client/lacks valid authentication credentials 
          res.status(401).json({ message: 'Unauthorized User' });
        }
      })
  } else {
    // Status 401: unauthorized client/lacks valid authentication credentials 
    res.status(401).json({ message: 'Must be logged in' });
  }
});

module.exports = router;