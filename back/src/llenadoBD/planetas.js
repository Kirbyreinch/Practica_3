const express = require('express');  
const { PlanetasModel } = require('../modelos/planets');  
const axios = require('axios');


const llenarBDplanetas = async () => {
    try {
        let page = 1;
        let pagina = true;
        while (pagina) {
        const response = await axios.get(`https://swapi.dev/api/planets/?page=${page}`);
        const planetas = response.data.results;
        if (planetas.length === 0) {
            pagina = false; 
            break;
        }
        const promises = planetas.map(async planeta => {
            const existePlaneta = await PlanetasModel.findOne({ Nombre: planeta.name });
            if (!existePlaneta) {
                const nuevoPlaneta = new PlanetasModel({
                    Nombre: planeta.name,
                    Diametro: planeta.diameter,
                    Periodo_Rotacion: planeta.rotation_period,
                    Periodo_Orbital: planeta.orbital_period,
                    Gravedad: planeta.gravity,
                    Poblacion: planeta.population,
                    Clima: planeta.climate,
                    Terreno: planeta.terrain,
                    Superficie_Agua: planeta.surface_water,
                });
                return nuevoPlaneta.save();
            } else {
                console.log(`El planeta ${planeta.name} ya existe. No se guardará.`);
            }
        });
        await Promise.all(promises);
        console.log("Planetas guardados con éxito.");
        page++; 
    }
    } catch (error) {
        console.error("Errores al llenar la base de datos: ", error.message);
    }
};
module.exports = llenarBDplanetas;