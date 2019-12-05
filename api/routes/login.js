const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('config');

const secret = config.get('JWT_SECRET');
const User = require('../models/User');


router.post('/', (req, res) => {
  const { email, password } = req.body;
  User.findOne({email})
  .then(user => {
    bcrypt.compare(password, user.password, (err, result) => {
      if(err){
        res.status(401).json({
          message: 'Auth failed'
        });
      }
      if(result){
        const token = jwt.sign({email, firstName: user.firstName, lastName: user.lastName}, secret, {expiresIn: "200000000h"});
        res.cookie('token', token);
        res.status(200).json({
          message: `Auth Successful`
        });
      }
    });
  })
  .catch(err => {
    res.status(401).json({
      message: `Auth failed`
    })
  });
});

module.exports = router;