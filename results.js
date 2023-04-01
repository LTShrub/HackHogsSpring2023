// Add this code to the existing results.js file

const savingsRanked = document.getElementById('savings-ranked');
const savingsData = [];

function findSolution(travelLength, raining){
    acceptable = false;
    shortTrav = 5;
    medTrav = 10;
    savingsData.length = 0;

    if(!raining){
        acceptable = true;
    }

    if(acceptable){
        if(travelLength <= shortTrav){
            savingsData.push({mode: 'Walking', savings: 100});
            savingsData.push({mode: 'Biking', savings: 100});
            savingsData.push({mode: 'Public Transit', savings: 100});
            savingsData.push({mode: 'Carpooling', savings: 40});
        }
        else if(travelLength <= medTrav && travelLength > shortTrav){
            savingsData.push({mode: 'Biking', savings: 100});
            savingsData.push({mode: 'Public Transit', savings: 100});
            savingsData.push({mode: 'Carpooling', savings: 40});
        }else{
            savingsData.push({mode: 'Carpooling', savings: 40});
        }
    }else{
        savingsData.push({mode: 'Carpooling', savings: 40});
        savingsData.push({mode: 'Driving', savings: 0});
    }

}

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
    // Retrieve start and end location from sessionStorage (or localStorage)
    const startLocation = sessionStorage.getItem('startLocation');
    const endLocation = sessionStorage.getItem('endLocation');

    backButton.addEventListener('click', () => {
        // Navigate back to index.html
        window.location.href = 'index.html';
    });
});
