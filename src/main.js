import './styles/style.css';

import { nanoid } from 'nanoid';

const toDoList = document.querySelector('.toDo-list');


const allToDos = [
  {
    id: nanoid(5),
    task: 'Comprar leche 🥛',
    isCompleted: false
  },
  {
    id: nanoid(5),
    task: 'Escribir código 💻',
    isCompleted: true
  },
  {
    id: nanoid(5),
    task: 'Hacer la compra 🛒',
    isCompleted: false
  }
];



// Imprimir los todos al cargar la página
printToDos();

// Rellenar el número de items que faltan por completar
countItemsLeft();



function printToDos () {
  const toDoList = document.querySelector('.toDo-list');
  toDoList.innerHTML = ''; // Limpia antes de volver a pintar

  for (const toDo of allToDos) {
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

    const checkBox = article.querySelector(`[data-id="${toDo.id}"]`);
    const checkIcon = article.querySelector('.check-icon');

    checkBox.addEventListener('change', () => {
      checkIcon.classList.toggle('hidden');
      toDo.isCompleted = !toDo.isCompleted;
      countItemsLeft();
      console.log(allToDos)
    });

    const deleteBtn = article.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
      const index = allToDos.findIndex(item => item.id === toDo.id);
      if (index !== -1) {
        allToDos.splice(index, 1);
        printToDos();
        countItemsLeft();
      }
    });
  }
}



function countItemsLeft () {
  const itemsLeftOutput = document.querySelector('.items-left-output');
  
  let itemsLeftCount = 0;
  for (const toDo of allToDos) {
    if (toDo.isCompleted === false) {
      itemsLeftCount++;
    }
  }
  
  itemsLeftOutput.innerText = itemsLeftCount;
}


//cazamos el formulario y escuchamos el evento submit

const $form = document.querySelector('form');

function createTodo() {
  $form.addEventListener('submit', (e) => {
    e.preventDefault();

    const input = $form.querySelector('input');
    const value = input.value.trim();

    if (value === '') return; // No añadir tareas vacías

    const newTodo = {
      id: nanoid(5),
      task: value,
      isCompleted: false
    };

    allToDos.push(newTodo);
    
    // Limpiar la lista actual para volver a imprimir todo
    toDoList.innerHTML = '';

    // Volver a imprimir todo
    printToDos();
    countItemsLeft();

    // Limpiar input
    input.value = '';
  });
}

createTodo();
