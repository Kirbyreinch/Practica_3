const express = require('express');
const { especiesModel } = require('../modelos/species');
const app = express.Router();


///////////////////////////////////////////     PETICIONES    ESPECIES            ///////////////////////////////////////////
app.post("/", async (req, res) => {
    try {
        const existe = await especiesModel.findOne({ Nombre: req.body.Nombre });

        if (existe) {
            console.log(`La especie ${req.body.Nombre} ya existe. No se guardará.`);
            return res.status(409).send(`La especie ${req.body.Nombre} ya existe.`); // Código 409: Conflicto
        }
        const nueva = new especiesModel(req.body);
        const guardar = await nueva.save();
        res.status(201).send(guardar);
    } catch (error) {
        res.status(400).send("Error al crear especie: " + error.message);
    }
});

app.get("/id/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const modelo = await especiesModel.findById(id, { createdAt: 0, updatedAt: 0 });
        if (!modelo) {
            return res.status(404).send("especie no encontrado");
        }
        res.send(modelo);
    } catch (error) {
        res.status(400).send("Error al obtener especie: " + error.message);
    }
});


app.get("/personajes/", async (req, res) => {
    try {
        const modelo = await especiesModel.find({}, { Nombre: 1, _id: 1 });
        if (modelo.length === 0) {
            return res.status(404).send("especie no encontrado");
        }
        res.send(modelo);
    } catch (error) {
        res.status(400).send("Error al obtener especie: " + error.message);
    }
});


app.get("/modulo/", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const skip = (page - 1) * limit;
        const modelo = await especiesModel.find({}, { createdAt: 0, updatedAt: 0 })
            .skip(skip)
            .limit(limit);
        const total = await especiesModel.countDocuments();
        res.send({
            total: total,
            page,
            limit,
            especies: modelo,
        });
    } catch (error) {
        res.status(400).send("Error al obtener especies: " + error.message);
    }
});


app.delete("/Delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const modelo = await especiesModel.findById(id);
        if (!modelo) {
            return res.status(404).send("especie no encontrado");
        }
        await especiesModel.findByIdAndDelete(id);
        res.send({ message: "Especies eliminado", especie: modelo });
    } catch (error) {
        res.status(400).send("Error al eliminar especie: " + error.message);
    }
});



app.put("/Modificar/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const modelo = await especiesModel.findById(id);
        if (!modelo) {
            return res.status(404).send("especie no encontrada");
        }
        const existe = await especiesModel.findOne({ Nombre: req.body.Nombre });
        if (existe) {
            console.log(`La especie ${req.body.Nombre} ya existe. No se guardará.`);
            return res.status(409).send(`La especie ${req.body.Nombre} ya existe.`); // Código 409: Conflicto
        }
        const updated = await especiesModel.findByIdAndUpdate(id, req.body, { new: true });
        res.send({ message: "especie Modificada", especie: updated });
    } catch (error) {
        res.status(400).send("Error al modificar especie: " + error.message);
    }

});

module.exports = app;