var DB = require("../lib/conexionbd");
var handler = require("../lib/handlers");
function getAllGeneros(req, res) {
  var sql = handler.GetGenerosAll();
  DB.query(sql, function(error, resultados, fields) {
    if (error) {
      errorFormat(error);
      res.send({ generos: [] });
    }
    var response = { generos: resultados };
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
  getAllGeneros: getAllGeneros
};
