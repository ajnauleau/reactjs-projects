

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from '../src/components/App/App.js';
import registerServiceWorker from './registerServiceWorker';

const inputField = document.querySelector('#input');
const submit = document.querySelector('#submit');
const responseField = document.querySelector('#responseField');

// AJAX function
const getSuggestions = () => {
	const wordQuery = inputField.value;
  const endpoint = url + queryParams + wordQuery;
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) 		 {
      renderResponse(xhr.response)
    }
  }

  xhr.open('GET', endpoint);
  xhr.send();
}


// Clear previous results and display results to webpage
const displaySuggestions = (event) => {
  event.preventDefault();
  while(responseField.firstChild){
    responseField.removeChild(responseField.firstChild);
  };
  getSuggestions();
}

submit.addEventListener('click', displaySuggestions);


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
