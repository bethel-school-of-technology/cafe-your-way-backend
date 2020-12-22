var  express = require('express');
const res = require('express/lib/response');
var router = express.Router();
var models = require('../models');
const users = require('../models/users');
var customers = require('../models/customers');
var products = require('../models/products');
var orders = require('../models/orders');
var OrderDetails = require('../models/OrderDetails');
var cors = require('cors');
const { redirect } = require('express/lib/response');

// GET ALL products listing. */
router.get('/', function(req, res) {
  models.products.findAll({}).then(products => {
    res.json({ products });
  })
});

// GET BY ID products listing
router.get('/:id', function (req, res) {
  models.products.findOne({
    where: { ProductId: parseInt(req.params.id)
    }})
    .then(productFound => {
      if(productFound) {
        res.json(
        {
          ProductId: productFound.ProductId,
          ProductName: productFound.ProductName,
          ProductPrice: productFound.ProductPrice,
          ImageUrl: productFound.ImageUrl,
        });
      } else {
        res.json('Product not found');
      }
    })
  });


// POST findOrCreate product
  router.post('/', function(req, res) {
    models.products.findOrCreate({
      where: { 
        ProductName: req.body.ProductName,
        ProductPrice: req.body.ProductPrice,
        ImageUrl: req.body.ImageUrl,
      }
    })
  .spread(function(result, created) {
    if (created) {
    res.json({ message: 'Product successfully created'});
    } else {
      res.status(400).json({ message: 'This product already exists'});
    }
    })
  });


// DELETE Product By ID
  router.delete("/:id", function (req, res) {
    let productId = parseInt(req.params.id);
    models.products
      .destroy({where: { ProductId: productId }})
      .then(result => res.json({message: 'Product successfully deleted.'}))
      .catch(err => { 
        res.status(400).json({ message: "There was a problem deleting the product. Please make sure you are specifying the product id."});
      }
  );
  });

  // PUT Update Products by ID
router.put("/:id", function (req, res) {
  let productId = parseInt(req.params.id);
  models.products
    .update(req.body, { where: { ProductId: productId } })
    .then(result => res.redirect('/products/' + productId))
    .catch(err => {
      res.status(400).json({ message: "There was a problem updating the product. Please check the product information."});
    });
});


module.exports = router;

