import Header from './header/header'
import Sidebar from './sidebar/sidebar'
import Characters from './components/characters'
import Planets from './components/planets'
import Films from './components/films'
import Species from './components/species'
import Starships from './components/starships'
import Vehicles from './components/vehicles'
import React, { useState } from 'react';
import './App.css';

function App() {
  const [currentComponent, setCurrentComponent] = useState('characters');
  const renderComponent = () => {
    switch (currentComponent) {
      case 'characters':
        return <Characters />;
      case 'planets':
        return <Planets />;
      case 'films':
        return <Films />;
      case 'species':
        return <Species />;
      case 'starships':
        return <Starships />;
      case 'vehicles':
        return <Vehicles />;
      default:
        return <Characters />;
    }
  };
  return (
    <div className="app">
      <Header />
      <div className="content">
        {renderComponent()}
      </div>
      <Sidebar onSelect={setCurrentComponent} />



    </div>
  );
}

export default App;
