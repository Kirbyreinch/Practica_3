const mongoose = require('mongoose');

const dbconnect = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/Data', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Conexión correcta a la base de datos");
    } catch (err) {
        console.error("Error de conexión:", err);
    }
};
module.exports = dbconnect;
