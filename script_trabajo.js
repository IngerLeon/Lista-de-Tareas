let inputTrabajo = document.getElementById('ingresar-trabajo-pendiente');
let botonTrabajo = document.getElementById('button_trabajo');
let listaDeTrabajo = document.getElementById('lista-de-trabajo-pendiente');

// Cargar tareas almacenadas al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    loadTasks();
});

function agregarTrabajo() {
    if (inputTrabajo.value) {
        // Crear tarea
        let tareaNuevaTrabajo = document.createElement('div');
        tareaNuevaTrabajo.classList.add('tarea');

        // Texto ingresado por el usuario
        let texto = document.createElement('p');
        texto.innerText = inputTrabajo.value;
        tareaNuevaTrabajo.appendChild(texto);

        // Crear y agregar contenedor de iconos
        let iconos = document.createElement('div');
        iconos.classList.add('iconos');
        tareaNuevaTrabajo.appendChild(iconos);

        // Iconos
        let completar = document.createElement('i');
        completar.classList.add('bi', 'bi-check-circle-fill', 'icono-completar');
        completar.addEventListener('click', completarTarea);

        let eliminar = document.createElement('i');
        eliminar.classList.add('bi', 'bi-trash3-fill', 'icono-eliminar');
        eliminar.addEventListener('click', eliminarTarea);

        iconos.append(completar, eliminar);

        // Agregar tarea nueva a la lista
        listaDeTrabajo.appendChild(tareaNuevaTrabajo);

        // Guardar tarea en localStorage
        saveTask(inputTrabajo.value);

        // Limpiar el campo de entrada después de agregar la tarea
        inputTrabajo.value = '';
    } else {
        alert('Por favor, ingresa una tarea');
    }
}

function completarTarea(e) {
    let tarea = e.target.parentNode.parentNode;
    tarea.classList.toggle('completada');
}

function eliminarTarea(e) {
    let tarea = e.target.parentNode.parentNode;
    tarea.remove();

    // Eliminar tarea del localStorage
    removeTask(tarea.querySelector('p').innerText);
}

// Función para guardar tarea en localStorage
function saveTask(task) {
    let tasks = getSavedTasks();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Función para obtener tareas almacenadas en localStorage
function getSavedTasks() {
    let tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

// Función para cargar tareas almacenadas en localStorage al cargar la página
function loadTasks() {
    let tasks = getSavedTasks();

    tasks.forEach(function(task) {
        let tareaNuevaTrabajo = document.createElement('div');
        tareaNuevaTrabajo.classList.add('tarea');

        let texto = document.createElement('p');
        texto.innerText = task;
        tareaNuevaTrabajo.appendChild(texto);

        let iconos = document.createElement('div');
        iconos.classList.add('iconos');
        tareaNuevaTrabajo.appendChild(iconos);

        let completar = document.createElement('i');
        completar.classList.add('bi', 'bi-check-circle-fill', 'icono-completar');
        completar.addEventListener('click', completarTarea);

        let eliminar = document.createElement('i');
        eliminar.classList.add('bi', 'bi-trash3-fill', 'icono-eliminar');
        eliminar.addEventListener('click', eliminarTarea);

        iconos.append(completar, eliminar);
        listaDeTrabajo.appendChild(tareaNuevaTrabajo);
    });
}

// Función para eliminar tarea del localStorage
function removeTask(task) {
    let tasks = getSavedTasks();
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

botonTrabajo.addEventListener('click', agregarTrabajo);

inputTrabajo.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        agregarTrabajo();
    }
});
