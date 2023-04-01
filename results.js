// Add this code to the existing results.js file

const savingsRanked = document.getElementById('savings-ranked');
const savingsData = [];
const startDest = 0;
const endDest = 0;
raining = false;

function findSolution(travelLength){
    acceptable = false;
    shortTrav = 5;
    medTrav = 10;
    //calculate carbon emisisons savings in grams
    walkSav = 100;
    pubSav = 45;
    carCost = 0;
    savingsData.length = 0;

    if(!raining){
        acceptable = true;
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
        savingsData.push({mode: 'Driving', savings: carSav});
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
