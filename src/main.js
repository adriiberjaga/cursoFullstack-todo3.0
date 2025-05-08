import './styles/style.css';
import { nanoid } from 'nanoid';

const toDoList = document.querySelector('.toDo-list');
const $form = document.querySelector('form');
const clearButton = document.getElementById('clearButton');
const itemsLeftOutput = document.querySelector('.items-left-output');
const resfresh = document.getElementById('btnRefresh') // btn elimanr todo
function setTodosInLocal() {
  localStorage.setItem('toDos', JSON.stringify(allToDos))

}


let allToDos = [];
const todosLocalStorage = localStorage.getItem('toDos');
allToDos = todosLocalStorage ? JSON.parse(todosLocalStorage) : [];

// Función principal que imprime los todos
function printToDos() {
  toDoList.innerHTML = ''; // Limpiar lista antes de pintar

  for (let toDo of allToDos) {
    const article = document.createElement('article');
    article.className = 'bg-white py-2 px-4 first:rounded-t flex items-center gap-3 border-b border-b-gray-300';

    const isChecked = toDo.isCompleted ? 'checked' : '';
    const isCheckIconVisible = toDo.isCompleted ? '' : 'hidden';

    article.innerHTML = `
      <input aria-label="Complete to-do checkbox" id="${toDo.id}" data-id="${toDo.id}" class="hidden peer" type="checkbox" ${isChecked}>
      <label for="${toDo.id}" class="w-4 h-4 border border-gray-400 rounded-full flex items-center justify-center peer-checked:bg-check-gradient">
        <svg class="${isCheckIconVisible} check-icon" xmlns="http://www.w3.org/2000/svg" width="10" height="9">
          <path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/>
        </svg>
      </label>
      <span class="peer-checked:line-through peer-checked:opacity-30">${toDo.task}</span>
      <button aria-label="Delete button" type="button" class="delete-btn ml-auto text-gray-600 cursor-pointer hover:scale-110 hover:rotate-90 transition-transform">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
          <path fill="currentColor" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/>
        </svg>
      </button>
    `;

    toDoList.append(article);
    handleChangeCompleted(article, toDo);
    handleDeleteToDo(article, toDo);
  }
}

// Cambiar estado completado
function handleChangeCompleted(article, toDo) {
  const checkBox = article.querySelector(`[data-id="${toDo.id}"]`);
  const checkIcon = article.querySelector('.check-icon');

  checkBox.addEventListener('change', () => {
    checkIcon.classList.toggle('hidden');
    toDo.isCompleted = !toDo.isCompleted;
    countItemsLeft();
    console.log(allToDos);
    setTodosInLocal() 
  });
}

// Eliminar ToDo individual
function handleDeleteToDo(article, toDo) {
  const deleteBtn = article.querySelector('.delete-btn');
  deleteBtn.addEventListener('click', () => {
    const index = allToDos.findIndex(item => item.id === toDo.id);
    if (index !== -1) {
      allToDos.splice(index, 1);
      printToDos();
      countItemsLeft();
      setTodosInLocal() 

    }
  });
}
 

// Contar cuántos items faltan por completar
function countItemsLeft() {
  const itemsLeftCount = allToDos.filter(toDo => !toDo.isCompleted).length;
  itemsLeftOutput.innerText = itemsLeftCount;
}

// Mostrar error si el input está vacío
function showInputError(input) {
  input.classList.add('inputTask');
  setTimeout(() => {
    input.classList.remove('inputTask');
  }, 2500);
}

// Crear un nuevo ToDo al enviar el formulario
function createTodo() {
  $form.addEventListener('submit', (e) => {
    e.preventDefault();

    const input = $form.querySelector('input');
    const value = input.value.trim();

    if (value === '') {
      showInputError(input);
      return;
    }

    const newTodo = {
      id: nanoid(5),
      task: value,
      isCompleted: false
    };

    allToDos.push(newTodo);
    printToDos();
    countItemsLeft();
    input.value = '';
    setTodosInLocal();

  });
}

// Limpiar todos los completados
function clearCompletedTodos() {
  clearButton.addEventListener('click', () => {
    allToDos = allToDos.filter(toDo => !toDo.isCompleted);
    printToDos();
    countItemsLeft();
    setTodosInLocal()

  });
}


resfresh.addEventListener('click', clearAllTodos)
function clearAllTodos() {
    allToDos = []
    printToDos()
    countItemsLeft()
    setTodosInLocal()
}
// Inicialización al cargar la página
function init() {
  printToDos();
  countItemsLeft();
  createTodo();
  clearCompletedTodos();
}


init();
