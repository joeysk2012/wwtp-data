/* eslint-disable no-undef */
function search(query, cb) {
  return fetch(`api/wwtp?q=${query}`, {
    accept: 'application/json',
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function correct(query, cb) {
  var url='http://api.openweathermap.org/data/2.5/weather?q='+query+',usa&appid=4e44e3428b01d9a6ad76981f8ab8db5a'

  return fetch(url, {
    accept: 'application/json',
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error); // eslint-disable-line no-console
  throw error;
}

function parseJSON(response) {
  return response.json();
}

const Client = { search, correct};
export default Client;
