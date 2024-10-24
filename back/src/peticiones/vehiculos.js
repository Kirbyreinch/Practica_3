const express = require('express');
const { VehiculosModel } = require('../modelos/vehicles');
const app = express.Router();


///////////////////////////////////////////    PETICIONES     VEHICULOS           ///////////////////////////////////////////
app.post("/", async (req, res) => {
    try {
        const existe = await VehiculosModel.findOne({ Nombre: req.body.Nombre });

        if (existe) {
            console.log(`El Vehiculo ${req.body.Nombre} ya existe. No se guardará.`);
            return res.status(409).send(`El Vehiculo ${req.body.Nombre} ya existe.`); // Código 409: Conflicto
        }
        const nueva = new VehiculosModel(req.body);
        const guardar = await nueva.save();
        res.status(201).send(guardar);
    } catch (error) {
        res.status(400).send("Error al crear Vehiculo: " + error.message);
    }
});

app.get("/id/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const modelo = await VehiculosModel.findById(id, { createdAt: 0, updatedAt: 0 });
        if (!modelo) {
            return res.status(404).send("Vehiculo no encontrado");
        }
        res.send(modelo);
    } catch (error) {
        res.status(400).send("Error al obtener especie: " + error.message);
    }
});


app.get("/personajes/", async (req, res) => {
    try {
        const modelo = await VehiculosModel.find({}, { Nombre: 1, _id: 1 });
        if (modelo.length === 0) {
            return res.status(404).send("Vehiculo no encontrado");
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

        const modelo = await VehiculosModel.find({}, { createdAt: 0, updatedAt: 0 })
            .skip(skip)
            .limit(limit);

        const total = await VehiculosModel.countDocuments();

        res.send({
            page,
            limit,
            total,
            vehiculos: modelo,
        });
    } catch (error) {
        res.status(400).send("Error al obtener vehículos: " + error.message);
    }
});




app.delete("/Delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const modelo = await VehiculosModel.findById(id);
        if (!modelo) {
            return res.status(404).send("Vehiculo no encontrado");
        }
        await VehiculosModel.findByIdAndDelete(id);
        res.send({ message: "Vehiculo eliminado", Vehiculo: modelo });
    } catch (error) {
        res.status(400).send("Error al eliminar Vehiculo: " + error.message);
    }
});

app.put("/Modificar/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const modelo = await VehiculosModel.findById(id);
        if (!modelo) {
            return res.status(404).send("Vehiculo no encontrado");
        }
        const existe = await VehiculosModel.findOne({ Nombre: req.body.Nombre, _id:{ $ne: id } });
        if (existe) {
            console.log(`El Vehiculo ${req.body.Nombre} ya existe. No se guardará.`);
            return res.status(409).send(`El Vehiculo ${req.body.Nombre} ya existe.`); // Código 409: Conflicto
        }
        const updated = await VehiculosModel.findByIdAndUpdate(id, req.body, { new: true });
        res.send({ message: "Vehiculo Modificado", Vehiculo: updated });
    } catch (error) {
        res.status(400).send("Error al modificar Vehiculo: " + error.message);
    }

});


module.exports = app;