const express = require('express');  
const { PlanetasModel } = require('../modelos/planets');  
const app = express.Router();


///////////////////////////////////////////      PETICIONES    PLANETAS            ///////////////////////////////////////////
app.post("/", async (req, res) => {
    try {
        const existe = await PlanetasModel.findOne({ Nombre: req.body.Nombre });

        if (existe) {
            console.log(`El Planeta ${req.body.Nombre} ya existe. No se guardará.`);
            return res.status(409).send(`El Planeta ${req.body.Nombre} ya existe.`); 
        }
        const nuevoplaneta = new PlanetasModel(req.body);
        const guardarplaneta = await nuevoplaneta.save();
        res.status(201).send(guardarplaneta);

    } catch (error) {
        res.status(400).send("Error al crear Planeta: " + error.message);
    }
});

app.get("/id/:id", async (req, res) => {
    try {
        const id = req.params.id; 
        const planets = await PlanetasModel.findById(id, {createdAt: 0, updatedAt: 0}); 
        if (!planets) {
            return res.status(404).send("Planeta no encontrado");
        }
        res.send(planets);
    } catch (error) {
        res.status(400).send("Error al obtener Planeta: " + error.message);
    }
});


app.get("/personajes/", async (req, res) => {
    try {
        const planets = await PlanetasModel.find({}, {Nombre:1, _id:1}); 
        if (planets.length === 0) {
            return res.status(404).send("Planeta no encontrado");
        }
        res.send(planets);
    } catch (error) {
        res.status(400).send("Error al obtener Planeta: " + error.message);
    }
});


app.get("/modulo/", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; 
        const limit = parseInt(req.query.limit) || 10; 
        const skip = (page - 1) * limit;
        const planets = await PlanetasModel.find({}, { createdAt: 0, updatedAt: 0 })
            .skip(skip)
            .limit(limit);
        res.send({
            page,
            limit,
            planets,
        });
    } catch (error) {
        res.status(400).send("Error al obtener planetas: " + error.message);
    }
});


app.delete("/Delete/:id", async (req, res) => {
    try {
        const id = req.params.id; 
        const planets = await PlanetasModel.findById(id); 
        if (!planets) {
            return res.status(404).send("Planeta no encontrado");
        }
        await PlanetasModel.findByIdAndDelete(id);
        res.send({ message: "Planeta eliminado", Planeta: planets });
    } catch (error) {
        res.status(400).send("Error al eliminar Planeta: " + error.message);
    } 
});

app.put("/Modificar/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const planets = await PlanetasModel.findById(id);
        if (!planets) {
            return res.status(404).send("Planeta no encontrado");
        }
        const existe = await PlanetasModel.findOne({ Nombre: req.body.Nombre });
        if (existe) {
            console.log(`El Planeta ${req.body.Nombre} ya existe. No se guardará.`);
            return res.status(409).send(`El Planeta ${req.body.Nombre} ya existe.`); // Código 409: Conflicto
        }
        const updatedplanets = await PlanetasModel.findByIdAndUpdate(id, req.body, { new: true });
        res.send({ message: "Planeta Modificado", Planeta: updatedplanets });
    } catch (error) {
        res.status(400).send("Error al modificar Planeta: " + error.message);
    }

});

module.exports = app;