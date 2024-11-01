const mongoose = require('mongoose');
const { PelisModel } = require('./films'); 
const { especiesModel } = require('./species'); 
const { NavesModel } = require('./starships'); 
const { VehiculosModel } = require('./vehicles'); 

const PersonajeSchemas = new mongoose.Schema(
    {
        Nombre: {
            type: String,
            required: true,
        },
        Fecha_Nacimiento: {
            type: String,
        },
        Color_Ojos: {
            type: String,
        },
        Genero: {
            type: String,
        },
        Color_Cabello: {
            type: String,
        },
        Altura: {
            type: String,
        },
        Masa: {
            type: String,
        },
        Color_de_Piel: {
            type: String,
        },
        films: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Peliculas', 
            default: [],
        }],
        species: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Especies', 
            default: [],
        }],
        starships: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Naves', 
            default: [],
        }],
        vehicles: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Vehiculos', 
            default: [],
        }],
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

// Crear el modelo de personajes
const PersonajesModel = mongoose.model("Personajes", PersonajeSchemas);

// Exportar modelos
module.exports = {
    PersonajesModel,
};
