import axios from 'axios';

const API_URL = 'http://localhost:5000/Peliculas';

export const createMovie = async (movieData) => {
    try {
        const response = await axios.post(API_URL, movieData);
        return response.data; 
    } catch (error) {
        throw new Error(error.response.data.message || 'Error al crear la película');
    }
};
