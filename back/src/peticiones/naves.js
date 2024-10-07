const express = require('express');  
const { NavesModel } = require('../modelos/starships');  
const app = express.Router();


///////////////////////////////////////////       PETICIONES      NAVES               ///////////////////////////////////////////
app.post("/", async (req, res) => {
    try {
        const existe = await NavesModel.findOne({ Nombre: req.body.Nombre });
        if (existe) {
            console.log(`La Naves ${req.body.Nombre} ya existe. No se guardará.`);
            return res.status(409).send(`La Nave ${req.body.Nombre} ya existe.`); // Código 409: Conflicto
        }
        const nueva = new NavesModel(req.body);
        const guardar = await nueva.save();
        res.status(201).send(guardar); 
    } catch (error) {
        res.status(400).send("Error al crear Nave: " + error.message);
    }
});



app.get("/id/:id", async (req, res) => {
    try {
        const id = req.params.id; 
        const modelo = await NavesModel.findById(id, {createdAt: 0, updatedAt: 0}); 
        if (!modelo) {
            return res.status(404).send("Nave no encontrada");
        }
        res.send(modelo);
    } catch (error) {
        res.status(400).send("Error al obtener Nave: " + error.message);
    }
});


app.get("/personajes/", async (req, res) => {
    try {
        const modelo = await NavesModel.find({}, {Nombre:1, _id:1}); 
        if (modelo.length === 0) {
            return res.status(404).send("Nave no encontrada");
        }
        res.send(modelo);
    } catch (error) {
        res.status(400).send("Error al obtener Nave: " + error.message);
    }
});


app.get("/modulo/", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; 
        const limit = parseInt(req.query.limit) || 10; 
        const skip = (page - 1) * limit;
        const modelo = await NavesModel.find({}, { createdAt: 0, updatedAt: 0 })
            .skip(skip)
            .limit(limit);
        res.send({
            page,
            limit,
            naves: modelo, 
        });
    } catch (error) {
        res.status(400).send("Error al obtener naves: " + error.message);
    }
});



app.delete("/Delete/:id", async (req, res) => {
    try {
        const id = req.params.id; 
        const modelo = await NavesModel.findById(id); 
        if (!modelo) {
            return res.status(404).send("nave no encontrada");
        }
        await NavesModel.findByIdAndDelete(id);
        res.send({ message: "Nave eliminada", naves: modelo });
    } catch (error) {
        res.status(400).send("Error al eliminar naves: " + error.message);
    } 
});

app.put("/Modificar/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const modelo = await NavesModel.findById(id);
        if (!modelo) {
            return res.status(404).send("nave no encontrada");
        }
        const existe = await NavesModel.findOne({ Nombre: req.body.Nombre });
        if (existe) {
            console.log(`La nave ${req.body.Nombre} ya existe. No se guardará.`);
            return res.status(409).send(`La nave ${req.body.Nombre} ya existe.`); // Código 409: Conflicto
        }
        const updated = await NavesModel.findByIdAndUpdate(id, req.body, { new: true });
        res.send({ message: "nave Modificada", naves: updated });
    } catch (error) {
        res.status(400).send("Error al modificar naves: " + error.message);
    }

});

module.exports = app;