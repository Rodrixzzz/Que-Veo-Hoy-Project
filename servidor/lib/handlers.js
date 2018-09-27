var selectPrincipio = "Select * from pelicula ";
var selectCount = "Select count(1) as total from pelicula ";
var selectLimit = " limit ";
var selectOrder = " order by ";
var selectRecomendada =
  "Select peli.*,gen.nombre from pelicula peli, genero gen where gen.nombre = '";
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
  var sql =
    selectRecomendada +
    req.query.genero +
    "'" +
    " and peli.genero_id = gen.id" +
    " and peli.puntuacion >= " +
    req.query.puntuacion;
  return sql;
}
function recomendadGeneroHandler(req) {
  var sql = selectRecomendada + req.query.genero + "'";
  return sql;
}
module.exports = {
  defaultHandler: defaultHandler,
  queryHandler: queryHandler,
  recomendadasHandler: recomendadasHandler,
  puntuadasHandler: puntuadasHandler,
  recomendadGeneroHandler: recomendadGeneroHandler
};
