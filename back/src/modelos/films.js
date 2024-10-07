const mongoose = require('mongoose');

//Modelo Peliculas
const pelisSchema = new mongoose.Schema(
    {
        Titulo:{
            type:String,
            required: true,
        },
        Director:{
            type: String,
            required: true
        },
        Productor:{
            type:String,
            required:true,
        }

    },
    {
        timestamps: true,
        versionKey: false,
    }
)


// Crear los modelos
const PelisModel = mongoose.model("Peliculas", pelisSchema);

// Exportar  modelos
module.exports = {
    PelisModel,
};
