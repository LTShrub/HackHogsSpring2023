// Add this code to the existing results.js file

const savingsRanked = document.getElementById('savings-ranked');

// Replace the following array with your calculated savings data
const savingsData = [
    { mode: 'Biking', savings: 80 },
    { mode: 'Public Transit', savings: 60 },
    { mode: 'Carpooling', savings: 40 },
];

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
