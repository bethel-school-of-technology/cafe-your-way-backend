var  express = require('express');
const res = require('express/lib/response');
var router = express.Router();
var models = require('../models');
const users = require('../models/users')
var customers = require('../models/customers');
var products = require('../models/products');
var orders = require('../models/orders');
var OrderDetails = require('../models/OrderDetails');


// GET ALL customers listing. */
router.get('/', function(req, res) {
  models.customers.findAll({}).then(customers => {
    res.json({ customers });
  })
});


// GET BY ID customers listing
router.get('/:id', function (req, res) {
  models.customers.findOne({
    where: { CustomerId: parseInt(req.params.id)
    }})
    .then(customerFound => {
      if(customerFound) {
        res.json(
        {
          CustomerId:  customerFound.CustomerId,
          FirstName:   customerFound.FirstName,
          LastName:    customerFound.LastName,
          Email:       customerFound.Email,
          Address1:    customerFound.Address1,
          Address2:    customerFound.Address2,
          City:        customerFound.City,
          State:       customerFound.State,
          ZipCode:     customerFound.ZipCode,
          PhoneNumber: customerFound.PhoneNumber, 
        });
      } else {
        res.json('Customer not found');
      }
    })
  });
  

  // POST findOrCreate Customer
  router.post('/', function(req, res) {
    models.customers.findOrCreate({
      where: { 
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Email: req.body.Email,
        Address1: req.body.Address1,
        Address2: req.body.Address2,
        City: req.body.City,
        State: req.body.State,
        ZipCode: req.body.ZipCode,
        PhoneNumber: req.body.PhoneNumber,
      }
    })
  .spread(function(result, created) {
    if (created) {
    res.json({ message: 'Customer was successfully created'});
    } else {
      res.status(400).json({ message: 'Customer already exists'});
    }
    })
  });


  // DELETE Customer By ID
router.delete("/:id", function (req, res) {
  let customerId = parseInt(req.params.id);
  models.customers
    .destroy({where: { CustomerId: customerId }})
    .then(result => res.json({message: 'Customer successfully deleted.'}))
    .catch(err => { 
      res.status(400).json({ message: "There was a problem deleting the Customer. Please make sure you are specifying the customer id."});
    }
);
});


 // PUT Update Customer by ID
router.put("/:id", function (req, res) {
  let customerId = parseInt(req.params.id);
  models.customers
    .update(req.body, { where: { CustomerId: customerId } })
    .then(result => res.redirect('/customers/' + customerId))
    .catch(err => {
      res.status(400).json({ message: "There was a problem updating the customer. Please check the customer information."});
    });
});
  

module.exports = router;


