import axios from 'axios';

//RUTA  API  //
const API_URL = 'http://localhost:5000/Naves';


//PETICION PARA CREAR//
export const Createstarships = async (starshipsdata) => {
    try {
        const response = await axios.post(API_URL, starshipsdata);
        return response.data; 
    } catch (error) {
        throw new Error(error.response.data.message || 'Error al crear la Nave');
    }
};

//PETICION PARA ELIMINAR//
export const Deletestarships = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/Delete/${id}`);
        return response.data; 
    } catch (error) {
        throw new Error(error.response.data.message || 'Error al eliminar la Nave');
    }
};


//PETICION PARA MODIFICAR//
export const Modifystarships = async (id, starshipsdata) => {
    try {
        const response = await axios.put(`${API_URL}/Modificar/${id}`, starshipsdata);
        return response.data; 
    } catch (error) {
        throw new Error(error.response.data.message || 'Error al modificar la Nave');
    }
};

