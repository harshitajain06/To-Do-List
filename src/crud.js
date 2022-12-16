class ToDoList {
  constructor(description, id, completed) {
    this.description = description;
    this.id = id;
    this.completed = completed;
  }

  static deleteTodo(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  static localStorageMock = (function localStore() {
    const data = {};

    return {
      getItem(key) {
        return data[key];
      },

      setItem(key, value) {
        data[key] = value;
      },

      getAll() {
        return data;
      },
    };
  }());

  static clearField() {
    document.getElementById('todo-input').value = '';
  }

  static setLocalStorage = (id, data) => {
    window.localStorage.setItem(id, JSON.stringify(data));
  };

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

  static checkboxCompleted(id, status) {
    const todoL = ToDoList.getToDo();
    id = Number(id.textContent);

    todoL.forEach((x) => {
      if (x.id === id) {
        if (status) {
          x.completed = true;
        } else {
          x.completed = false;
        }
      }
      localStorage.setItem('todoL', JSON.stringify(todoL));
    });
    return todoL;
  }

  static removeCompleted() {
    const todoL = ToDoList.getToDo();

    const notCompleted = todoL.filter((x) => x.completed === false);
    localStorage.setItem('todoL', JSON.stringify(notCompleted));
    ToDoList.resetId();
    window.location.reload();
  }

  static deleteCompletedTask() {
    const todoL = ToDoList.getToDo();

    const notCompleted = todoL.filter((x) => x.completed === false);
    localStorage.setItem('todoL', JSON.stringify(notCompleted));
    Storage.resetId();
    // window.location.reload();
  }

  static updateDescription(index, desc, tasks) {
    tasks.description = desc;
    return [tasks];
  }

  static editInput(id, e, tdHide, editPara) {
    if (e.children[0].classList.contains('dotsImg')) {
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

          input.addEventListener('keypress', (e) => {
            editPara.textContent = input.value;
            todo.description = input.value;
            localStorage.setItem('todoL', JSON.stringify(todoL));
            if (e.key === 'Enter') {
              window.location.reload();
            }
          });

          tdHide.appendChild(input);
        }
      });
    }
  }
}

export default ToDoList;