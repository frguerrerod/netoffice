const mysql = require('mysql');
const {promisify} = require('util');

 const {database} = require('./keys'); 

 /*tareas en secuencias, crea conexión a BD*/
 const pool = mysql.createPool(database);

 //utilizando la conexión
 pool.getConnection((err,connection) =>{
     if (err){ //si se optiene un error mostrar por consola 
         if (err.code === 'PROTOCOL_CONNECTION_LOST'){
             console.error('DATABASE CONNECTION WAS CLOSED');
         }
         if (err.code === 'ER_CON_COUNT_ERROR'){
             console.error('DATABASE HAS TO MANY CONNECTIONS');
         }
         if(err.code === 'ENCONNREFUSED'){
             console.error('DATABASE CONNECTION WAS REFUSED');
         }
     } 
     //empezando la conexión
     if (connection)connection.release();
     console.log('DB is Connected'); // La BD esta conectada
     return;
 }); 

 //Pasar modelos pool pero solo queryss
pool.query = promisify(pool.query);

//Exportar modulo 
 module.exports = pool;