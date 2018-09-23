var selectPrincipio = "Select * from pelicula ";
var selectRecomendada =
  "Select peli.*,gen.nombre from pelicula peli, genero gen where gen.nombre = '";
//La generica maneja tipo de orden,cantidad y numero de pagina que siempre vienen informados.
function defaultHandler(req) {
  var pagina = req.query.pagina - 1;
  pagina *= req.query.cantidad;
  var sql =
    selectPrincipio +
    "order by " +
    req.query.columna_orden +
    " " +
    req.query.tipo_orden +
    " limit " +
    pagina +
    "," +
    req.query.cantidad;
  var queryCantidad = "Select count(1) as total from pelicula";
  return [sql, queryCantidad];
}
function titleHandler(req) {
  var pagina = req.query.pagina - 1;
  pagina *= req.query.cantidad;
  var sql =
    selectPrincipio +
    "where titulo like '%" +
    req.query.titulo +
    "%'" +
    " order by " +
    req.query.columna_orden +
    " " +
    req.query.tipo_orden +
    " limit " +
    pagina +
    "," +
    req.query.cantidad;
  console.log(sql);
  var queryCantidad =
    "Select count(1) as total from pelicula where titulo like " +
    "'%" +
    req.query.titulo +
    "%'";
  return [sql, queryCantidad];
}
function yearHandler(req) {
  var pagina = req.query.pagina - 1;
  pagina *= req.query.cantidad;
  var sql =
    selectPrincipio +
    "where anio = " +
    req.query.anio +
    " order by " +
    req.query.columna_orden +
    " " +
    req.query.tipo_orden +
    " limit " +
    pagina +
    "," +
    req.query.cantidad;
  var queryCantidad =
    "Select count(1) as total from pelicula where anio = " + req.query.anio;
  return [sql, queryCantidad];
}
function genreHandler(req) {
  var pagina = req.query.pagina - 1;
  pagina *= req.query.cantidad;
  var sql =
    selectPrincipio +
    "where genero_id = " +
    req.query.genero +
    " order by " +
    req.query.columna_orden +
    " " +
    req.query.tipo_orden +
    " limit " +
    pagina +
    "," +
    req.query.cantidad;
  var queryCantidad =
    "Select count(1) as total from pelicula where genero_id = " +
    req.query.genero;
  return [sql, queryCantidad];
}
function genreYearHandler(req) {
  var pagina = req.query.pagina - 1;
  pagina *= req.query.cantidad;
  var sql =
    selectPrincipio +
    "where genero_id = " +
    req.query.genero +
    " and anio = " +
    req.query.anio +
    " order by " +
    req.query.columna_orden +
    " " +
    req.query.tipo_orden +
    " limit " +
    pagina +
    "," +
    req.query.cantidad;
  var queryCantidad =
    "Select count(1) as total from pelicula where genero_id = " +
    req.query.genero +
    " and anio = " +
    req.query.anio;
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
    " and peli.puntuacion > " +
    req.query.puntuacion;
  return sql;
}
function recomendadGeneroHandler(req) {
  var sql = selectRecomendada + req.query.genero + "'";
  return sql;
}
module.exports = {
  defaultHandler: defaultHandler,
  genreHandler: genreHandler,
  yearHandler: yearHandler,
  titleHandler: titleHandler,
  genreYearHandler: genreYearHandler,
  recomendadasHandler: recomendadasHandler,
  puntuadasHandler: puntuadasHandler,
  recomendadGeneroHandler: recomendadGeneroHandler
};
