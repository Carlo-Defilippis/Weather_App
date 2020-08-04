$(document).ready(function() {
    

    // var loadStorage = localStorage.getItem("myCities")
    // console.log(JSON.parse(localStorage.getItem("myCities")).length)
    $(".past").hide()

    var myIndex = 0;
    var getStorage = localStorage.getItem("myCities")
    var index = 0;

    if (getStorage) {
        console.log("getStorage is true")
    var myStorage = getStorage.split(",")
    } else {
        var myStorage = [];
    }

    var myCities = [];
    

    
    
    if (myStorage.length > 0) {
        for (var i = 0; i < myStorage.length; i++) {
       myCities.push(myStorage[i])
        }
    }

    if (myCities.length > 0) {
        console.log(myCities.length)
        for (var i = 0; i < myCities.length; i++) {
            setPastSeaches(myCities[i].toString())
            console.log(myCities[i].toString())
        }
    }

    // creates button list for past searches
    function setPastSeaches(city) {
        $(".past").show()
        var listSet = $("<li>");
        listSet.attr("type", "button");
        listSet.attr("value", myIndex);
        listSet.addClass("list-group-item text-center btn btn-primary active mt-1 mb-1");
        listSet.text(city.charAt(0).toUpperCase() + city.slice(1));
        $(".pastsearch").prepend(listSet);
        myIndex++
    }

    $(".clearbtn").on("click", function() {
        $(".pastsearch").empty();
        myCities = [];
        index = 0;
        setStorage = JSON.stringify(localStorage.setItem(index, myCities));
        myIndex = 0;
    })

    $(".pastsearch").on("click", function(event) {
        event.preventDefault();
        var buttonSaved = $(this).val()
        var textValue = $( "li[value="+ myIndex +"]" ).val()
        console.log(buttonSaved, " is the textvalue, ", myIndex, " is the index")
    })

    $(".searchbtn").on("click", function(event) {
        event.preventDefault();
        searchterm = $( "input" ).val().trim().toLowerCase()
        myCities.push(searchterm)
        setPastSeaches(searchterm)
        JSON.stringify(localStorage.setItem("myCities", myCities))
        index++
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q="+ searchterm +"&units=imperial&appid=55e5dcb4c374e4d6ed89d06496f57e2a";
        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
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
          $(".form-control").val("");
      })



});