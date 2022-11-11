var now = moment().format("MM/D/YY");
var API_KEY = "443f95f5a7cc491d4420db28a2a336e1";
function getApiCurrent(city) {
  // fetch request gets a list of all the repos for the node.js organization
  // var requestURLCurrent =
  //   "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=" +
  //   city +
  //   "&appid=" +
  //   API_KEY;
  var requestUrlCurrent =
    "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=tampa&appid=443f95f5a7cc491d4420db28a2a336e1";

  fetch(requestUrlCurrent)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      $("#current-weather-1").text("Weather for " + city + " (" + now + ")");
      $("#weather-icon").attr(
        "src",
        "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png"
      );
      $("#current-temp-1").text("Temp: " + data.main.temp + "F");
      $("#current-wind-1").text("Wind: " + data.wind.speed + "mph");
      $("#current-humidity-1").text("Humidity: " + data.main.humidity + "%");
    })
    .catch((err) => {
      console.log(err);
      $(".search-status").text(city + " not found!");
    });
}
function getApiFuture(city) {
  var requestUrlFuture =
    "https://api.openweathermap.org/data/2.5/forecast?units=imperial&q=" +
    city +
    "&appid=" +
    API_KEY;

  fetch(requestUrlFuture)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      if (data) {
        saveToRecentSearch(recentSearches, city);
      }

      var futureDayArr = [4, 12, 20, 28, 36];

      for (var i = 0; i < futureDayArr.length; i++) {
        var dayLater = futureDayArr[i];
        var htmlIndex = i + 1;
        var futureMomentDate = moment()
          .add(htmlIndex, "days")
          .format("MM/D/YY");

        console.log(data.list[dayLater]);

        $("#future-date-" + htmlIndex).text(futureMomentDate);
        $("#future-weather-icon-" + htmlIndex).attr(
          "src",
          "http://openweathermap.org/img/w/" +
            data.list[dayLater].weather[0].icon +
            ".png"
        );
        $("#future-temp-" + htmlIndex).text(
          "Temp: " + data.list[dayLater].main.temp + "F"
        );
        $("#future-winds-" + htmlIndex).text(
          "Wind: " + data.list[dayLater].wind.speed + "mph"
        );
        $("#future-humidity-" + htmlIndex).text(
          "Humidity: " + data.list[dayLater].main.humidity + "%"
        );
      }
    });
}
var searchForm = $(".search-form");
searchForm.submit(function (e) {
  e.preventDefault();
  var userCity = $(".user-city").val().toString();
  console.log(userCity);
  getApiCurrent(userCity);
  getApiFuture(userCity);
});
//grab the fields we need
var searchForm = $(".search-form");
var userCity = $(".user-city").val().toString(); //converts to string explicitly

//store loading logic in a function
function loadRecentSearches() {
  //handles null value if there is no array already in place.
  if (JSON.parse(localStorage.getItem("recentSearches")) == null) {
    return []; //creates array if no array exists. 
  } else {
    //if it does exist, grab it & parse it out. 
    var recentSearches = JSON.parse(localStorage.getItem("recentSearches"));
    return recentSearches;
  }
}

//set all of that to a variable that we can use.
var recentSearches = loadRecentSearches();

//log for verbose debugging reasons.
console.log(recentSearches);

//hard coding test of mapping a recent search value to html element. 
$("#recent-1").text(recentSearches[0]);
$("#recent-2").text(recentSearches[1]);
$("#recent-3").text(recentSearches[2]);
$("#recent-4").text(recentSearches[3]);
$("#recent-5").text(recentSearches[4]);
$("#recent-6").text(recentSearches[5]);
$("#recent-7").text(recentSearches[6]);
$("#recent-8").text(recentSearches[7]);


//save new search item logic, stored in a function.
function saveToRecentSearch(recentArr, city) {
  //push city to array
  recentArr.push(city);
  //overwrite with new/latest array. 
  localStorage.setItem("recentSearches", JSON.stringify(recentArr));
 
  console.log(recentArr);
}

