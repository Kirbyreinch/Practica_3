import './components.css';
import axios from "axios";
import React, { useState, useEffect } from "react";
import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faFilePen } from '@fortawesome/free-solid-svg-icons';

function Characters() {
    const [characters, setCharacters] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Función para obtener los personajes
    const fetchCharacters = async (page) => {
        try {
            const response = await axios.get(`http://localhost:5000/Personajes/modulo/?page=${page}`);
            setCharacters(response.data.personajes);
            setTotalPages(Math.ceil(response.data.total / 10));
        } catch (error) {
            console.error("Error al obtener los personajes:", error);
        }
    };

    // useEffect para cargar los personajes al montar el componente
    useEffect(() => {
        fetchCharacters(currentPage);
    }, [currentPage]);

    // Funciones para cambiar de página
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="contenedor">
            <div className="Titulo">
                <h1>Personajes</h1>
            </div>
            <div className="Registrar">
                <button className='Btn_agregar'>+ Agregar Registro</button>
            </div>
            <div className="DatosBD">
                <table className='Table'>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Altura</th>
                            <th>Peso</th>
                            <th>Color de cabello</th>
                            <th>Color de piel</th>
                            <th>Color de ojos</th>
                            <th>Fecha de nacimiento</th>
                            <th>Género</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {characters.map(character => (
                            <tr key={character._id}>
                                <td>{character.Nombre}</td>
                                <td>{character.Altura}</td>
                                <td>{character.Masa}</td>
                                <td>{character.Color_Cabello}</td>
                                <td>{character.Color_de_Piel}</td>
                                <td>{character.Color_Ojos}</td>
                                <td>{character.Fecha_Nacimiento}</td>
                                <td>{character.Genero}</td>
                                <td>
                                    <FontAwesomeIcon className="icon" icon={faTrash} />
                                    <FontAwesomeIcon className="icon" icon={faFilePen} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="Paginacion">
                <div className="pagination">
                    <br />
                    <button className="button-74" onClick={handlePrevPage} disabled={currentPage === 1}>Anterior</button>
                    <span>  Página   {currentPage} de {totalPages}  </span>
                    <button className="button-74" onClick={handleNextPage} disabled={currentPage === totalPages}>Siguiente</button>
                </div>
            </div>
        </div>
    );
}

export default Characters;
