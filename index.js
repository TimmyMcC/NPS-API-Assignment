'use strict';

const apiKEY = 'mV6qwjwHKakYqTZnhPRvgy1JXxWUIg4RF9CARsMn'; 
const baseURL = 'https://developer.nps.gov/api/v1/parks';

function queryParamsToString(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  
  console.log(responseJson);
  $('#js-results-list').empty();
  $('#js-error').empty();
  
  for (let i = 0; i < responseJson.items.length; i++){
    $('#js-results-list').append(
      `<li><h3><a href="${responseJson.data[i].url}">${responseJson.data[i].fullName}</a></h3>
      <p>${responseJson.data[i].description}</p>
      </li>`
    );
  };
  
  $('#js-results').removeClass('hidden');
}

function getParkInfo(query, limit=10) {
  const params = {
    api_key: apiKEY,
    stateCode: query, 
    limit
  }
  const queryString = queryParamsToString(params)
  const url = baseURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('.js-form').on('submit', function() {
    event.preventDefault();
    const stateABBR = $('#js-state-search').val();
    const maxResults = $('#js-max-results').val();
    getParkInfo(stateABBR, maxResults);
  })
}

$(watchForm);