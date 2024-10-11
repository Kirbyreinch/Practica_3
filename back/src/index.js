const express = require('express');
const dbconnect = require('./conexionBD');
const cors = require('cors');



const llenarBDpersonajes = require('./llenadoBD/personajes');
const llenarBDespecies = require('./llenadoBD/especies');
const llenarBDnaves = require('./llenadoBD/naves');
const llenarBDpeliculas = require('./llenadoBD/peliculas');
const llenarBDplanetas = require('./llenadoBD/planetas');
const llenarBDvehiculos = require('./llenadoBD/vehiculos');

const especiesRouter = require('./peticiones/especies');
const navesRouter = require('./peticiones/naves');
const peliculasRouter = require('./peticiones/peliculas');
const personajesRouter = require('./peticiones/personajes');
const planetasRouter = require('./peticiones/planetas');
const vehiculosRouter = require('./peticiones/vehiculos');

const app = express();
const port = 5000;

//Se habilita CORS,Express y funcion dbconnect
app.use(cors());
app.use(express.json());
dbconnect();



//Mostrar ruta del server
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});

//Permisos Cors para la ruta
app.use(cors({
    origin: 'http://localhost:3000' 
}));




//LLena la BD 
const iniciarLlenado = async () => {
    await llenarBDpersonajes();
    await llenarBDespecies();
    await llenarBDnaves();
    await llenarBDpeliculas();
    await llenarBDplanetas();
    await llenarBDvehiculos();
};
iniciarLlenado();



// Iniciar peticiones 
app.use("/Especies", especiesRouter);
app.use("/Naves", navesRouter);
app.use("/Peliculas", peliculasRouter);
app.use("/Personajes", personajesRouter);
app.use("/Planetas", planetasRouter);
app.use("/Vehiculos", vehiculosRouter);



