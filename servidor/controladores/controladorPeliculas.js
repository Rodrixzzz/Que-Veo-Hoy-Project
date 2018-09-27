var DB = require("../lib/conexionbd");
var handler = require("../lib/handlers");
// Funcion para una pelicula especifica.
function getPeliculaByID(req, res) {
  var sql =
    "select peli.*,gen.nombre as genero from pelicula peli,genero gen where peli.id =" +
    req.params.id +
    " and gen.id = peli.genero_id";
  var sqlActores =
    "select act.nombre from actor act,actor_pelicula actxpeli where act.id = actxpeli.actor_id and actxpeli.pelicula_id = " +
    req.params.id;
  executeById(sql, sqlActores, res);
}
// Funcion para devolver todas las peliculas, manejando los distintos filtros.
function getPeliculas(req, res) {
  var sql = [];
  if (
    req.query.titulo === undefined &&
    req.query.anio === undefined &&
    req.query.genero === undefined
  ) {
    sql = handler.defaultHandler(req);
  } else {
    sql = handler.queryHandler(req);
  }
  executeHandler(sql, res);
}
function getPeliculasRecomendadas(req, res) {
  var sql = "";
  if (req.query.puntuacion !== undefined) {
    sql = handler.puntuadasHandler(req);
  } else {
    if (req.query.anio_inicio === undefined) {
      sql = handler.recomendadGeneroHandler(req);
    } else {
      sql = handler.recomendadasHandler(req);
    }
  }
  executeRecomendacion(sql, res);
}
function executeHandler(sql, res) {
  DB.query(sql[0], function(error, result, fields) {
    if (error) {
      errorFormat(error);
    } else {
      DB.query(sql[1], function(errorCant, resultCant, fieldsCant) {
        if (errorCant) {
          errorFormat(errorCant);
        }
        var response = { peliculas: result, total: resultCant[0].total };
        res.send(JSON.stringify(response));
      });
    }
  });
}
function executeById(sql, sqlActores, res) {
  DB.query(sql, function(error, result, fields) {
    if (error) {
      errorFormat(error);
    }
    DB.query(sqlActores, function(errorAct, resultAct, fieldsAct) {
      if (errorAct) {
        errorFormat(errorAct);
      }
      var response = {
        pelicula: result[0],
        actores: resultAct,
        genero: result[0].genero
      };
      res.send(JSON.stringify(response));
    });
  });
}
function executeRecomendacion(sql, res) {
  DB.query(sql, function(error, result, fields) {
    if (error) {
      errorFormat(error);
    }
    var response = {
      peliculas: result
    };
    res.send(JSON.stringify(response));
  });
}
function errorFormat(error) {
  console.log("Error SQL");
  console.log(error.code);
  console.log(error.sqlMessage);
  console.log(error.sqlState);
}

module.exports = {
  getPeliculas: getPeliculas,
  getPeliculaByID: getPeliculaByID,
  getPeliculasRecomendadas: getPeliculasRecomendadas
};
