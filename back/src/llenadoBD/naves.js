const express = require('express');
const { NavesModel } = require('../modelos/starships');
const axios = require('axios');


/////////////////////////////////////           Naves           ///////////////////////////////////////
const llenarBDnaves = async () => {
    try {
        let page = 1;
        let pagina = true;
        while (pagina) {
            const response = await axios.get(`https://swapi.dev/api/starships/?page=${page}`);
            const naves = response.data.results;

            if (naves.length === 0) {
                pagina = false;
                break;
            }

            const promises = naves.map(async nave => {
                const existeNave = await NavesModel.findOne({ Nombre: nave.name });
                if (!existeNave) {
                    const nuevanaves = new NavesModel({
                        Nombre: nave.name,
                        Modelo: nave.model,
                        Clase: nave.manufacturer, //CLASE?
                        Tamaño: nave.length,
                        Numero_de_Pasajeros: nave.passengers,
                        Maxima_velocidad_atmosferica: nave.max_atmosphering_speed,
                        Hiperimpulsor: nave.hyperdrive_rating,
                        MGLT: nave.MGLT,
                        Capacidad_de_carga: nave.cargo_capacity,
                        Tiempo_Maximo_Cobustibles: nave.consumables,
                    });
                    return nuevanaves.save();
                } else {
                    console.log(`La nave ${nave.name} ya existe. No se guardará.`);
                }
            });
            await Promise.all(promises);

            console.log("Naves guardadas con éxito.");
            page++;
        }
    } catch (error) {
        console.error("Error al llenar la base de datos: ", error.message);
    }
};

module.exports = llenarBDnaves;