import axios from 'axios';

//RUTA  API  //
const API_URL = 'http://localhost:5000/Vehiculos';


//PETICION PARA CREAR//
export const Createvehiculos = async (vehiculosdata) => {
    try {
        const response = await axios.post(API_URL, vehiculosdata);
        return response.data; 
    } catch (error) {
        throw new Error(error.response.data.message || 'Error al crear el Vehiculo');
    }
};

//PETICION PARA ELIMINAR//
export const Deletevehiculos = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/Delete/${id}`);
        return response.data; 
    } catch (error) {
        throw new Error(error.response.data.message || 'Error al eliminar el Vehiculo');
    }
};


//PETICION PARA MODIFICAR//
export const Modifyvehiculos = async (id, vehiculosdata) => {
    try {
        const response = await axios.put(`${API_URL}/Modificar/${id}`, vehiculosdata);
        return response.data; 
    } catch (error) {
        throw new Error(error.response.data.message || 'Error al modificar el Vehiculo');
    }
};

