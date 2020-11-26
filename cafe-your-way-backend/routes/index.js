var express = require('express');
var router = express.Router();
var hbs = require('hbs'); 
var users = require('../models/users');
var index = require('../models/index')

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { 
    title: 'Café Your Way' ,
    items: ['Specialty Coffees', 'Herbal Teas', 'Delicious Pastries']
  });
});

// // POST signup page
router.get('/signup', function(req, res) {
    res.render('signup', {
    title: 'Café Your Way'});
});

// POST profile page
router.post('/profile', function(req, res) {
    res.render('userprofile', {
    title: 'Café Your Way' });
});


module.exports = router;