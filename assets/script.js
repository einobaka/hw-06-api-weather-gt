// https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=YOUR_API_KEY

// https://api.openweathermap.org/data/2.5/forecast?q={city name}&appid={your api key}

// $.ajax({
//     url: "/api/getWeather",
//     data: {
//       zipcode: 97201
//     },
//     success: function( result ) {
//       $( "#weather-temp" ).html( "<strong>" + result + "</strong> degrees" );
//     }
//   });

var cities = [];

function fillCity() {
    $("#cities").empty();

    for (let i = 0; i < cities.length; i++) {
        var cityButton = $("<li>")
        cityButton.attr("id", cities[i]).attr("class", "list-group-item list-group-item-primary list-group-item-action");
        cityButton.text(cities[i]);
        $("#cities").append(cityButton);
    }

};

$("#search").on("click", function (e) {
    e.preventDefault();
    var cityInput = $("#city").val().trim();
    console.log(cityInput);
    cities.push(cityInput);
    fillCity();
    $("#city").val("");

});


