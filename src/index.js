import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';

//let {log} = console

function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

function getGreeting() {
  if (user) {
    return formatName(user);
  }
  return 'Stranger';
}

let user = {
  firstName: 'Dwi',
  lastName: 'Prabowo'
};
//user = false;

let a;

for(let i in "abc") {
  a += i;
}

let types = [
  1*undefined, 2*false, 2*true,
  '----------------',
  0, undefined, null, NaN, Infinity,
  typeof undefined, typeof NaN,
];

const el = <div>
  <pre>{JSON.stringify(types)}</pre>
  <pre>{a}</pre>
  <h1>Hi, {getGreeting()}</h1>
</div>;

ReactDOM.render(el, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
