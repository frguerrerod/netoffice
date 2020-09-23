const express = require('express');
const router = express.Router();

//importar una conexión a DB
const pool = require('../database');

//para la pteción add, luego devolver algo
router.get('/add', (req,res) => {
    //res.render('links/add');
    //res.json('links/add'); 
    //res.render('links/add');
    res.render('links/add.hbs')
});

router.post('/add', async (req,res) => {
    const { title, url, description } = req.body; //Obtener datos title,url,description
    const newlink ={ //Se gurdaran en un nuevo objeto
        title,
        url,
        description

    };

    //Guardar datos en la BD
    await pool.query('INSERT INTO links set?', [newlink]);//Inserción
    //console.log(newlink); //Lo veremos por consola
    
    res.send('Recibido'); //recibido 

});

//Realizar cambios a futuro
router.post('/', async (req,res) =>{
   const links = await pool.query('SELECT * FROM links');
   console.log('links'); //Mostrar por consola
});


module.exports = router;
