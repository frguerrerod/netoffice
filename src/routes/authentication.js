const express = require('express');
const router = express.Router();

const passport = require('passport');
const { isLoggedIn, isNotLoggeIn } = require('../lib/auth');

// SIGNUP
router.get('/signup',isNotLoggeIn, (req, res) => {
  res.render('auth/signup');
});

router.post('/signup', isNotLoggeIn, passport.authenticate('local.signup',{
      successRedirect: '/profile',
      failureRedirect: '/signup',
      failureFlash: true

}));

// SIGNIN

router.get('/signin', isNotLoggeIn, (req, res ) => { 
    res.render('auth/signin.hbs'); //hbs
  });


  router.post('/signin',isNotLoggeIn, (req,res,next) => { // para que no me muestre la vista de logeo si la lo estoy 
     
    //SE PUEDE SACAR
    /*req.check('username', 'Username is Required').notEmpty();
    req.check('password', 'Password is Required').notEmpty();
    const errors = req.validationErrors();
    if (errors.length > 0) {
      req.flash('message', errors[0].msg);
      res.redirect('/signin');
    } */   //SE PUEDE SACAR

    passport.authenticate('local.signin',{
      successRedirect: '/profile', // si todo se redirecciona bien me manda profile
      failureRedirect: '/signin',// si todo sale mal que me mande a signin
      failureFlash: true
    })(req,res,next);
  });
  

 router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile');
 });  

  router.get('/logout',isLoggedIn, (req, res) => {
    req.logOut(); // una vez que ya no estare el usuario 
    res.redirect('/signin'); // se redireccionara a esta vista
  });


module.exports = router;

