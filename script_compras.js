let inputCompras = document.getElementById('ingresar-compra');
let botonCompras = document.getElementById('button_compras');
let listaDeCompras = document.getElementById('lista-de-compras');

// Cargar tareas almacenadas al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    loadTasks();
});

function agregarCompra() {
    if (inputCompras.value) {
        // Crear tarea
        let tareaNuevaCompras = document.createElement('div');
        tareaNuevaCompras.classList.add('tarea');

        // Texto ingresado por el usuario
        let texto = document.createElement('p');
        texto.innerText = inputCompras.value;
        tareaNuevaCompras.appendChild(texto);

        // Crear y agregar contenedor de iconos
        let iconos = document.createElement('div');
        iconos.classList.add('iconos');
        tareaNuevaCompras.appendChild(iconos);

        // Iconos
        let completar = document.createElement('i');
        completar.classList.add('bi', 'bi-check-circle-fill', 'icono-completar');
        completar.addEventListener('click', completarTarea);

        let eliminar = document.createElement('i');
        eliminar.classList.add('bi', 'bi-trash3-fill', 'icono-eliminar');
        eliminar.addEventListener('click', eliminarTarea);

        iconos.append(completar, eliminar);

        // Agregar tarea nueva a la lista
        listaDeCompras.appendChild(tareaNuevaCompras);

        // Guardar tarea en localStorage
        saveTask(inputCompras.value);

        // Limpiar el campo de entrada después de agregar la tarea
        inputCompras.value = '';
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
        let tareaNuevaCompras = document.createElement('div');
        tareaNuevaCompras.classList.add('tarea');

        let texto = document.createElement('p');
        texto.innerText = task;
        tareaNuevaCompras.appendChild(texto);

        let iconos = document.createElement('div');
        iconos.classList.add('iconos');
        tareaNuevaCompras.appendChild(iconos);

        let completar = document.createElement('i');
        completar.classList.add('bi', 'bi-check-circle-fill', 'icono-completar');
        completar.addEventListener('click', completarTarea);

        let eliminar = document.createElement('i');
        eliminar.classList.add('bi', 'bi-trash3-fill', 'icono-eliminar');
        eliminar.addEventListener('click', eliminarTarea);

        iconos.append(completar, eliminar);
        listaDeCompras.appendChild(tareaNuevaCompras);
    });
}

// Función para eliminar tarea del localStorage
function removeTask(task) {
    let tasks = getSavedTasks();
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

botonCompras.addEventListener('click', agregarCompra);

inputCompras.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        agregarCompra();
    }
});
