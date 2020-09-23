const bcrypt = require('bcryptjs');

const helpers = {};

helpers.encryptPassword = async (password) => { //resivimos la constraseña en texto plano
  const salt = await bcrypt.genSalt(10); //Lo ejecutaremos 10 veces
  const hash = await bcrypt.hash(password, salt); //damos la contraseña y el patron paraque cifre la contraseña
  return hash;
};

helpers.matchPassword = async (password, savedPassword) => {
  try {
    /*return*/ await bcrypt.compare(password, savedPassword);//comparo lo que tengo, con lo que es usuario queire logearse
  } catch (e) {
    console.log(e)
  }
};

module.exports = helpers;