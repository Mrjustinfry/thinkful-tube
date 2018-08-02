'use strict';

const endPoint = "https://www.googleapis.com/youtube/v3/search";


function gatherData(searchTerm, callback) {
  const query = {
    q: `${searchTerm} in:name`,
    part: 'snippet',
    key: 'AIzaSyBwR0bCVOtP62sj-lJFkq94q8r2LFC6Lq0',
    maxResults: 5,
  }
  $.getJSON(endPoint, query, callback);
}

function renderResults(result) {
  return `
  <div class="vidBox">
  <h3>${result.snippet.title}</h3>
  <a class="videoLink" title="${result.snippet.title}" href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank">
  <img class="thumbnail" alt="${result.snippet.description}" src="${result.snippet.thumbnails.medium.url}"/></a>
  <p>${result.snippet.description}</p>
  <a href="https://www.youtube.com/channel/${result.snippet.channelId}" target="_blank">Click for more from ${result.snippet.channelTitle}</a>
  </div>`
}

function renderMsg() {
  return `<h4>Here are the top five videos.</h4>`; 
}

function displayData(data) {
  const results = data.items.map((item, index) => renderResults(item));
  $('.results').prop('hidden',false).html(results);
}


function formSubmit() {
  $('.searchForm').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.jsQuery');
    const query = queryTarget.val();
    queryTarget.val("");
    $('.resultMsg').prop('hidden',false).html(renderMsg);
    gatherData(query, displayData);
  });
}

 
$(formSubmit);
