import './components.css';
import axios from "axios";
import React, { useState, useEffect } from "react";
import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faFilePen } from '@fortawesome/free-solid-svg-icons';


function Planets() {
    const [planets, setPlanets] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Función para obtener los planetas
    const fetchPlanets = async (page) => {
        try {
            const response = await axios.get(`http://localhost:5000/Planetas/modulo/?page=${page}`);
            setPlanets(response.data.planets);
            setTotalPages(Math.ceil(response.data.total / 10));
        } catch (error) {
            console.error("Error al obtener los planetas:", error);
        }
    };

    // useEffect para cargar los planetas al montar el componente
    useEffect(() => {
        fetchPlanets(currentPage);
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
                <h1>Planetas</h1>
            </div>
            <div className="Registrar">
                <button className='Btn_agregar'>+ Agregar Registro</button>
            </div>
            <div className="DatosBD">
                <table className='Table'>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Diametro</th>
                            <th>Periodo de Rotacion</th>
                            <th>Periodo Orbital</th>
                            <th>Gravedad</th>
                            <th>Poblacion</th>
                            <th>Clima</th>
                            <th>Terreno</th>
                            <th>Superficie de Agua</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {planets.map(planet => (
                            <tr key={planet._id}>
                                <td>{planet.Nombre}</td>
                                <td>{planet.Diametro}</td>
                                <td>{planet.Periodo_Rotacion}</td>
                                <td>{planet.Periodo_Orbital}</td>
                                <td>{planet.Gravedad}</td>
                                <td>{planet.Poblacion}</td>
                                <td>{planet.Clima}</td>
                                <td>{planet.Terreno}</td>
                                <td>{planet.Superficie_Agua}</td>
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

export default Planets;
