import './sidebar.css';
import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShuttleSpace, faFeatherPointed, faCarSide, faEarthAsia, faUsers, faFilm, faArrowRight } from '@fortawesome/free-solid-svg-icons' //iMPORTAR ICONOS



//FUNCION PARA LA BARRA LATERAL
function Sidebar({ onSelect }) {
    return (
        <div className="sidebar">
            <div className="optionsvar">
                {/* SE PONEN LOS ICONOS Y SU VALOR AL SELECCIONAR  */}
                <ul>
                    <li><FontAwesomeIcon icon={faArrowRight} /></li>
                    <li onClick={() => onSelect('characters')}><FontAwesomeIcon icon={faUsers} /></li>
                    <li onClick={() => onSelect('starships')}><FontAwesomeIcon icon={faShuttleSpace} /></li>
                    <li onClick={() => onSelect('species')}><FontAwesomeIcon icon={faFeatherPointed} /></li>
                    <li onClick={() => onSelect('vehicles')}><FontAwesomeIcon icon={faCarSide} /></li>
                    <li onClick={() => onSelect('planets')}><FontAwesomeIcon icon={faEarthAsia} /></li>
                    <li onClick={() => onSelect('films')}><FontAwesomeIcon icon={faFilm} /></li>
                </ul>
            </div>
        </div>
    );
}
export default Sidebar;