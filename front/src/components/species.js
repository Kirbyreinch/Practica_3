import './components.css';
function Species() {
    return (
        <div className="contenedor">
            <div className="Titulo">
                <h1>Especies</h1>
            </div>
            <div className="Registrar">
                <button className='Btn_agregar'>+ Agregar Registro</button>
            </div>

            <div className="DatosBD">
                <table className='Table'>
                    <tr>
                        <th>Nombre</th>
                        <th>Clasificación</th>
                        <th>Designación</th>
                        <th>Estatura</th>
                        <th>Color de piel</th>
                        <th>Color de ojos</th>
                        <th>Fecha de ojos</th>
                        <th>Promedio de vida</th>
                        <th>Lenguaje</th>
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
export default Species;