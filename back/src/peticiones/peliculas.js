const express = require('express');
const { PelisModel } = require('../modelos/films');
const app = express.Router();


///////////////////////////////////////////        PETICIONES PELICULAS          ///////////////////////////////////////////
app.post("/", async (req, res) => {
    try {
        const existe = await PelisModel.findOne({ Titulo: req.body.Titulo });
        if (existe) {
            console.log(`La película ${req.body.Titulo} ya existe. No se guardará.`);
            return res.status(409).send(`La película ${req.body.Titulo} ya existe.`);
        }

        const nueva = new PelisModel(req.body);
        const guardar = await nueva.save();
        res.status(201).send(guardar);
    } catch (error) {
        res.status(400).send("Error al crear película: " + error.message);
    }
});


app.get("/id/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const pelis = await PelisModel.findById(id, { createdAt: 0, updatedAt: 0 });
        if (!pelis) {
            return res.status(404).send("Película no encontrada");
        }
        res.send(pelis);
    } catch (error) {
        res.status(400).send("Error al obtener película: " + error.message);
    }
});


app.get("/personajes/", async (req, res) => {
    try {
        const pelis = await PelisModel.find({}, { Titulo: 1, _id: 1 });
        if (pelis.length === 0) {
            return res.status(404).send("Películas no encontradas");
        }
        res.send(pelis);
    } catch (error) {
        res.status(400).send("Error al obtener películas: " + error.message);
    }
});


app.get("/modulo/", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const pelis = await PelisModel.find({}, { createdAt: 0, updatedAt: 0 })
            .skip(skip)
            .limit(limit);
        res.send({
            page,
            limit,
            pelis,
        });
    } catch (error) {
        res.status(400).send("Error al obtener películas: " + error.message);
    }
});


app.delete("/Delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const pelis = await PelisModel.findById(id);
        if (!pelis) {
            return res.status(404).send("Película no encontrada");
        }
        await PelisModel.findByIdAndDelete(id);
        res.send({ message: "Película eliminada", pelicula: pelis });
    } catch (error) {
        res.status(400).send("Error al eliminar película: " + error.message);
    }
});


app.put("/Modificar/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const pelis = await PelisModel.findById(id);
        if (!pelis) {
            return res.status(404).send("Película no encontrada");
        }

        const existe = await PelisModel.findOne({ Titulo: req.body.Titulo });
        if (existe) {
            console.log(`La película ${req.body.Titulo} ya existe. No se guardará.`);
            return res.status(409).send(`La película ${req.body.Titulo} ya existe.`);
        }

        const updatedPelis = await PelisModel.findByIdAndUpdate(id, req.body, { new: true });
        res.send({ message: "Película modificada", pelicula: updatedPelis });
    } catch (error) {
        res.status(400).send("Error al modificar película: " + error.message);
    }
});

module.exports = app;
