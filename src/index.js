import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';

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
user = false;

const el = <h1>Hi, {getGreeting()}</h1>;

ReactDOM.render(el, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
