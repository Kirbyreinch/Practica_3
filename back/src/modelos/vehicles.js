const mongoose = require('mongoose');



//////////////Modelo Vehiculos/////////////////////
const VehiculoSchemas = new mongoose.Schema(
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
        Capacidad_Maxima:{
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
const VehiculosModel = mongoose.model("Vehiculos", VehiculoSchemas);


// Exportar  modelos
module.exports = {
    VehiculosModel,
};
