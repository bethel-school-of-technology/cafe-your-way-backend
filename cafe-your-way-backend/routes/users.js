// @ts-nocheck
var express = require('express');
var router = express.Router();
var models = require('../models');
var users = require('../models/users');
var authService = require('../services/auth');
var products = require('../models/products');
var orders = require('../models/orders');



// POST SIGNUP users (users sign up and create an account if an account does not exist and returns JWT token as cookie) - (Accessible by All Users)
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
      Password: authService.hashPassword(req.body.Password)
    }
  })
    .spread(function (result, created) {
      if (created) {
        res.json({ message: 'User successfully created' });
      } else {
        res.json({ message: 'This user already exists' });
      }
    });
});


// POST LOGIN (users login and JWT is returned as cookie.  User is authenticated with a JWT token. Also, checks if the requesting user is marked asn "Admin" in the database. (Accessible by All Users)
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
          res.json({ message: 'User successfully logged in' });
        } else {
          res.json({ message: 'wrong password' });
        }
      } else {
        res.json({ message: 'wrong user name' });
      }
    })
});



// POST LOGOUT (user logs out using JWT token that expires immediately) (Accessible by All Users)
router.post('/logout', function (req, res) {
  res.cookie('jwt', '', { expires: new Date(0) });
  res.json({ message: 'Successfully logged out' });
});



// GET ALL users listing.  (Admin Protected)
router.get('/', function (req, res) {
  let token = req.cookies.jwt;
  if (token) {
    authService.verifyUser(token)
      .then(user => {
        if (user.Admin) {
          models.users.findAll({}).then(users => {
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
          res.status(401).json({ message: 'Unauthorized User' });
        }
      });
  } else {
    res.status(401).json({ message: 'Must be logged in' });
  };
});



// GET BY ID users listing  (Admin Protected)
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
          res.status(401).json({ message: 'Unauthorized User' });
        }
      });
  } else {
    res.status(401).json({ message: 'Must be logged in' });
  };
});




// PUT Update User by ID  (Admin Protected)
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
              res.status(400).json({ message: "There was a problem updating the user. Please check the user information." });
            });
        } else {
          res.status(401).json({ message: 'Unauthorized User' });
        }
      });
  } else {
    res.status(401).json({ message: 'Must be logged in' });
  };
});



// DELETE User by ID (Admin Protected)
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
              res.status(400).json({ message: "There was a problem deleting the product. Please make sure you are specifying the product id." });
            })
        } else {
          res.status(401).json({ message: 'Unauthorized User' });
        }
      })
  } else {
    res.status(401).json({ message: 'Must be logged in' });
  }
});


module.exports = router;





// **************************Router.GET PROFILE ROUTE****************************
// GET PROFILE (a user will only be able to access and view their profile and no one else's profile once they are logged in). This route will use the authentication service to determine if a user can be found based on the JWT token stored as a cookie. This route will use the authentication service .verifyUser() method.
// router.get('/profile', function(req, res) {
//   let token = req.cookies.jwt;
//   if (token) {
//   authService.verifyUser(token)
//     .then(user => {
//       if (user) {
//         res.json({ user} )
//       } else {
//         res.status(401).json({ message: 'Invalid authentication token'});
//       }
//     });
//   } else {
//     res.status(401).json({ message: 'Must be logged in'});
//   };
// });
// **************************Router.GET PROFILE ROUTE********************************