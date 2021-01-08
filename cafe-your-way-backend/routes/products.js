var express = require('express');
var router = express.Router();
var models = require('../models');
const users = require('../models/users');
var products = require('../models/products');
var orders = require('../models/orders');
var cors = require('cors');
var authService = require('../services/auth');



// GET ALL products listing. (Accessible by All Users)
router.get('/', function (req, res) {
  models.products.findAll({}).then(products => {
    res.json({
      products
      //   These are the fields that are rendered from the products object:
      //   ProductId: products.ProductId,
      //   ProductName: products.ProductName,
      //   ProductPrice: products.ProductPrice,
      //   ImageUrl: products.ImageUrl,
      //   Deleted:  products.Deleted
    });
  })
});



// GET BY ID products listing (Accessible by All Users)
router.get('/:id', function (req, res) {
  models.products.findOne({
    where: {
      ProductId: parseInt(req.params.id)
    }
  })
    .then(productFound => {
      if (productFound) {
        res.json(
          {
            productFound
            //   These are the fields that are rendered from the products object:
            //   ProductId: productFound.ProductId,
            //   ProductName: productFound.ProductName,
            //   ProductPrice: productFound.ProductPrice,
            //   ImageUrl: productFound.ImageUrl,
            //   Deleted: productFound.Deleted
          });
      } else {
        res.json('Product not found');
      }
    })
});



// POST findOrCreate product (Admin Protected)
router.post('/', function (req, res) {
  let token = req.cookies.jwt;
  if (token) {
    authService.verifyUser(token)
      .then(user => {
        if (user.Admin) {
          models.products.findOrCreate({
            where: {
              ProductName: req.body.ProductName,
              ProductPrice: req.body.ProductPrice,
              ImageUrl: req.body.ImageUrl,
            }
          })
            .spread(function (result, created) {
              if (created) {
                res.json({ message: 'Product successfully created' });
              } else {
                res.status(400).json({ message: 'This product already exists' });
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




// PUT Update Products by ID (Admin Protected)
router.put("/:id", function (req, res) {
  let token = req.cookies.jwt;
  if (token) {
    authService.verifyUser(token)
      .then(user => {
        if (user.Admin) {
          let productId = parseInt(req.params.id);
          models.products
            .update(req.body, { where: { ProductId: productId } })
            .then(result => res.redirect('/products/' + productId))
            .catch(err => {
              res.status(400).json({ message: "There was a problem updating the product. Please check the product information." });
            })
        } else {
          res.status(401).json({ message: 'Unauthorized User' });
        };
      });
  } else {
    res.status(401).json({ message: 'Must be logged in' });
  }
});



// DELETE Product By ID (Admin Protected)
router.delete("/:id", function (req, res) {
  let token = req.cookies.jwt;
  if (token) {
    authService.verifyUser(token)
      .then(user => {
        if (user.Admin) {
          let ProductId = parseInt(req.params.id);
          models.products
            .update({ Deleted: true }, { where: { ProductId: ProductId } })
            .then(result => res.json({ message: 'Product successfully deleted.' }))
            .catch(err => {
              res.status(400).json({ message: "There was a problem deleting the product. Please make sure you are specifying the product id." });
            })
        } else {
          res.status(401).json({ message: 'Unauthorized User' });
        };
      });
  } else {
    res.status(401).json({ message: 'Must be logged in' });
  }
});


module.exports = router;
