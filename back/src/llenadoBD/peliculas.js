const express = require('express');
const { PelisModel } = require('../modelos/films');
const axios = require('axios');

/////////////////////////////////////           LLENADO BD          ///////////////////////////////////////
/////////////////////////////////////           Peliculas           ///////////////////////////////////////
const llenarBDpeliculas = async () => {
    try {

        const response = await axios.get(`https://swapi.dev/api/films`);
        const peliculas = response.data.results;
        const promises = peliculas.map(async peli => {
            const existepelicula = await PelisModel.findOne({ Titulo: peli.title });
            if (!existepelicula) {
                const nueevapelicula = new PelisModel({
                    Titulo: peli.title,
                    Director: peli.director,
                    Productor: peli.producer,
                });
                return nueevapelicula.save();
            } else {
                console.log(`El planeta ${peli.title} ya existe. No se guardará.`);
            }
        });
        await Promise.all(promises);
        console.log("Películas guardadas con éxito.");
    } catch (error) {
        console.error("Error al llenar la base de datos: ", error.message);
    }
};

module.exports = llenarBDpeliculas;
