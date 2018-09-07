const express = require('express');
const router = express.Router();
const Item = require('../models/index')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', async (req, res) => {
  Item.create({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    wood: req.body.wood
  }).then(() => {
    res.end();
  }).catch(error => {
    console.log(error);
  })
})

module.exports = router;
