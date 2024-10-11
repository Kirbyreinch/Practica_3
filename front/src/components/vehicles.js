import './components.css';
function Vehicles() {
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
export default Vehicles;