import './header.css';
import 'font-awesome/css/font-awesome.min.css';


//COMPONENTE A MOSTRAR HASTA ARRIBA
function Header() {
    return (
        <div className="header">
            <div className="options">
                {/* ICONO Y BARRA DE BUSQUEDA */}
                <i className="fa fa-search" aria-hidden="true" />
                <input type='text' id='search' placeholder='BUSQUEDA' />

            </div>
        </div>
    );
}

export default Header;