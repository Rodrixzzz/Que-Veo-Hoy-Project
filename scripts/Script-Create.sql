CREATE DATABASE QueVeo;
USE QueVeo;
CREATE TABLE pelicula (
    id INT NOT NULL AUTO_INCREMENT, 
    titulo VARCHAR(100) NOT NULL, 
    anio DECIMAL(5,0) NOT NULL, 
    duracion DECIMAL(5,0) NOT NULL, 
    director VARCHAR(400) NOT NULL,
    fecha_lanzamiento DATE NOT NULL, 
    puntuacion DECIMAL(2,0) NOT NULL, 
    poster VARCHAR(300) NOT NULL, 
    trama VARCHAR(700) NOT NULL ,
    genero_id INT,
    PRIMARY KEY(id)
);
CREATE TABLE genero (
    id INT NOT NULL AUTO_INCREMENT, 
    nombre VARCHAR(30) NOT NULL, 
    PRIMARY KEY(id)
);
CREATE TABLE actor (
    id INT NOT NULL AUTO_INCREMENT, 
    nombre VARCHAR(70) NOT NULL, 
    PRIMARY KEY(id)
);
CREATE TABLE actor_pelicula (
    id INT NOT NULL AUTO_INCREMENT, 
    actor_id    INT NOT NULL, 
    pelicula_id INT NOT NULL,
    PRIMARY KEY(id)
);

