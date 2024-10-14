import './components.css';
import axios from "axios";
import React, { useState, useEffect } from "react";
import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faFilePen } from '@fortawesome/free-solid-svg-icons';

function Species() {
    const [species, setSpecies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Función para obtener las Especies
    const fetchSpecies = async (page) => {
        try {
            const response = await axios.get(`http://localhost:5000/Especies/modulo/?page=${page}`);
            setSpecies(response.data.especies);
            setTotalPages(Math.ceil(response.data.total / 10));
        } catch (error) {
            console.error("Error al obtener las películas:", error);
        }
    };

    // useEffect para cargar las Especies al montar el componente
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
                <h1>Especies</h1>
            </div>
            <div className="Registrar">
                <button className='Btn_agregar'>+ Agregar Registro</button>
            </div>
            <div className="DatosBD">
                <table className='Table'>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Clasificación</th>
                            <th>Designación</th>
                            <th>Estatura</th>
                            <th>Color de piel</th>
                            <th>Color de ojos</th>
                            <th>Fecha de ojos</th>
                            <th>Promedio de vida</th>
                            <th>Lenguaje</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {species.map(specie => (
                            <tr key={specie._id}>
                                <td>{specie.Nombre}</td>
                                <td>{specie.Clasificacion}</td>
                                <td>{specie.Designacion}</td>
                                <td>{specie.Estatura}</td>
                                <td>{specie.Color_de_piel}</td>
                                <td>{specie.Color_de_cabello}</td>
                                <td>{specie.Color_de_ojos}</td>
                                <td>{specie.Promedio_de_vida}</td>
                                <td>{specie.Lenguaje}</td>
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

export default Species;
