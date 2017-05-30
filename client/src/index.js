import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';



function getButtonClick(){
  document.getElementById('fly').addEventListener('click', function (event) {
      var search=document.getElementById('bar').value;

})
}

var Mod="all";

ReactDOM.render(

<App Api={Mod} />,
  document.getElementById('root')
);
