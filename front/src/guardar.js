// //      COMPONENTE NO FUNCIONAL USADO PARA FINES EXPERIMENTALES     //



// Visual:
// - El menú no me indica en qué módulo me encuentro
// - La búsqueda aplica para los resultados que se muestran en pantalla. Si quiero buscar un personaje que no veo en pantalla no lo muestra.
// - Hay que homologar los resultados vacíos sin definir, hay unos registros que tienen "n/a", "unknown" o "none". Dejar uno de ellos en todos los casos.
// - El modal de eliminar un registro no mantiene los botones en su lugar. Si la pantalla es más pequeña que en la que se desarrolló se mueven de lugar estos botones.
// - En el modal de agregar o editar algún registro, el contenedor del formulario es más grande en la mayoría de los módulos, en el caso de las películas es más pequeño y hay espacio que no se usa del modal.
// - Para ver detalle de cualquier registro puede usarse el mismo modal para agregar o editar el registro, solo deshabilitando los campos.
// -no se limpian los formularios después de cerrar.
// Código en front:
// - Los modales "delete_modal.js" y "register_modal.js" pueden combinarse para usar el mismo modal solo enviando el mensaje a mostrar.
// - Los modales para crear y modificar registros, se puede utilizar una de ellas parametrizando el componente para saber si se puede editar o no. También se puede usar un solo modal para ver el detalle de cada registro.
// - No se le tiene que poner un timer al indicador de carga, mostrar el spinner hasta tener respuesta del servicio. Para esto se puede usar una variable que controle el estatus y reemplazar el botón por el spinner.


// - En los personajes no guarda películas, especies, naves espaciales y vehículos.

// Código back:
// - En los personajes no guarda películas, especies, naves espaciales y vehículos.