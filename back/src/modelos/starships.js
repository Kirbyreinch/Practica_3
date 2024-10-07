const mongoose = require('mongoose');


//////////////Modelo Naves/////////////////////
const NavesSchemas = new mongoose.Schema(
    {
        Nombre:{
            type:String,
            required: true,
        },
        Modelo:{
            type: String,
            required: true,
            
        },
        Clase:{
            type:String,
            
        },
        Tamaño:{
            type:String,
            
        },
        Numero_de_Pasajeros:{
            type:String,
            
        },
        Maxima_velocidad_atmosferica:{
            type:String,
            
        },
        Hiperimpulsor:{
            type:String,
            
        },
        MGLT:{
            type:String,
            
        },
        Capacidad_de_carga:{
            type:String,
            
        },
        Tiempo_Maximo_Cobustibles:{
            type:String,
            
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
)


// Crear los modelos
const NavesModel = mongoose.model("Naves", NavesSchemas);


// Exportar  modelos
module.exports = {
    NavesModel,
};
