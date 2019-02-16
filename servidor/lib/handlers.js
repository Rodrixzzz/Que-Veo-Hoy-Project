var selectPrincipio = "Select * from pelicula ";
var selectGeneros = "Select * from genero";
var selectCount = "Select count(1) as total from pelicula ";
var selectLimit = " limit ";
var selectOrder = " order by ";
var sqlActores =
  "select act.nombre from actor act,actor_pelicula actxpeli where act.id = actxpeli.actor_id and actxpeli.pelicula_id = ";
var selectPeliID =
  "select peli.*,gen.nombre as genero from pelicula peli,genero gen where gen.id = peli.genero_id and peli.id = ";
var selectRecomendada =
  "Select peli.*,gen.nombre from pelicula peli, genero gen where gen.nombre = '";
var selectRecomendadaDef =
  "Select peli.*,gen.nombre from pelicula peli, genero gen where gen.id = peli.genero_id";
//La generica maneja tipo de orden,cantidad y numero de pagina que siempre vienen informados.
function defaultHandler(req) {
  var pagina = req.query.pagina - 1;
  pagina *= req.query.cantidad;
  var sql =
    selectPrincipio +
    selectOrder +
    req.query.columna_orden +
    " " +
    req.query.tipo_orden +
    selectLimit +
    pagina +
    "," +
    req.query.cantidad;
  var queryCantidad = selectCount;
  return [sql, queryCantidad];
}
function queryHandler(req) {
  var pagina = req.query.pagina - 1;
  pagina *= req.query.cantidad;
  var sql = selectPrincipio;
  var sqlWhere = "where ";
  var cargardo = false;
  if (req.query.titulo !== undefined) {
    sqlWhere += " titulo like '%" + req.query.titulo + "%' ";
    cargardo = true;
  }
  if (req.query.anio !== undefined) {
    if (cargardo) {
      sqlWhere += " and ";
    }
    sqlWhere += "anio = " + req.query.anio;
    cargardo = true;
  }
  if (req.query.genero !== undefined) {
    if (cargardo) {
      sqlWhere += " and ";
    }
    sqlWhere += " genero_id = " + req.query.genero;
  }
  sql +=
    sqlWhere +
    selectOrder +
    req.query.columna_orden +
    " " +
    req.query.tipo_orden +
    selectLimit +
    pagina +
    "," +
    req.query.cantidad;

  var queryCantidad = selectCount + sqlWhere;
  return [sql, queryCantidad];
}
function recomendadasHandler(req) {
  var sql =
    selectRecomendada +
    req.query.genero +
    "'" +
    " and peli.genero_id = gen.id" +
    " and peli.anio BETWEEN " +
    req.query.anio_inicio +
    " and " +
    req.query.anio_fin;
  return sql;
}
function puntuadasHandler(req) {
  var sql = "";
  if (req.query.genero === undefined) {
    sql = selectRecomendadaDef;
  } else {
    sql =
      selectRecomendada +
      req.query.genero +
      "'" +
      " and peli.genero_id = gen.id";
  }
  sql = sql + " and peli.puntuacion >= " + req.query.puntuacion;
  return sql;
}
function recomendadGeneroHandler(req) {
  var sql =
    selectRecomendada + req.query.genero + "'" + " and peli.genero_id = gen.id";
  return sql;
}
function GetGenerosAll() {
  var sql = selectGeneros;
  return sql;
}
function GetPelisById(req) {
  var sql = [];
  sql[0] = selectPeliID + req.params.id;
  sql[1] = sqlActores + req.params.id;
  return sql;
}
function recomendadDefaultHandler() {
  var sql = selectRecomendadaDef;
  return sql;
}
module.exports = {
  defaultHandler: defaultHandler,
  queryHandler: queryHandler,
  recomendadasHandler: recomendadasHandler,
  puntuadasHandler: puntuadasHandler,
  recomendadGeneroHandler: recomendadGeneroHandler,
  GetGenerosAll: GetGenerosAll,
  GetPelisById: GetPelisById,
  recomendadDefaultHandler: recomendadDefaultHandler
};
