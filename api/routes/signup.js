const User = require('../models/User');
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const mongoose = require('mongoose');

router.post('/', (req, res) => {
  const {firstName, lastName, email, password} = req.body
  User.find({email})
    .exec()
    .then(user => {
      if (user.length >= 1) {
        console.log(`User already exists`);
        return res.status(409).json({
          message: 'Mail already exists'
        })
      }else{
        bcrypt.hash(password, 10, (err, hash)=>{
          if (err) {
            return res.status(500).json({
              error: err
            });
          }else {
            const user = new User({
              _id: new mongoose.Types.ObjectId,
              firstName,
              lastName,
              email: req.body.email,
              password: hash
            });
            user.save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  result,
                  message: `User successfully created`
                })
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                })
              })
            }
          });
        }
    })
});


module.exports = router;