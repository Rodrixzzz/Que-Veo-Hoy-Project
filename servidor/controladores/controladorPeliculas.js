var DB = require('../lib/conexionbd');

function getPeliculas(req,res) {
    var sql = 'Select * from pelicula where id BETWEEN 1 AND 3';
    DB.query(sql,function(error,resultados,fields) {
        if(error){
            errorFormat(error);
            res.send({peliculas:[]});
        }
        var response = { peliculas : resultados};
        res.send(JSON.stringify(response));
    });
} 

function errorFormat(error){
    console.log('Error SQL');
    console.log(error.code);
    console.log(error.sqlMessage);
    console.log(error.sqlState);
}

module.exports = {
    getPeliculas : getPeliculas
};