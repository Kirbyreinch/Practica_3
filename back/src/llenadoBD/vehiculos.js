const express = require('express');  
const { VehiculosModel } = require('../modelos/vehicles');  
const axios = require('axios');

/////////////////////////////////////           Vehiculos           ///////////////////////////////////////
const llenarBDvehiculos = async () => {
    try {

        let page=1;
        let pagina = true;
        while (pagina) {
        const response = await axios.get(`https://swapi.dev/api/vehicles/?page=${page}`);
        const vehiculos = response.data.results;


        if (vehiculos.length === 0) {
            pagina = false; 
            break;
        }

        const promises = vehiculos.map(async vehiculo => {
        const existeVehiculo = await VehiculosModel.findOne({ Nombre: vehiculo.name });

            if (!existeVehiculo) {
                const nuevosvehiculos = new VehiculosModel({
                    Nombre: vehiculo.name,
                    Modelo: vehiculo.model,
                    Clase: vehiculo.vehicle_class,
                    Tamaño: vehiculo.length, 
                    Numero_de_Pasajeros: vehiculo.passengers,
                    Maxima_velocidad_atmosferica: vehiculo.max_atmosphering_speed,
                    Capacidad_Maxima: vehiculo.cargo_capacity,
                    Tiempo_Maximo_Cobustibles: vehiculo.consumables,
                });
                return nuevosvehiculos.save();
            } else {
                console.log(`El vehículo ${vehiculo.name} ya existe. No se guardará.`);
            }
        });
        await Promise.all(promises);
        console.log("Vehículos guardados con éxito.");
        page++; 
    }
    } catch (error) {
        console.error("Error al llenar la base de datos: ", error.message);
    }
};

module.exports = llenarBDvehiculos;