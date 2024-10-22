import './header.css';
import 'font-awesome/css/font-awesome.min.css';
import React, { useState } from 'react';

function Header({ onSearch }) {
    const [placeholder, setPlaceholder] = useState('BUSQUEDA');
    const [searchText, setSearchText] = useState('');

    const handleFocus = () => {
        setPlaceholder('BUSCAR');
    };

    const handleBlur = () => {
        if (!searchText) {
            setPlaceholder('BUSQUEDA');
        }
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setSearchText(value);
        onSearch(value); 

        if (value) {
            setPlaceholder('');
        } else {
            setPlaceholder('INICIAR BUSQUEDA');
        }
    };

    return (
        <div className="header">
            <div className="options">
                <i className="fa fa-search" aria-hidden="true" />
                <input 
                    type='text' 
                    id='search' 
                    value={searchText} 
                    placeholder={placeholder} 
                    onFocus={handleFocus} 
                    onBlur={handleBlur} 
                    onChange={handleChange} 
            
                />
            </div>
        </div>
    );
}

export default Header;
