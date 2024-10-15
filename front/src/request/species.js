import axios from 'axios';

//RUTA  API  //
const API_URL = 'http://localhost:5000/Especies';


//PETICION PARA CREAR//
export const Createspecies = async (speciesdata) => {
    try {
        const response = await axios.post(API_URL, speciesdata);
        return response.data; 
    } catch (error) {
        throw new Error(error.response.data.message || 'Error al crear la Especie');
    }
};

//PETICION PARA ELIMINAR//
export const Deletspecies = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/Delete/${id}`);
        return response.data; 
    } catch (error) {
        throw new Error(error.response.data.message || 'Error al eliminar la Especie');
    }
};


//PETICION PARA MODIFICAR//
export const Modifyspecies = async (id, speciesdata) => {
    try {
        const response = await axios.put(`${API_URL}/Modificar/${id}`, speciesdata);
        return response.data; 
    } catch (error) {
        throw new Error(error.response.data.message || 'Error al modificar la Especie');
    }
};

