import './style.css';

const tasks = [
  {
    description: 'Exercise',
    completed: 'true',
    index: '0',
  },
  {
    description: 'Walking',
    completed: 'false',
    index: '1',
  },
  {
    description: 'Dinners',
    completed: 'true',
    index: '2',
  },
];

function component() {
  const element = document.createElement('div');

  element.className = 'tododiv';
  element.innerHTML = `
  <div class="content">
  <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
  <label class="task">${tasks[0].description}</label>
  <span><i class="fa-solid fa-ellipsis-vertical"></i></span><br>
  </div>
  <div>
  <hr>
  <div class="content">
  <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
  <label class="task">${tasks[1].description}</label>
  <span><i class="fa-solid fa-ellipsis-vertical"></i></span><br>
  </div>
  <hr>
  <div class="content">
  <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
  <label class="task">${tasks[2].description}</label>
  <span><i class="fa-solid fa-ellipsis-vertical"></i></span><br>
  </div>
  <div>
  <div>
  <button class="clearAll" type="button">Clear all Completed</button>
  </div>
  `;

  return element;
}

document.body.appendChild(component());