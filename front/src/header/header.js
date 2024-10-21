import './header.css';
import 'font-awesome/css/font-awesome.min.css';
import React, { useState } from 'react';

// COMPONENTE A MOSTRAR HASTA ARRIBA
function Header() {
    const [placeholder, setPlaceholder] = useState('BUSQUEDA');
    const [searchText, setSearchText] = useState('');

    const handleFocus = () => {
        setPlaceholder('ADVERTENCIA: NO FUNCIONA');
    };

    const handleBlur = () => {
        if (!searchText) {
            setPlaceholder('BUSQUEDA');
        }
    };

    const handleChange = (e) => {
        setSearchText(e.target.value);
        if (e.target.value) {
            setPlaceholder('');
        } else {
            setPlaceholder('ERROR 404');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            setSearchText(''); 
            setPlaceholder('ERROR 404'); 
        }
    };

    return (
        <div className="header">
            <div className="options">
                {/* ICONO Y BARRA DE BUSQUEDA */}
                <i className="fa fa-search" aria-hidden="true" />
                <input 
                    type='text' 
                    id='search' 
                    value={searchText} 
                    placeholder={placeholder} 
                    onFocus={handleFocus} 
                    onBlur={handleBlur} 
                    onChange={handleChange} 
                    onKeyPress={handleKeyPress} 
                />
            </div>
        </div>
    );
}

export default Header;
