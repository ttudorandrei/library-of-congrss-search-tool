const renderData = function (dataToBeRendered) {
  $("#mainContainer").empty(); // empties the container before appending data

  // for each result, create a div and append it to the container
  for (let index = 0; index < dataToBeRendered.results.length; index++) {
    const result = dataToBeRendered.results[index];

    const div = `<h1>${result.title}</h1>`;
    $("#mainContainer").addClass("flex-column");
    $("#mainContainer").append(div);
  }
};

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
      renderData(data);
    })
    // if there's an error, log it to the console
    .catch(function (error) {
      console.error(error);
    });
};

const searchOnSubmit = function (event) {
  event.preventDefault();

  // retrieves the values from the
  const searchInputValue = $("#searchInput").val();
  const resNumber = $("#searchInputCount").val();

  getSearchData(searchInputValue, resNumber);
};

// "hacky" way of re-rendering the hard-coded form by reloading the page
// this is done instead of moving the form to js and dynamically rendering it
$("#homeButton").on("click", function () {
  window.location.reload();
});
$("#searchForm").on("submit", searchOnSubmit);
