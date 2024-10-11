import './components.css';
function Starships() {
    return (
        <div className="contenedor">
            <div className="Titulo">
                <h1>Naves</h1>
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
                        <th>Hiperimpulsor</th>
                        <th>MGLT</th>
                        <th>Capacidad de carga</th>
                        <th>Tiempo maximo de combustible</th>
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
export default Starships;