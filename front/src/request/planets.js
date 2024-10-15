import axios from 'axios';

//RUTA  API  //
const API_URL = 'http://localhost:5000/Planetas';


//PETICION PARA CREAR//
export const Createplanets = async (planetsdata) => {
    try {
        const response = await axios.post(API_URL, planetsdata);
        return response.data; 
    } catch (error) {
        throw new Error(error.response.data.message || 'Error al crear el Planeta');
    }
};

//PETICION PARA ELIMINAR//
export const Deleteplanets = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/Delete/${id}`);
        return response.data; 
    } catch (error) {
        throw new Error(error.response.data.message || 'Error al eliminar el Planeta');
    }
};


//PETICION PARA MODIFICAR//
export const Modifyplanets = async (id, planetsdata) => {
    try {
        const response = await axios.put(`${API_URL}/Modificar/${id}`, planetsdata);
        return response.data; 
    } catch (error) {
        throw new Error(error.response.data.message || 'Error al modificar el Planeta');
    }
};

