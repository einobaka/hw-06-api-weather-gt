var APIkey = "d1cbb5981d42bc71b129a89f7ff66db5";

var dateToday = moment().format('l');

// Prevent search without data entry in search bar
$("#city").on("click", function () {
    $("#search").attr("disabled", false);
});

var cities = [];
var city = {
    input: "",
};

// Adding cities function
function fillCity() {

    // Empty city array
    $("#cities").empty();
    // Loop append for additional cities
    for (let i = 0; i < cities.length; i++) {
        var cityButton = $("<li>")
        cityButton.attr("city", cities[i]).attr("class", "list-group-item list-group-item-light list-group-item-action");
        cityButton.text(cities[i]);
        $("#cities").append(cityButton);
    }

    $("li").on("click", function (e) {
        e.preventDefault();
        var selectCity = $(this).attr("city");
        console.log(selectCity)
        $("#city").val(selectCity)
        $("#cityDiv").remove();
        callWeather();
    });
};

$("#test").on("click", function (e) {
    var cityInput = $(city.input);
    // console.log(cityInput)
});

$("#search").on("click", function (e) {
    e.preventDefault();
    city.input = $("#city")
    var cityInput = $(city.input).val().trim();
    // console.log(cityInput);
    cities.push(cityInput);
    $("#cityDiv").remove();
    fillCity();
    callWeather();
    localStorage.setItem("cities", cities);
    console.log(cities);
});

function callWeather() {
    var cityInput = $(city.input).val().trim();
    // console.log(cityInput);

    // Query test link
    // https://api.openweathermap.org/data/2.5/forecast?q=tolleson&units=imperial&appid=d1cbb5981d42bc71b129a89f7ff66db5

    // Weather index query
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&units=imperial&appid=" + APIkey
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            // console.log(response);
            var currentDiv = $("<div>");
            var citySpan = $("<span>");
            var tempP = $("<p>");
            var humP = $("<p>");
            var windP = $("<p>");
            var uvSpan = $("<p>");
            var icon = $("<img>");

            var qLat = response.city.coord.lat;
            var qLon = response.city.coord.lon;

            var cityName = response.city.name;
            var cityTemp = response.list[0].main.temp;
            var cityHum = response.list[0].main.humidity;
            var cityWind = response.list[0].wind.speed;
            var cityCond = response.list[0].weather[0].description;

            var iconBase = "http://openweathermap.org/img/wn/";
            var iconResponse = response.list[0].weather[0].icon;

            $("#current").append(currentDiv);
            $(currentDiv).append(citySpan).attr("id", "cityDiv")
            $(citySpan).attr("id", "citySpan").text(cityName + " " + dateToday + " ").append(icon).append("(" + cityCond + ")").append(tempP).append(humP).append(windP).append(uvSpan);
            $(icon).attr("src", iconBase + iconResponse + ".png")
            $(tempP).text("Temperature: " + cityTemp + " ºF");
            $(humP).text("Humidity: " + cityHum + "%");
            $(windP).text("Wind Speed: " + cityWind + " MPH")
            $(uvSpan).attr("id", "uv");

            // console.log(cityName)
            // console.log(qLat);
            // console.log(qLon);          

            // Query test link
            // https://api.openweathermap.org/data/2.5/uvi/forecast?lat=33.45&lon=-112.2593&appid=d1cbb5981d42bc71b129a89f7ff66db5

            // UV index query
            var queryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + qLat + "&lon=" + qLon + "&appid=" + APIkey;
            $.ajax({
                url: queryURL,
                method: "GET"
            })
                .then(function (response) {

                    var uvRes = response[0].value;
                    var uvIndex = $("<span>");

                    $("#uv").text("UV Index:").append(uvIndex)
                    $(uvIndex).text(uvRes);

                    if (uvRes <= 2) {
                        $(uvIndex).attr("class", "uvLow").append(" (low)");
                    }
                    if (uvRes > 2 && uvRes <= 5) {
                        $(uvIndex).attr("class", "uvMed").append(" (medium)");
                    }
                    if (uvRes > 5 && uvRes <= 7) {
                        $(uvIndex).attr("class", "uvHigh").append(" (high)");
                    }
                    if (uvRes > 7 && uvRes <= 10.99) {
                        $(uvIndex).attr("class", "uvVH").append(" (very high)");
                    }
                    if (uvRes >= 11) {

                        $(uvIndex).attr("class", "uvEH").append(" (extremely high)");
                    };

                });

            clearCity();

        });

};

// Function for clearing input for new search
function clearCity() {
    $("#city").val("");
    $("#search").attr("disabled", true);
};

// function getStorage() {
//     cities = localStorage.getItem("cities");
// };

// $(document).ready(function () {
//     // getStorage();
// });





