import './components.css';
import axios from "axios";
import React, { useState, useEffect } from "react";
import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faFilePen } from '@fortawesome/free-solid-svg-icons';

function Starships() {
    const [starships, setStarships] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Función para obtener las Naves
    const fetchSpecies = async (page) => {
        try {
            const response = await axios.get(`http://localhost:5000/Naves/modulo/?page=${page}`);
            setStarships(response.data.naves);
            setTotalPages(Math.ceil(response.data.total / 10));
        } catch (error) {
            console.error("Error al obtener las Naves:", error);
        }
    };

    // useEffect para cargar las Naves al montar el componente
    useEffect(() => {
        fetchSpecies(currentPage);
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
                <h1>Naves</h1>
            </div>
            <div className="Registrar">
                <button className='Btn_agregar'>+ Agregar Registro</button>
            </div>
            <div className="DatosBD">
                <table className='Table'>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Modelo</th>
                            <th>Clase</th>
                            <th>Tamaño</th>
                            <th>Numero de pasajeros</th>
                            <th>Maxima velocidad atmosferica</th>
                            <th>Hiperimpulsor</th>
                            <th>MGLT</th>
                            <th>Capacidad de carga</th>
                            <th>Tiempo maximo de combustible</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {starships.map(starship => (
                            <tr key={starship._id}>
                                <td>{starship.Nombre}</td>
                                <td>{starship.Modelo}</td>
                                <td>{starship.Clase}</td>
                                <td>{starship.Tamaño}</td>
                                <td>{starship.Numero_de_Pasajeros}</td>
                                <td>{starship.Maxima_velocidad_atmosferica}</td>
                                <td>{starship.Hiperimpulsor}</td>
                                <td>{starship.MGLT}</td>
                                <td>{starship.Capacidad_de_carga}</td>
                                <td>{starship.Tiempo_Maximo_Cobustibles}</td>
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

export default Starships;
