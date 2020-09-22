const express = require('express');
const router = express.Router();

//importar una conexión a DB
const pool = require('../database');

//para la pteción add, luego devolver algo
router.get('/add', (req,res) => {
    //res.render('links/add');
    //res.json('links/add'); 
    res.render('links/add');
});

router.post('/add', (req,res) => {
    res.send('received'); //recibido 

});

module.exports = router;
