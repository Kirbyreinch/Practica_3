const express = require('express');
const { PersonajesModel } = require('../modelos/characters');
const app = express.Router();


///////////////////////////////////////////     PETICIONES    PERSONAJES          ///////////////////////////////////////////
app.post("/", async (req, res) => {
    try {
        const existe = await PersonajesModel.findOne({ Nombre: req.body.Nombre });

        if (existe) {
            console.log(`El Personaje ${req.body.Nombre} ya existe. No se guardará.`);
            return res.status(409).send(`El Personaje ${req.body.Nombre} ya existe.`); // Código 409: Conflicto
        }
        const nueva = new PersonajesModel(req.body);
        const guardar = await nueva.save();
        res.status(201).send(guardar);
    } catch (error) {
        res.status(400).send("Error al crear Personaje: " + error.message);
    }
});


app.get("/nombre/:nombre", async (req, res) => {
    try {
        const nombre = req.params.nombre;
        if (!nombre) {
            return res.status(400).send("El nombre es requerido.");
        }
        const modelo = await PersonajesModel.findOne({ Nombre: nombre }, { createdAt: 0, updatedAt: 0 });
        if (!modelo) {
            console.log(nombre);
            return res.status(404).send("Personaje no encontrado");
        }
        res.send(modelo);
    } catch (error) {
        res.status(400).send("Error al obtener personaje: " + error.message);
    }
});



app.get("/id/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const modelo = await PersonajesModel.findById(id, { createdAt: 0, updatedAt: 0 });
        if (!modelo) {
            return res.status(404).send("Personaje no encontrado");
        }
        res.send(modelo);
    } catch (error) {
        res.status(400).send("Error al obtener Personaje: " + error.message);
    }
});


app.get("/personajes/", async (req, res) => {
    try {
        const modelo = await PersonajesModel.find({}, { Nombre: 1, _id: 1 });
        if (modelo.length === 0) {
            return res.status(404).send("Personaje no encontrado");
        }
        res.send(modelo);
    } catch (error) {
        res.status(400).send("Error al obtener Personaje: " + error.message);
    }
});


app.get("/modulo/", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const skip = (page - 1) * limit;
        const modelo = await PersonajesModel.find({}, { createdAt: 0, updatedAt: 0 })
            .skip(skip)
            .limit(limit);

        const total = await PersonajesModel.countDocuments();
        res.send({
            page,
            limit,
            total,
            personajes: modelo,
        });
    } catch (error) {
        res.status(400).send("Error al obtener personajes: " + error.message);
    }
});





app.delete("/Delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const modelo = await PersonajesModel.findById(id);
        if (!modelo) {
            return res.status(404).send("Personaje no encontrado");
        }
        await PersonajesModel.findByIdAndDelete(id);
        res.send({ message: "Personaje eliminado", Personaje: modelo });
    } catch (error) {
        res.status(400).send("Error al eliminar Personaje: " + error.message);
    }
});

app.put("/Modificar/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const modelo = await PersonajesModel.findById(id);
        if (!modelo) {
            return res.status(404).send("Personaje no encontrado");
        }
        const existe = await PersonajesModel.findOne({ Nombre: req.body.Nombre, _id:{ $ne: id } });
        if (existe) {
            console.log(`El Personaje ${req.body.Nombre} ya existe. No se guardará.`);
            return res.status(409).send(`El Personaje ${req.body.Nombre} ya existe.`); // Código 409: Conflicto
        }
        const updated = await PersonajesModel.findByIdAndUpdate(id, req.body, { new: true });
        res.send({ message: "Personaje Modificado", Personaje: updated });
    } catch (error) {
        res.status(400).send("Error al modificar Personaje: " + error.message);
    }

});

module.exports = app;