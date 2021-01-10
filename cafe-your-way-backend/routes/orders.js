var express = require('express');
var router = express.Router();
var models = require('../models');
const users = require('../models/users');
var products = require('../models/products');
var orders = require('../models/orders');
var authService = require('../services/auth');
const { where } = require('sequelize');



// GET ALL orders listing. (Admin Protected)
router.get('/', function (req, res) {
  let token = req.cookies.jwt;
  if (token) {
    authService.verifyUser(token)
      .then(user => {
        if (user.Admin) {
          models.orders.findAll({
            where: {
              Deleted: false
            },
            include: [{
              model: models.products
            }]
          })
            .then(ordersFound => {
              if (ordersFound)
                res.json({
                  ordersFound
                  // These are the fields that are rendered from the orders object:
                  // OrderId: ordersFound.OrderId,
                  // UserId: ordersFound.UserId,
                  // FirstName: ordersFound.FirstName,
                  // LastName: ordersFound.LastName,
                  // Email: ordersFound.Email,
                  // PhoneNumber: ordersFound.PhoneNumber,
                  // OrderTotal: ordersFound.OrderTotal,
                  // OrderDate: ordersFound.OrderDate,
                  // ProductId: ordersFound.ProductId,
                  // ProductName: ordersFound.ProductName,
                  // ProductPrice: ordersFound.ProductPrice,
                  // Quantity: ordersFound.Quantity,
                  // ImageUrl: ordersFound.ImageUrl,
                  // Deleted:  ordersFound.Deleted
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



// GET (A user can access ONLY THEIR ORDER. (Accessed by All Users)
router.get('/myOrders', function (req, res) {
  let token = req.cookies.jwt;
  if (token) {
    authService.verifyUser(token)
      .then(user => {
        if (user) {
          models.orders.findAll({
            where: { UserId: user.UserId, Deleted: false },
            include: [{
              model: models.products
            }]
          })
            .then(ordersFound => {
              if (ordersFound) {
                res.json(
                  {
                    ordersFound
                    // These are the fields that are rendered from the order's object:
                    // OrderId: ordersFound.OrderId,
                    // UserId: ordersFound.UserId,
                    // FirstName: ordersFound.FirstName,
                    // LastName: ordersFound.LastName,
                    // Email: ordersFound.Email,
                    // PhoneNumber: ordersFound.PhoneNumber,
                    // OrderTotal: ordersFound.OrderTotal,
                    // OrderDate: ordersFound.OrderDate,
                    // ProductId: ordersFound.ProductId,
                    // ProductName: ordersFound.ProductName,
                    // ProductPrice: ordersFound.ProductPrice,
                    // Quantity: ordersFound.Quantity,
                    // ImageUrl: ordersFound.ImageUrl, 
                    // Deleted: ordersFound.Deleted

                  });

              } else {
                res.json({ message: 'Orders not found' });
              };
            })
        } else {
          res.status(401).json({ message: 'Unauthorized User' });
        }
      });
  } else {
    res.status(401).json({ message: 'Must be logged in' });
  }
});



// GET BY ID orders listing (Admin Protected)
router.get('/:id', function (req, res) {
  let token = req.cookies.jwt;
  if (token) {
    authService.verifyUser(token)
      .then(user => {
        if (user.Admin) {
          models.orders.findOne({
            where: { OrderId: parseInt(req.params.id) },
            include: [{
              model: models.products
            }]
          })
            .then(orderFound => {
              if (orderFound) {
                res.json(
                  {
                    orderFound
                    // These are the fields that are rendered from the orders object:
                    // OrderId: orderFound.OrderId,
                    // UserId: orderFound.UserId,
                    // FirstName: orderFound.FirstName,
                    // LastName: orderFound.LastName,
                    // Email: orderFound.Email,
                    // PhoneNumber: orderFound.PhoneNumber,
                    // OrderTotal: orderFound.OrderTotal,
                    // OrderDate: orderFound.OrderDate,
                    // ProductId: orderFound.ProductId,
                    // ProductName: orderFound.ProductName,
                    // ProductPrice: orderFound.ProductPrice,
                    // Quantity: orderFound.Quantity,
                    // ImageUrl: orderFound.ImageUrl,
                    // Deleted: orderFound.Deleted
                  });

              } else {
                res.json('Order not found');
              };
            })
        } else {
          res.status(401).json({ message: 'Unauthorized User' });
        }
      });
  } else {
    res.status(401).json({ message: 'Must be logged in' });
  }
});



// POST Create Orders (Accessible by All Users)
router.post('/', function (req, res) {
  let token = req.cookies.jwt;
  if (token) {
    authService.verifyUser(token)
      .then(user => {
        if (user) {
          models.orders.create({
            UserId: user.UserId,
            FirstName: user.FirstName,
            LastName: user.LastName,
            Email: user.Email,
            PhoneNumber: user.PhoneNumber,
            OrderTotal: req.body.OrderTotal,
            OrderDate: req.body.OrderDate,
            Deleted: false

          })
            .then(function (createdOrder) {
              if (createdOrder) {
                let products = req.body.Products;
                let productArray = [];
                products.forEach(product => {
                  productArray.push({
                    OrderId: createdOrder.OrderId,
                    ProductId: product.ProductId,
                    ProductName: product.ProductName,
                    ProductPrice: product.ProductPrice,
                    Quantity: product.Quantity
                  })
                })
                models.orders_products.bulkCreate(productArray, {
                  // This is the array of fields that are rendered into the "orders_products" models folder:
                  // fields: ['OrderId', 'ProductId', 'ProductName', 'ProductPrice', 'Quantity'],
                  returning: true
                }).then(result => {
                  res.json({ message: 'Order successfully created' });

                })

              } else {
                res.status(400).json({ message: 'There seems to be a problem creating your order.  Please re-verify the information submitted.' });
              }
            })
        }
      }
      );



    // PUT Update Orders by ID (Admin Protected)
    router.put("/:id", function (req, res) {
      let token = req.cookies.jwt;
      if (token) {
        authService.verifyUser(token)
          .then(user => {
            if (user.Admin) {
              let orderId = parseInt(req.params.id);
              models.orders
                .update(req.body, { where: { OrderId: orderId } })
                .then(result => res.redirect('/orders/' + orderId))
                .catch(err => {
                  res.status(400).json({ message: "There was a problem updating the order. Please reverify the product information." });
                })
            } else {
              res.status(401).json({ message: 'Unauthorized User' });
            };
          });
      } else {
        res.status(401).json({ message: 'Must be logged in' });
      }
    });



    // DELETE Order By ID (Admin Protected)
    router.delete("/:id", function (req, res) {
      let token = req.cookies.jwt;
      if (token) {
        authService.verifyUser(token)
          .then(user => {
            if (user.Admin) {
              let orderId = parseInt(req.params.id);
              models.orders
                .update({ Deleted: true }, { where: { OrderId: orderId } })
                .then(result => res.json({ message: 'Order successfully deleted.' }))
                .catch(err => {
                  res.status(400).json({ message: "There was a problem deleting the order. Please make sure you are specifying the order id." });
                })
            } else {
              res.status(401).json({ message: 'Unauthorized User' });
            };
          });
      } else {
        res.status(401).json({ message: 'Must be logged in' });
      }
    });
  }
})



module.exports = router;