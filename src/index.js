import _ from 'lodash';
import printMe from './print.js';
import './style.css';
import Icon from './icon.png';
import Data from './data.xml';
import Notes from './data.csv';

function component() {
  const element = document.createElement('div');
  const btn = document.createElement('button');

  // Lodash, now imported by this script
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');
  // Add the image to our existing div.
  const myIcon = new Image();
  myIcon.src = Icon;

  element.appendChild(myIcon);

  console.log(Data);
  console.log(Notes);

  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe;

  element.appendChild(btn);

  return element;
}

document.body.appendChild(component());