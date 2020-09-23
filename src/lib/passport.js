const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

 const pool = require('../database');
 const helpers =  require('./helpers');
// const helpers =  require('../lib/helpers');

 passport.use('local.signin', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {
  const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username]);//comprobar el usuario
  if (rows.length > 0) {
    const user = rows[0];
    const validPassword = await helpers.matchPassword(password, user.password)//validar contraseña del usuario con la de bd
    if (validPassword) {
      done(null, user, req.flash('success', 'Welcome ' + user.username));
    } else {
      done(null, false, req.flash('message', 'Incorrect Password'));
    }
  } else {
    return done(null, false, req.flash('message', 'El nombre de usuario no existe.'));
  }

}));

passport.use('local.signup', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {

  const { fullname } =req.body;//console.log(req.body); aqui estan los datos
  const newUser = {
    username,
    password,
    fullname
    
  };

  newUser.password = await helpers.encryptPassword(password);
  // Guardar en la base de datos
  const result = await pool.query('INSERT INTO users SET ? ', newUser);
  newUser.id = result.insertId;
  return done(null, newUser);

}));



passport.serializeUser((user, done) => { //Para guardar el usuario dentro de la sesión
    done(null, user.id);

});


passport.deserializeUser(async (id, done) => {
    const rows = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    done(null, rows[0]);
});





