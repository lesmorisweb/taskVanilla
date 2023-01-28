const taskButton = document.querySelector(".create-task-btn");
const taskInput = document.querySelector(".task-description");
const taskListContainer = document.querySelector(".task-list");
let taskDescription = "";
const allTasks = [];
let contador = 0; //esta varible se usa como id unico para las tareas y por eso se define fuera de las funciones 'handle<...event>'

function handleSubmit(title, tasks = allTasks) {
  if (title) {
    const newTask = {
      id: contador,
      title: title,
      completed: false,
    };
    contador++;
    //cuando se crea la primera tarea (contador=1) se retira el parrafo de 'No Tasks' y queta el estilo de no-display en el boton de eliminar tareas
    if (contador === 1) {
      const removeP = document.querySelector(".no-tasks");
      removeP.style.display = "none";
      const includeDB = document.querySelector(".delete-button");
      includeDB.classList.remove("no-display");
    }
    tasks.push(newTask);
    taskInput.value = ""; //limpiar el valor ingresado
    taskDescription = ""; //borrar la tarea en memoria

    //crear nueva tarea en el tag agrupador <section>
    const newSection = document.createElement("section");
    const newCheckbox = document.createElement("input");
    newCheckbox.classList.add("checkbox")
    newCheckbox.type = "checkbox";
    newSection.appendChild(newCheckbox);
    const newLabel = document.createElement("lable");
    newLabel.textContent = title;
    newLabel.classList.add("task-title", `task-title-${newTask.id}`);
    newSection.appendChild(newLabel);
    taskListContainer.appendChild(newSection);
    newSection.classList.add(`task-group-${newTask.id}`);

    // MANEJO DE TAREAS COMPLETADAS -CHECKBOX
    // crear eventlistener del cada nuevo ckeckbox
    const checkbox = document.querySelectorAll("input[type='checkbox']");
    checkbox.forEach((boton, index) => {
      boton.addEventListener("click", (e) => {
        const titleTask = document.querySelector(
          `.task-title-${allTasks[index].id}`
        );
        if (boton.checked) {
          titleTask.classList.add("checked-task");
        } else {
          titleTask.classList.remove("checked-task");
        }
      });
    });
  }
}

//MANEJO DE TAREAS -CREAR TAREAS A PARTIR DEL FORMULARIO
taskInput.addEventListener(
  "change",
  (event) => (taskDescription = event.target.value)
);

taskButton.addEventListener("click", () => handleSubmit(taskDescription));

//BORRAR TODAS LAS TAREAS SELECCIONADAS
const deleteButton = document.querySelector(".delete-button");
deleteButton.addEventListener("click", () => handleDelete());

function handleDelete() {
  const checkedTasks = document.querySelectorAll(".checked-task");
  checkedTasks.forEach((task) => {
    console.log(task.parentElement);
    task.parentElement.style.display = "none";
  });
}
