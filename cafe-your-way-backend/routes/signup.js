var express = require('express');
var router = express.Router();
var hbs = require('hbs'); 

router.get('/signup', function(req, res) {
    res.render('signup', {
      title: 'Café Your Way'});
  });