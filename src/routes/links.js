const express = require('express');
const router = express.Router();

//importar una conexión a DB
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');


//para la pteción add, luego devolver algo
router.get('/add', (req,res) => {
    res.render('links/add.hbs')//.hbs
});

router.post('/add', async (req,res) => {
    const { title, url, description } = req.body; //Obtener datos title,url,description
    const newlink ={ //Se gurdaran en un nuevo objeto
        title,
        url,
        description,
        user_id: req.user.id

    };

    //Guardar datos en la BD

    await pool.query('INSERT INTO links set ?', [newLink]);//Inserción
    req.flash('success', 'Link Saved Successfully');
    res.redirect('/links');

});


router.get('/', isLoggedIn, async (req, res) => {
    const links = await pool.query('SELECT * FROM links WHERE user_id = ?', [req.user.id]);
    res.render('links/list', { links }); //.hbs
});

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM links WHERE ID = ?', [id]);
    req.flash('success', 'Link Removed Successfully');
    res.redirect('/links');
});

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const links = await pool.query('SELECT * FROM links WHERE id = ?', [id]);
    console.log(links);
    res.render('links/edit', {link: links[0]});
});

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, url} = req.body; 
    const newLink = {
        title,
        description,
        url
    };
    await pool.query('UPDATE links set ? WHERE id = ?', [newLink, id]);
    req.flash('success', 'Link Updated Successfully');
    res.redirect('/links');
});

module.exports = router;
