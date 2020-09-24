module.exports = {  //exportara un objeto 
    isLoggedIn (req, res, next) { // este objeto comprobara si el usuario esta logeado o no 
        if (req.isAuthenticated()) { //Nos devulve un true o un false
            return next();
        }
        return res.redirect('/signin');
    },
    
    
    isNotLoggeIn(req, res, next) {
        if(!req.isAuthenticated()){ // si el usuario no esta autenticado 
            return next(); //retorna al siguiente

    }
    return res.redirect('/profile');
    }

};