const getSearchData = function (searchTerm, noOfResults) {
  const requestUrl = `https://www.loc.gov/search/?q=${searchTerm}&fo=json&c=${noOfResults}`;

  // making the request for data. returns a promise
  fetch(requestUrl)
    // when the promise is resolved, jsonify the response
    .then(function (response) {
      return response.json();
    })
    // when the response is here and jsonified, get me the data and do whatever with it
    .then(function (data) {
      console.log(data);
    })
    .catch(function (error) {
      console.log(error);
    });
};

const searchOnSubmit = function (event) {
  event.preventDefault();

  const searchInputValue = $("#search-input").val();
  const resNumber = $("#search-input-count").val();

  getSearchData(searchInputValue, resNumber);
};

$("#search-form").on("submit", searchOnSubmit);
