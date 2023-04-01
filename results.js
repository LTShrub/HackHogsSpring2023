// Add this code to the existing results.js file

const savingsRanked = document.getElementById('savings-ranked');
const savingsData = [];
const startDest = 0;
const endDest = 0;
raining = false;
var weather;
var temp;
var city = "Fayetteville";
var county = "Washington";
var state = "Arkansas";
var country = "United States";

function getWeather(part1, part2, part3, part4)
{

	let url = "https://wttr.in/" + part1 + "," + part2 + "," + part3 + "?format=j1";
	console.log(url);

	var httpREQ = new XMLHttpRequest();
	httpREQ.open("GET", url, false);
	httpREQ.send(null);

	return (httpREQ.responseText);
}

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
document.addEventListener('DOMContentLoaded', () => {
    const backButton = document.getElementById('back-button');

    backButton.addEventListener('click', () => {
        // Navigate back to index.html
        window.location.href = 'index.html';
    });

    // Rest of the code
});
