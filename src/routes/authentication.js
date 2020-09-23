const { Router } = require('express');
const express = require('express');
const { Passport } = require('passport');
const router = express.Router();

const passport = require('passport');

// SIGNUP
router.get('/signup', (req, res) => {
    res.render('auth/signup.hbs'); //hbs
  });

    router.post('/signup' , passport.authenticate('local.signup',{
      successRedirect: '/profile',
      failureRedirect: '/signup',
      failureFlash: true
    }));

  
router.get('/signin', (req, res ) => {
    res.render('auth/signin.hbs'); //hbs
  });


  router.post('signin', (req,res,next) => {
    passport.authenticate('local.signin',{
      successRedirect: '/profile', // si todo se redirecciona bien me manda profile
      failureRedirect: '/signin',// si todo sale mal que me mande a signin
      failureFlash: true
    })(req,res,next);
  });

  router.get('/profile', (req, res) => {
    res.send('this is your Profile')

  });


module.exports = router;

