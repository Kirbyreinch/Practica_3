import './sidebar.css';
import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShuttleSpace, faFeatherPointed, faCarSide, faEarthAsia, faUsers, faFilm } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

function Sidebar({ onSelect, selectedComponent }) {
    const [hoveredComponent, setHoveredComponent] = useState('');

    const handleMouseEnter = (component) => {
        setHoveredComponent(component);
    };

    const handleMouseLeave = () => {
        setHoveredComponent('');
    };

    return (
        <div className="sidebar">
            <div className="optionsvar">
                <ul>
                    <li 
                    //  SI EL COMPONENTE SELECCIONADO ESTA ACTIVO SE RESALTARA //
                        className={selectedComponent === 'characters' ? 'active' : ''}
                        onClick={() => onSelect('characters')}
                        onMouseEnter={() => handleMouseEnter('Characters')}
                        onMouseLeave={handleMouseLeave}
                    >
                            {/* // ICONO Y TEXTO DE ETIQUETA // */}
                        <FontAwesomeIcon icon={faUsers} />
                        {hoveredComponent === 'Characters' && <span className="tooltip">Personajes</span>}
                    </li>
                    <li 
                        className={selectedComponent === 'starships' ? 'active' : ''}
                        onClick={() => onSelect('starships')}
                        onMouseEnter={() => handleMouseEnter('Starships')}
                        onMouseLeave={handleMouseLeave}
                    >
                        <FontAwesomeIcon icon={faShuttleSpace} />
                        {hoveredComponent === 'Starships' && <span className="tooltip">Naves</span>}
                    </li>
                    <li 
                        className={selectedComponent === 'species' ? 'active' : ''}
                        onClick={() => onSelect('species')}
                        onMouseEnter={() => handleMouseEnter('Species')}
                        onMouseLeave={handleMouseLeave}
                    >
                        <FontAwesomeIcon icon={faFeatherPointed} />
                        {hoveredComponent === 'Species' && <span className="tooltip">Especies</span>}
                    </li>
                    <li 
                        className={selectedComponent === 'vehicles' ? 'active' : ''}
                        onClick={() => onSelect('vehicles')}
                        onMouseEnter={() => handleMouseEnter('Vehicles')}
                        onMouseLeave={handleMouseLeave}
                    >
                        <FontAwesomeIcon icon={faCarSide} />
                        {hoveredComponent === 'Vehicles' && <span className="tooltip">Vehículos</span>}
                    </li>
                    <li 
                        className={selectedComponent === 'planets' ? 'active' : ''}
                        onClick={() => onSelect('planets')}
                        onMouseEnter={() => handleMouseEnter('Planets')}
                        onMouseLeave={handleMouseLeave}
                    >
                        <FontAwesomeIcon icon={faEarthAsia} />
                        {hoveredComponent === 'Planets' && <span className="tooltip">Planetas</span>}
                    </li>
                    <li 
                        className={selectedComponent === 'films' ? 'active' : ''}
                        onClick={() => onSelect('films')}
                        onMouseEnter={() => handleMouseEnter('Films')}
                        onMouseLeave={handleMouseLeave}
                    >
                        <FontAwesomeIcon icon={faFilm} />
                        {hoveredComponent === 'Films' && <span className="tooltip">Peliculas</span>}
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
