// Add this code to the existing results.js file

const savingsRanked = document.getElementById('savings-ranked');
const savingsData = [];
var weather;
var temp;

function getWeather(part1, part2, part3, part4)
{

	let url = "https://wttr.in/" + part1 + "," + part2 + "," + part3 + "?format=j1";
	console.log(url);

	var httpREQ = new XMLHttpRequest();
	httpREQ.open("GET", url, false);
	httpREQ.send(null);

	return (httpREQ.responseText);
}

// results.js

document.addEventListener('DOMContentLoaded', () => {
    // Retrieve start and end location details from sessionStorage
    const startLocationDetails = JSON.parse(sessionStorage.getItem('startLocationDetails'));
    const endLocationDetails = JSON.parse(sessionStorage.getItem('endLocationDetails'));
  
    // Extract city, county, and state information for start and end locations
    const startCity = startLocationDetails.city;
    const startCounty = startLocationDetails.county;
    const startState = startLocationDetails.state;
    const startCountry = startLocationDetails.country;
  
    const endCity = endLocationDetails.city;
    const endCounty = endLocationDetails.county;
    const endState = endLocationDetails.state;
    const endCountry = endLocationDetails.country;
  
    // Call the weather API and retrieve the current weather for both start and end locations
    const startWeather = getWeather(startCity, startCounty, startState, startCountry);
    const endWeather = getWeather(endCity, endCounty, endState, endCountry);
  
    // Extract and display the temperature in Fahrenheit for start and end locations
    // Replace with actual temperature extraction based on the wttr.in API response
    // const startTempF = ''; // Extract temperature in Fahrenheit from startWeather API response
    // const endTempF = ''; // Extract temperature in Fahrenheit from endWeather API response
  
    const startWeatherObj = JSON.parse(startWeather);
    const endWeatherObj = JSON.parse(endWeather);

    const startTempF = startWeatherObj.current_condition[0].temp_F;
    const endTempF = endWeatherObj.current_condition[0].temp_F;

    const conditionsSaved = document.getElementById('conditions-saved');
    conditionsSaved.innerHTML = `Start: ${startTempF}°F | End: ${endTempF}°F`;
    const backButton = document.getElementById('back-button');

    backButton.addEventListener('click', () => {
        // Navigate back to index.html
        window.location.href = 'index.html';
    });
  });
  

function initMap() {
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const directionsService = new google.maps.DirectionsService();
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 14,
      center: { lat: 37.77, lng: -94}, 
    });
  
    directionsRenderer.setMap(map);

    //get start and end location from sessionStorage
    const startLocation = sessionStorage.getItem("startLocation");
    const endLocation =  sessionStorage.getItem("endLocation");

    calculateAndDisplayRoute(directionsService, directionsRenderer, startLocation, endLocation);

    document.getElementById("mode").addEventListener("change", () => {
      calculateAndDisplayRoute(directionsService, directionsRenderer, startLocation, endLocation);
    });
  }
  
  function calculateAndDisplayRoute(directionsService, directionsRenderer, start, end) {
    const selectedMode = document.getElementById("mode").value;
  
    directionsService
      .route({
        origin: start,
        destination:end,
        travelMode: google.maps.TravelMode[selectedMode],
      })
      .then((response) => {
        directionsRenderer.setDirections(response);

        // Calculate the distance between the two locations
        const route = response.routes[0].legs[0];
        const distance = route.distance.value;

        sessionStorage.setItem("distance", distance);

        calculateEmissionsAndFuelSaved(distance);
      })
      .catch((e) => window.alert("Directions request failed due to " + status));
  }

  
  function calculateEmissionsAndFuelSaved(distanceInMeters) {
    // Convert distance from meters to miles
    const mpg = 25;
    const distanceInMiles = distanceInMeters * 0.000621371;
  
    // Placeholder calculations
    const emissionResults = distanceInMiles * (1/mpg) * (8887) * (0.00220462); // Replace with your own calculation
    const fuelSaved = distanceInMiles * (1/mpg); // Replace with your own calculation
  
    // Display the results in the respective elements
    document.getElementById("emission-results").innerText = `${emissionResults.toFixed(2)} lb CO2`;
    document.getElementById("fuel-saved").innerText = `${fuelSaved.toFixed(2)} gal`;
    document.getElementById("distance").innerText = `${distanceInMiles.toFixed(1)} Miles`;

  }
  
    window.initMap = initMap;

function findSolution(travelLength){
    acceptable = false;
    shortTrav = 5;
    medTrav = 10;
    minTemp = 40;
    maxTemp = 85;
    //calculate carbon emisisons savings in grams
    walkSav = 100;
    pubSav = 45;
    carCost = 0;
    savingsData.length = 0;
    
    var json_obj = JSON.parse(getWeather(city, county, state, country));
    temp = json_obj.current_condition[0].temp_F;
    weather = json_obj.current_condition[0].weatherDesc[0].value;
    console.log(weather);
    if(temp > minTemp && temp < maxTemp){
        if(weather == 'Partly cloudy' || weather == 'Clear' || weather == "Overcast" || weather == "Sunny" || weather == 'Cloudy' || weather == 'Partly sunny')
        {
            acceptable = true;
        }
    }

    if(acceptable){
        if(travelLength <= shortTrav){
            savingsData.push({mode: 'Walking', savings: walkSav});
            savingsData.push({mode: 'Biking', savings: walkSav});
            savingsData.push({mode: 'Public Transit', savings: pubSav});
            savingsData.push({mode: 'Carpooling', savings: pubSav});
        }
        else if(travelLength <= medTrav && travelLength > shortTrav){
            savingsData.push({mode: 'Biking', savings: walkSav});
            savingsData.push({mode: 'Public Transit', savings: pubSav});
            savingsData.push({mode: 'Carpooling', savings: pubSav});
        }else{
            savingsData.push({mode: 'Carpooling', savings: pubSav});
        }
    }else{
        savingsData.push({mode: 'Carpooling', savings: pubSav});
        savingsData.push({mode: 'Driving', savings: carCost});
    }

}

findSolution(7);

// Sort the data in descending order based on savings
savingsData.sort((a, b) => b.savings - a.savings);

// Populate the list items
savingsData.forEach((item, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${index + 1}. ${item.mode} - ${item.savings}% savings`;
    savingsRanked.appendChild(listItem);
});

