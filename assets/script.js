var APIkey = "d1cbb5981d42bc71b129a89f7ff66db5";

// Prevent search without data entry in search bar
$("#city").on("click", function () {
    $("#search").attr("disabled", null);
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
        cityButton.attr("city", cities[i]).attr("class", "list-group-item list-group-item-primary list-group-item-action");
        cityButton.text(cities[i]);
        $("#cities").append(cityButton);
    }

    $("li").on("click", function (e) {
        e.preventDefault();
        var selectCity = $(this).attr("city");
        console.log(selectCity)
        $("#city").val(selectCity)
        callWeather();
    });
};

$("#test").on("click", function (e) {
    var cityInput = $(city.input);
    console.log(cityInput)
});

$("#search").on("click", function (e) {
    e.preventDefault();
    city.input = $("#city")
    var cityInput = $(city.input).val().trim();
    console.log(cityInput);
    cities.push(cityInput);
    fillCity();
    callWeather();
});


function callWeather() {
    var cityInput = $(city.input).val().trim();
    // console.log(cityInput);
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&appid=" + APIkey
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log(response);
            clearCity()
        });
};

function clearCity() {
    $("#city").val("");
};




