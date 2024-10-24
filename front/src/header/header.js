import './header.css';
import 'font-awesome/css/font-awesome.min.css';
import React, { useState } from 'react';

function Header({ onSearch }) {
    const [searchText, setSearchText] = useState('');
    const handleChange = (e) => {
        const value = e.target.value;
        setSearchText(value);
        onSearch(value); 

  
    };
    return (
        <div className="header">
            <div className="options">
                <i className="fa fa-search" aria-hidden="true" />
                <input 
                    type='text' 
                    id='search' 
                    value={searchText} 
                    placeholder={'BÚSQUEDA'} 
                    onChange={handleChange} 
            
                />
            </div>
        </div>
    );
}

export default Header;
