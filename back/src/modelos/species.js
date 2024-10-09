const mongoose = require('mongoose');


//////////////Modelo Especies/////////////////////
const especiesSchemas = new mongoose.Schema(
    {
        Nombre: {
            type: String,
            required: true,
        },
        Clasificacion: {
            type: String,

        },
        Designacion: {
            type: String,

        },
        Estatura: {
            type: String,

        },
        Color_de_piel: {
            type: String,

        },
        Color_de_cabello: {
            type: String,

        },
        Color_de_ojos: {
            type: String,

        },
        Promedio_de_vida: {
            type: String,

        },
        Lenguaje: {
            type: String,

        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
)


// Crear los modelosa
const especiesModel = mongoose.model("Especies", especiesSchemas);


// Exportar  modelos
module.exports = {
    especiesModel,
};
