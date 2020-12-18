var  express = require('express');
const res = require('express/lib/response');
var router = express.Router();
var models = require('../models');
const users = require('../models/users');
var customers = require('../models/customers');
var products = require('../models/products');
var orders = require('../models/orders');
var OrderDetails = require('../models/OrderDetails');


// GET ALL orders listing. */
router.get('/', function(req, res) {
  models.orders.findAll({}).then(orders => {
    res.json({ orders });
  })
});


// GET BY ID orders listing
router.get('/:id', function (req, res) {
  models.orders.findOne({
    where: { OrderId: parseInt(req.params.id)
    }})
    .then(orderFound => {
      if(orderFound) {
        res.json(
        {
          OrderId:    orderFound.OrderId,
          CustomerId: orderFound.CustomerId,
          OrderDate:  orderFound.OrderDate
        });
      } else {
        res.json('Order not found');
      }
    })
  });



// POST findOrCreate orders
router.post('/', function(req, res) {
  models.orders.findOrCreate({
    where: { 
      CustomerId: req.body.CustomerId,
      OrderDate: req.body.OrderDate,
    }
  })
.spread(function(result, created) {
  if (created) {
  res.json({ message: 'Order successfully created'});
  } else {
    res.status(400).json({ message: 'This order already exists'});
  }
  })
});


// DELETE Order By ID
router.delete("/:id", function (req, res) {
  let orderId = parseInt(req.params.id);
  models.orders
    .destroy({where: { OrderId: orderId }})
    .then(result => res.json({message: 'Order successfully deleted.'}))
    .catch(err => { 
      res.status(400).json({ message: "There was a problem deleting the order. Please make sure you are specifying the order id."});
    }
);
});


 // PUT Update Orders by ID
router.put("/:id", function (req, res) {
  let orderId = parseInt(req.params.id);
  models.orders
    .update(req.body, { where: { OrderId: orderId } })
    .then(result => res.redirect('/orders/' + orderId))
    .catch(err => {
      res.status(400).json({ message: "There was a problem updating the order. Please check the order information."});
    });
});



module.exports = router;





