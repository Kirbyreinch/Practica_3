import './components.css';


function Planets() {
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
                    <tr>
                        <th>Nombre</th>
                        <th>Diametro</th>
                        <th>Periodo de Rotacion</th>
                        <th>Periodo Orbital</th>
                        <th>Gravedad</th>
                        <th>Color de ojos</th>
                        <th>Poblacion</th>
                        <th>Clima</th>
                        <th>Terreno</th>
                        <th>Superficie de Agua</th>
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

export default Planets;