$(document).ready(function() {
    
    
    

    var myCities = [];

    function setPastSeaches(city) {
        var listSet = $("<li>");
        listSet.addClass("list-group-item text-center");
        listSet.text(city.charAt(0).toUpperCase() + city.slice(1));
        console.log(city.charAt(0).toUpperCase() + city.slice(1))
        $(".pastsearch").append(listSet);
    }

    $(".clearbtn").on("click", function() {
        $(".pastsearch").empty();
        myCities = [];
        setStorage = localStorage.setItem("myCities", myCities)
    })

    $(".searchbtn").on("click", function(event) {
        event.preventDefault();
        var saveButton = $(this).val()
        searchterm = $( "input" ).val().trim().toLowerCase()
        myCities.push(searchterm)
        console.log(searchterm, saveButton)
        console.log(myCities)
        setPastSeaches(searchterm)
        var setStorage = localStorage.setItem("myCities", myCities)
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q="+ searchterm +"&units=imperial&appid=55e5dcb4c374e4d6ed89d06496f57e2a";
        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
            console.log(response)
            console.log(response.weather[0].main)
            console.log(response.weather[0].main.toLowerCase().includes("clear"))
            console.log(response.main.temp)
            console.log(response.main.feels_like)
            if (response.weather[0].description.toLowerCase().includes("clear")) {
                $(".temphere").html("Current Temp: " + response.main.temp.toFixed(1) + '<i class="fas fa-thermometer-half" style="font-size: 30px"></i><img src="assets/clear sky.png" alt="clear skies"></img> <h6 class="text-right mr-4">' + response.weather[0].description + '</h6>')
            } else if (response.weather[0].description.toLowerCase().includes("few")) {
                $(".temphere").html("Current Temp: " + response.main.temp.toFixed(1) + '<i class="fas fa-thermometer-half" style="font-size: 30px"></i><img src="assets/few clouds.png" alt="few clouds"></img> <h6 class="text-right mr-4">' + response.weather[0].description + '</h6>')
            } else if (response.weather[0].description.toLowerCase().includes("cloud")) {
                $(".temphere").html("Current Temp: " + response.main.temp.toFixed(1) + '<i class="fas fa-thermometer-half" style="font-size: 30px"></i><img src="assets/scattered clouds.png" alt="scattered clouds"></img> <h6 class="text-right mr-4">' + response.weather[0].description + '</h6>')
            } else if (response.weather[0].description.toLowerCase().includes("broken")) {
                $(".temphere").html("Current Temp: " + response.main.temp.toFixed(1) + '<i class="fas fa-thermometer-half" style="font-size: 30px"></i><img src="assets/broken clouds.png" alt="broken clouds"></img> <h6 class="text-right mr-4">' + response.weather[0].description + '</h6>')
            } else if (response.weather[0].description.toLowerCase().includes("shower")) {
                $(".temphere").html("Current Temp: " + response.main.temp.toFixed(1) + '<i class="fas fa-thermometer-half" style="font-size: 30px"></i><img src="assets/shower rain.png" alt="rain shower"></img> <h6 class="text-right mr-4">' + response.weather[0].description + '</h6>')
            } else if (response.weather[0].description.toLowerCase().includes("rain")) {
                $(".temphere").html("Current Temp: " + response.main.temp.toFixed(1) + '<i class="fas fa-thermometer-half" style="font-size: 30px"></i><img src="assets/rain.png" alt="rain"></img> <h6 class="text-right mr-4">' + response.weather[0].description + '</h6>')
            } else if (response.weather[0].description.toLowerCase().includes("thunder")) {
                $(".temphere").html("Current Temp: " + response.main.temp.toFixed(1) + '<i class="fas fa-thermometer-half" style="font-size: 30px"></i><img src="assets/thunderstorm.png" alt="thunder"></img> <h6 class="text-right mr-4">' + response.weather[0].description + '</h6>')
            } else if (response.weather[0].description.toLowerCase().includes("snow")) {
                $(".temphere").html("Current Temp: " + response.main.temp.toFixed(1) + '<i class="fas fa-thermometer-half" style="font-size: 30px"></i><img src="assets/snow.png" alt="snow"></img> <h6 class="text-right mr-4">' + response.weather[0].description + '</h6>')
            } else {
                $(".temphere").html("Current Temp: " + response.main.temp.toFixed(1) + '<i class="fas fa-thermometer-half" style="font-size: 30px"></i><img src="assets/mist.png" alt="mist"></img> <h6 class="text-right mr-4">' + response.weather[0].description + '</h6>')
            }
            
            $(".cityhere").text(response.name)
            $(".tempfeels").html("Feels like: " + response.main.feels_like.toFixed(1) + '<i class="fas fa-thermometer-half" style="font-size: 12px"></i>')
          });
      })



});