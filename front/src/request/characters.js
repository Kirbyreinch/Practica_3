import axios from 'axios';

//RUTA  API  //
const API_URL = 'http://localhost:5000/Personajes';


//PETICION PARA CREAR//
export const Createcharacter = async (characterdata) => {
    try {
        const response = await axios.post(API_URL, characterdata);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error al crear el Personaje');
    }
};

//PETICION PARA ELIMINAR//
export const Deletecharacter = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/Delete/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error al eliminar el Personaje');
    }
};


//PETICION PARA MODIFICAR//
export const Modifycharacter = async (id, characterdata) => {
    try {
        const response = await axios.put(`${API_URL}/Modificar/${id}`, characterdata);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error al modificar el Personaje');
    }
};

