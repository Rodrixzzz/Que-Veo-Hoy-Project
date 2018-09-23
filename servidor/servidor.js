//paquetes necesarios para el proyecto
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var peliculas = require("./controladores/controladorPeliculas");
var generos = require("./controladores/controladorGeneros");
var app = express();

app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(bodyParser.json());

//Manejo request peliculas
app.get("/peliculas", peliculas.getPeliculas);
app.get("/peliculas/recomendacion", peliculas.getPeliculasRecomendadas);
app.get("/peliculas/:id", peliculas.getPeliculaByID);
//Manejo request Generos
app.get("/generos", generos.getAllGeneros);

//seteamos el puerto en el cual va a escuchar los pedidos la aplicación
var puerto = "8080";

app.listen(puerto, function() {
  console.log("Escuchando en el puerto " + puerto);
});
