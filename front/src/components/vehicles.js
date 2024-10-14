import './components.css';
import axios from "axios";
import React, { useState, useEffect } from "react";
import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faFilePen } from '@fortawesome/free-solid-svg-icons';

function Vehicles() {
    const [vehicles, setVehicles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Función para obtener los Vehiculos
    const fetchVehiculos = async (page) => {
        try {
            const response = await axios.get(`http://localhost:5000/Vehiculos/modulo/?page=${page}`);
            setVehicles(response.data.vehiculos);
            setTotalPages(Math.ceil(response.data.total / 10));
        } catch (error) {
            console.error("Error al obtener los Vehiculos:", error);
        }
    };

    // useEffect para cargar los Vehiculos al montar el componente
    useEffect(() => {
        fetchVehiculos(currentPage);
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
                <h1>Vehiculos</h1>
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
                            <th>Capacidad Maxima</th>
                            <th>Tiempo maximo de combustibles</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicles.map(vehicle => (
                            <tr key={vehicle._id}>
                                <td>{vehicle.Nombre}</td>
                                <td>{vehicle.Modelo}</td>
                                <td>{vehicle.Clase}</td>
                                <td>{vehicle.Tamaño}</td>
                                <td>{vehicle.Numero_de_Pasajeros}</td>
                                <td>{vehicle.Maxima_velocidad_atmosferica}</td>
                                <td>{vehicle.Capacidad_Maxima}</td>
                                <td>{vehicle.Tiempo_Maximo_Cobustibles}</td>
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

export default Vehicles;
