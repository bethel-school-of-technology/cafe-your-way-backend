var  express = require('express');
const res = require('express/lib/response');
var router = express.Router();
var models = require('../models');
const users = require('../models/users');
var customers = require('../models/customers');
var products = require('../models/products');
var orders = require('../models/orders');
var OrderDetails = require('../models/OrderDetails');


// GET ALL order details listing. */
router.get('/', function(req, res) {
  models.OrderDetails.findAll({}).then(OrderDetails => {
    res.json({ OrderDetails });
  })
});


// GET BY ID order details listing
router.get('/:id', function (req, res) {
  models.OrderDetails.findOne({
    where: { OrderId: parseInt(req.params.id)
    }})
    .then(OrderDetailFound => {
      if(OrderDetailFound) {
        res.json(
        {
          OrderId:    OrderDetailFound.OrderId,
<<<<<<< HEAD
          ProductId:  OrderDetailFound.ProductId,
          Quantity:   OrderDetailFound.Quantity
=======
          CustomerId: OrderDetailFound.CustomerId,
          OrderDate:  OrderDetailFound.OrderDate
>>>>>>> 78c426abab78cf7d0fe2a469d8c8a8c0087e45c9
        });
      } else {
        res.json('Order Details not found');
      }
    })
  });


 
  // POST findOrCreate order details
router.post('/', function(req, res) {
  models.OrderDetails.findOrCreate({
    where: { 
      OrderId: req.body.OrderId,
      ProductId: req.body.ProductId,
      Quantity: req.body.Quantity,
    }
  })
.spread(function(result, created) {
  if (created) {
  res.json({ message: 'Order Details were successfully created'});
  } else {
<<<<<<< HEAD
    res.status(400).json({ message: 'Order Details already exists'});
=======
    res.status(400).json({ message: 'These Order Details already exists'});
>>>>>>> 78c426abab78cf7d0fe2a469d8c8a8c0087e45c9
  }
  })
});


// DELETE Order Details By ID
router.delete("/:id", function (req, res) {
  let orderId = parseInt(req.params.id);
  models.OrderDetails
    .destroy({where: { OrderId: orderId }})
    .then(result => res.json({message: 'Order Details successfully deleted.'}))
    .catch(err => { 
      res.status(400).json({ message: "There was a problem deleting the Order Details. Please make sure you are specifying the order id."});
    }
);
});


 // PUT Update Order Details by Order Id
 router.put("/:id", function (req, res) {
  let orderId = parseInt(req.params.id);
  models.OrderDetails
    .update(req.body, { where: { OrderId: orderId } })
    .then(result => res.redirect('/OrderDetails/' + orderId))
    .catch(err => {
      res.status(400).json({ message: "There was a problem updating the order details. Please check the order details information."});
    });
});


module.exports = router;


  

  
  

  