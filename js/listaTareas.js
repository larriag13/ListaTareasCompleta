let tareas = ["Tarea 1", "Tarea 2", "Tarea 3"]; //arreglo de tareas iniciales, guardará las tareas

let listaTareas = document.getElementById("listaTareas"); //captura ul donde se listan las tareas
listarTareas(tareas); //llamada a la función listarTareas, que muestra las tareas en el ul
//función que agrega tareas
function listarTareas(t) {
  //recibe un arreglo de tareas, las muestra en el ul
  listaTareas.innerHTML = ""; //limpia el ul
  t.forEach((tarea) => {
    //recorre el arreglo de tareas
    li = document.createElement("li"); //crea un elemento li
    li.textContent = tarea; //le asigna el texto de la tarea
    listaTareas.appendChild(li); //agrega el li al ul
    li.className = "list-group-item"; //le asigna una clase
  }); //fin del forEach
} //fin de la función listarTareas

let btnAgregar = document.getElementById("btnAgregar"); //captura el botón agregar
btnAgregar.addEventListener("click", agregarTarea); //agrega un evento click al botón agregar que llama a la
// función agregarTarea
function agregarTarea() {
  //función que agrega tareas
  let tarea = document.getElementById("tarea").value; //captura el valor del input tarea
  tareas.push(tarea); //agrega la tarea al arreglo de tareas
  listarTareas(tareas); //llama a la función listarTareas para mostrar la tarea en el ul
}

let btnBuscar = document.getElementById("btnBuscar"); //captura el botón buscar
btnBuscar.addEventListener("click", buscarTarea); //agrega un evento click al botón buscar que llama a la
// función buscarTarea
function buscarTarea() {
  //función que busca tareas
  let tareaBuscada = document.getElementById("tarea").value; //captura el valor del input tarea
  if (tareaBuscada == "") {
    //si el input está vacío
    listarTareas(tareas); //llama a la función listarTareas para mostrar todas las tareas en el ul
  } else {
    //si el input no está vacío
    tareasEncontradas = tareas.filter((tarea) => tarea == tareaBuscada); //filtra las tareas que coincidan con
    //  la tarea buscada
    if (tareasEncontradas.length > 0) {
      //si se encontraron tareas
      listarTareas(tareasEncontradas); //llama a la función listarTareas para mostrar las tareas
      // encontradas en el ul
    } else {
      //si no se encontraron tareas
      Swal.fire({
        //muestra un mensaje de error
        icon: "error", //tipo de mensaje
        title: "Oops...", //título del mensaje
        text: "No se encontraron tareas!", //texto del mensaje
        footer: "", //pie del mensaje
      });
    }
  }
}

let modalEditar = new bootstrap.Modal(document.getElementById("modalEditar")); //crea un modal de bootstrap a partir del id modalEditar del html
let btnEditar = document.getElementById("btnEditar"); //captura el botón editar
btnEditar.addEventListener("click", buscarTareaEditar); //agrega un evento click al botón editar que llama a la función buscarTareaEditar
let i = 0; //variable que guardará la posición de la tarea a editar
function buscarTareaEditar() {
  //función que busca tareas para editar
  let tarea_buscada = document.getElementById("tarea").value; //captura el valor del input tarea
  i = tareas.findIndex((tarea) => tarea == tarea_buscada); //busca la tarea en el arreglo de tareas
  if (i == -1) {
    //si no se encontró la tarea
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "No se encontro tarea para editar, ingrese una existente!",
      footer: "",
    });
  } else {
    //si se encontró la tarea
    let tituloModal = document.getElementById("modalEditarLabel"); //captura el título del modal
    tituloModal.textContent = "Editando " + tareas[i]; //le asigna el texto del título
    modalEditar.show(); //muestra el modal
  }
}

let btnGuardar = document.getElementById("btnGuardar"); //captura el botón guardar del modal
btnGuardar.addEventListener("click", guardarTarea); //agrega un evento click al botón guardar que llama a la función guardarTarea
function guardarTarea() {
  //función que guarda la tarea editada
  let tarea_nueva = document.getElementById("tarea_nueva").value; //captura el valor del input tarea_nueva
  modalEditar.hide(); //oculta el modal
  tareas[i] = tarea_nueva; //asigna la tarea nueva en la posición i
  listarTareas(tareas); //llama a la función listarTareas para mostrar las tareas en el ul
}

let modalEliminar = new bootstrap.Modal(
  document.getElementById("modalEliminar")
); //crea un modal de bootstrap a partir del id modalEliminar del html
let btnEliminar = document.getElementById("btnEliminar");
btnEliminar.addEventListener("click", eliminarTarea);
function eliminarTarea() {
  //función que busca la tarea para eliminar
  let tarea_buscada = document.getElementById("tarea").value; //captura el valor del input tarea
  i = tareas.findIndex((tarea) => tarea == tarea_buscada); //busca la tarea en el arreglo de tareas
  if (i == -1) {
    //si no se encontró la tarea
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "No se encontro tarea para eliminar, ingrese una existente!",
      footer: "",
    });
  } else {
    //si se encontró la tarea
    let tituloModal = document.getElementById("modalEliminarLabel"); //captura el título del modal
    tituloModal.textContent = "Eliminando " + tareas[i]; //le asigna el texto del título
    modalEliminar.show(); //muestra el modal
  }
}

let btnDelete = document.getElementById("btnDelete"); //captura el botón eliminar del modal
btnDelete.addEventListener("click", deleteTarea); //agrega un evento click al botón eliminar que llama a la función eliminarTarea
function deleteTarea() {
  //función que elimina la tarea
  modalEliminar.hide(); //oculta el modal
  tareas = tareas.filter((task) => task != tareas[i]);
  listarTareas(tareas); //llama a la función listarTareas para mostrar las tareas en el ul
}
