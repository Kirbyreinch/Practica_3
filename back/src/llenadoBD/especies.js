const express = require('express');
const { especiesModel } = require('../modelos/species');
const axios = require('axios');



/////////////////////////////////////       Especies        ///////////////////////////////////////
const llenarBDespecies = async () => {
    try {

        let page = 1;
        let pagina = true;
        while (pagina) {
            const response = await axios.get(`https://swapi.dev/api/species/?page=${page}`);
            const especies = response.data.results;
            if (especies.length === 0) {
                pagina = false;
                break;
            }
            const promises = especies.map(async especie => {
                const existeEspecie = await especiesModel.findOne({ Nombre: especie.name });

                if (!existeEspecie) {
                    const nuevaEspecie = new especiesModel({
                        Nombre: especie.name,
                        Clasificacion: especie.classification,
                        Designacion: especie.designation,
                        Estatura: especie.average_height,
                        Color_de_piel: especie.skin_colors,
                        Color_de_cabello: especie.hair_colors,
                        Color_de_ojos: especie.eye_colors,
                        Promedio_de_vida: especie.average_lifespan,
                        Lenguaje: especie.language,
                    });
                    return nuevaEspecie.save();
                } else {
                    console.log(`La especie ${especie.name} ya existe. No se guardará.`);
                }
            });
            await Promise.all(promises);
            console.log("Especies guardadas con éxito.");
            page++;
        }
    } catch (error) {
        console.error("Error al llenar la base de datos: ", error.message);
    }
};

module.exports = llenarBDespecies;