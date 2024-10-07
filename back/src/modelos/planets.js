const mongoose = require('mongoose');

//////////////Modelo Planetas/////////////////////
const planetSchema = new mongoose.Schema(
    {
        Nombre:{
            type:String,
            required: true,
        },
        Diametro:{
            type: String,
            
        },
        Periodo_Rotacion:{
            type:String,
            
        },
        Periodo_Orbital:{
            type:String,
            
        },
        Gravedad:{
            type:String,
            
        },
        Poblacion:{
            type:String,
            
        },
        Clima:{
            type:String,
            
        },
        Terreno:{
            type:String,
            
        },
        Superficie_Agua:{
            type:String,
            
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
)


// Crear los modelos
const PlanetasModel = mongoose.model("Planetas", planetSchema);

// Exportar  modelos
module.exports = {
    PlanetasModel,
};
