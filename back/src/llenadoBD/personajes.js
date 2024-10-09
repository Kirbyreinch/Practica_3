const express = require('express');
const { PersonajesModel } = require('../modelos/characters');
const axios = require('axios');


/////////////////////////////////////       Personajes          ///////////////////////////////////////
const llenarBDpersonajes = async () => {
    try {
        let page = 1;
        let pagina = true;

        while (pagina) {
            const response = await axios.get(`https://swapi.dev/api/people/?page=${page}`);
            const personajes = response.data.results;

            if (personajes.length === 0) {
                pagina = false;
                break;
            }
            const promises = personajes.map(async personaje => {
                const existePersonaje = await PersonajesModel.findOne({ Nombre: personaje.name });
                if (!existePersonaje) {
                    const nuevospersonajes = new PersonajesModel({
                        Nombre: personaje.name,
                        Fecha_Nacimiento: personaje.birth_year,
                        Color_Ojos: personaje.eye_color,
                        Genero: personaje.gender,
                        Color_Cabello: personaje.hair_color,
                        Altura: personaje.height,
                        Masa: personaje.mass,
                        Color_de_Piel: personaje.skin_color,
                    });
                    return nuevospersonajes.save();
                } else {
                    console.log(`El personaje ${personaje.name} ya existe. No se guardará.`);
                }
            });

            await Promise.all(promises);
            console.log(`Personajes de la página ${page} guardados con éxito.`);
            page++;
        }

        console.log("Todos los personajes han sido procesados.");
    } catch (error) {
        console.error("Error al llenar la base de datos: ", error.message);
    }
};

module.exports = llenarBDpersonajes;