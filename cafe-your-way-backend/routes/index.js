var express = require('express');
var router = express.Router();
var hbs = require('hbs');
var models = require('../models');
var users = require('../models/users');
var index = require('../models/index');
var products = require('../models/products');
var orders = require('../models/orders');
var authService = require('../services/auth');
const { authRole, signUser } = require('../services/auth');


/* GET home page. */
router.get('/home', function (req, res) {
  res.render('users', {
    title: 'Café Your Way',
    items: ['Specialty Coffees', 'Herbal Teas', 'Delicious Pastries']
  });
});


// GET signup page
router.get('/signup', function (req, res) {
  res.render('signup', {
    title: 'Café Your Way'
  });
});


// POST signup page
router.post('/signup', function (req, res) {
  res.render('signup', {
    title: 'Café Your Way'
  });
});

// POST profile page
router.post('/profile', function (req, res) {
  res.render('userProfile', {
    title: 'Café Your Way'
  });
});


module.exports = router;