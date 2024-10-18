import axios from 'axios';

//RUTA  API  //
const API_URL = 'http://localhost:5000/Peliculas';


//PETICION PARA CREAR//
export const createMovie = async (movieData) => {
    try {
        const response = await axios.post(API_URL, movieData);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error al crear la película');
    }
};

//PETICION PARA ELIMINAR//
export const deleteMovie = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/Delete/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error al eliminar la película');
    }
};


//PETICION PARA MODIFICAR//
export const modifyMovie = async (id, movieData) => {
    try {
        const response = await axios.put(`${API_URL}/Modificar/${id}`, movieData);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error al modificar la película');
    }
};

