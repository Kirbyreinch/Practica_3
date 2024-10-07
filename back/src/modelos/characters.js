const mongoose = require('mongoose');


//////////////Modelo Personajes/////////////////////
const PersonajeSchemas = new mongoose.Schema(
    {
        Nombre:{
            type:String,
            required: true,
        },
        Fecha_Nacimiento:{
            type: String,
            required: true,
        },
        Color_Ojos:{
            type:String,
            
        },
        Genero:{
            type:String,
            
        },
        Color_Cabello:{
            type:String,
            
        },
        Altura:{
            type:String,
            
        },
        Masa:{
            type:String,
            
        },
        Color_de_Piel:{
            type:String,
            
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

// Crear los modelos
const PersonajesModel = mongoose.model("Personajes", PersonajeSchemas);

// Exportar  modelos
module.exports = {
    PersonajesModel,
};
