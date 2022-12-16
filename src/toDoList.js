import dots from './assets/dots.svg';
import ToDoList from "./crud.js";
import returnI from './assets/reload.jpg';
document.getElementById('returnImg').src = returnI;
class ToDo {

    static addToDoList(todo) {
        const ulContainer = document.getElementById('tbody');
        const row = document.createElement('tr');
    
        if (todo.completed) {
          row.innerHTML = `
            <td> <input class='check'  id='checkBox' type="checkbox" checked /><td>
            <td><p class='paragragh strike-through'> ${todo.description}</p><td>
            <td class='hide'>${todo.id}</td>
            <td><img class='dotsImg' src="${dots}" alt="" /></td>
            <td><a href="#" class='delete'>🗑</a><td>
            `;
        } else {
          row.innerHTML = `
            <td> <input class='check'  id='checkBox' type="checkbox" /><td>
            <td><p class='paragragh'> ${todo.description}</p><td>
            <td class='hide'>${todo.id}</td>
            <td><img class='dotsImg' src="${dots}" alt="" /></td>
        
            <td><a href="#" class='delete'>🗑</a><td>
        
            `;
        }
    
        ulContainer.appendChild(row);
      }

      static displayToDo() {
        const todo = ToDoList.getToDo();
    
        todo.forEach((todo) => {
          ToDo.addToDoList(todo);
        });
      }
    
}

export default ToDo;