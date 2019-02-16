var DB = require("../lib/conexionbd");
var handler = require("../lib/handlers");
// Funcion para una pelicula especifica.
function getPeliculaByID(req, res) {
  var sql = handler.GetPelisById(req);
  executeById(sql, res);
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
      if(req.query.genero ===undefined){
        sql = handler.recomendadDefaultHandler();
      }
      else
      {
        sql = handler.recomendadGeneroHandler(req);
      }
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
function executeById(sql, res) {
  DB.query(sql[0], function(error, result, fields) {
    if (error) {
      errorFormat(error);
    }
    DB.query(sql[1], function(errorAct, resultAct, fieldsAct) {
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
