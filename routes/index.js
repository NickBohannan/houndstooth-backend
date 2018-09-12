const express = require('express');
const router = express.Router();
const Item = require('../models/index')
const nodemailer = require('nodemailer');
const account = require('../config')

// nodemailer
var transport = {
  host: 'smtp.gmail.com',
  auth: {
    user: account.user,
    pass: account.pass
  }
}

var transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});

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

router.post('/send', (req, res, next) => {
  var name = req.body.name
  var email = req.body.email
  var message = req.body.message
  var content = `name: ${name} \n email: ${email} \n message: ${message}`

  var mail = {
    from: name,
    to: 'nbohannan@gmail.com',
    subject: 'New Message from Contact Form',
    text: content
  }

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        msg: 'fail'
      })
    } else {
      res.json({
        msg: 'success'
      })
    }
  })
})

module.exports = router;
