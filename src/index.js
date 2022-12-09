import './style.css';
import returnImg from './assets/reload.svg';
import dots from './assets/dots.svg';

document.getElementById('returnImg').src = returnImg;
class ToDoList {
  constructor(description, id, completed) {
    this.description = description;
    this.id = id;
    this.completed = completed;
  }

  static displayToDo() {
    const todo = ToDoList.getToDo();

    todo.forEach((todo) => {
      ToDoList.addToDoList(todo);
    });
  }

  static addToDoList(todo) {
    const ulContainer = document.getElementById('tbody');
    const row = document.createElement('tr');

    if (todo.completed) {
      row.innerHTML = `
        <td> <input class='check'  id='checkBox' type="checkbox" checked /><td>
        <td><p class='paragragh strike-through'> ${todo.description}</p><td>
        <td class='hide'>${todo.id}</td>
        <td><img class='kebabImg' src="${dots}" alt="" /></td>
        <td><a href="#" class='delete'>🗑</a><td><hr>
        `;
    } else {
      row.innerHTML = `
        <td> <input class='check'  id='checkBox' type="checkbox" /><td>
        <td><p class='paragragh'> ${todo.description}</p><td>
        <td class='hide'>${todo.id}</td>
        <td><img class='kebabImg' src="${dots}" alt="" /></td>
    
        <td><a href="#" class='delete'>🗑</a><td><hr>
    
        `;
    }

    ulContainer.appendChild(row);
  }

  static deleteTodo(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  static clearField() {
    document.getElementById('todo-input').value = '';
  }

  static getToDo() {
    let todoL;
    if (!localStorage.getItem('todoL')) {
      todoL = [];
    } else {
      todoL = JSON.parse(localStorage.getItem('todoL'));
    }
    return todoL;
  }

  static addTodo(todo) {
    const todoL = ToDoList.getToDo();

    todoL.push(todo);

    localStorage.setItem('todoL', JSON.stringify(todoL));
  }

  static remove(id) {
    const todoL = ToDoList.getToDo();
    id = Number(id);
    todoL.forEach((todo, i) => {
      if (todo.id === id) {
        todoL.splice(i, 1);
      }
    });
    localStorage.setItem('todoL', JSON.stringify(todoL));
    ToDoList.resetId();
  }

  static resetId() {
    const todoL = ToDoList.getToDo();
    const arr = [];

    todoL.forEach((item) => {
      const newId = { ...item, id: arr.length + 1 };
      arr.push(newId);
      localStorage.setItem('todoL', JSON.stringify(arr));
    });
  }

  static delete(id) {
    const todoL = ToDoList.getToDo();
    const arr = [];

    todoL.forEach((item) => {
      if (item.id !== id) {
        arr.push(item);
        localStorage.setItem('todoL', JSON.stringify(arr));
      }
    });
  }

  static updateDescription(index, desc, tasks) {
    tasks.description = desc;
    return [tasks];
  }

  static editInput(id, e, tdHide, editPara) {
    if (e.children[0].classList.contains('dots')) {
      const todoL = ToDoList.getToDo();
      id = Number(id);
      todoL.forEach((todo) => {
        if (id === todo.id) {
          const editItem = todo.description;

          const edit = document.getElementsByName('edit')[0];

          if (edit) {
            edit.remove();
          }

          const input = document.createElement('input');
          input.type = 'text';
          input.name = 'edit';
          input.value = editItem;
          input.classList.add('edit');

          input.addEventListener('keypress', () => {
            editPara.textContent = input.value;
            todo.description = input.value;
            localStorage.setItem('todoL', JSON.stringify(todoL));
          });

          tdHide.appendChild(input);
        }
      });
    }
  }
}

document.addEventListener('DOMContentLoaded', ToDoList.displayToDo);

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const todoL = ToDoList.getToDo();
  const toDoInput = document.getElementById('todo-input').value;
  const id = todoL.length + 1;
  const completed = false;
  const todo = new ToDoList(toDoInput, id, completed);
  ToDoList.addToDoList(todo);
  ToDoList.addTodo(todo);
  ToDoList.clearField();
});
document.getElementById('mainContainer').addEventListener('click', (e) => {
  ToDoList.editInput(
    e.target.parentElement.parentElement.children[4].textContent,
    e.target.parentElement,
    e.target.parentElement.parentElement,
    e.target.parentElement.parentElement.children[2].children[0],
  );
  ToDoList.deleteTodo(e.target);
  if (e.target.classList.contains('check')) {
    ToDoList.checkboxCompleted(
      e.target.parentElement.parentElement.children[4],
      e.target.checked,
    );
    e.target.parentElement.parentElement.children[2].children[0].classList.toggle(
      'strike-through',
    );
  }
  ToDoList.remove(
    e.target.parentElement.previousElementSibling.previousElementSibling
      .textContent,
  );
});
