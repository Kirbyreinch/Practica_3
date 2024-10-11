import './components.css';

function Characters() {
    return (
        <div className="contenedor">
            <div className="Titulo">
                <h1>Personajes</h1>
            </div>
            <div className="Registrar">
                <button className='Btn_agregar'>+ Agregar Registro</button>
            </div>

            <div className="DatosBD">
                <table className='Table'>
                    <tr>
                        <th>Nombre</th>
                        <th>Altura</th>
                        <th>Peso</th>
                        <th>Color de cabello</th>
                        <th>Color de piel</th>
                        <th>Color de ojos</th>
                        <th>Fecha de nacimiento</th>
                        <th>Género</th>
                        <th>Planeta de nacimiento</th>
                        <th>Acciones</th>
                    </tr>
                    <tr>
                        <td>luke</td>
                    </tr>
                </table>
            </div>
            
            
            <div className="Paginacion">
               <a>1,2,3,4...</a>
            </div>

           
        </div>
    );
}

export default Characters;
