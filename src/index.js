import './style.css';
import ToDoList from './crud.js';
import ToDo from './toDoList.js';

document.addEventListener('DOMContentLoaded', ToDo.displayToDo);
document.getElementById('completedBtn').addEventListener('click', () => {
  ToDoList.removeCompleted();
});

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const todoL = ToDoList.getToDo();
  const toDoInput = document.getElementById('todo-input').value;
  const id = todoL.length + 1;
  const completed = false;
  const todo = new ToDoList(toDoInput, id, completed);
  ToDo.addToDoList(todo);
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
