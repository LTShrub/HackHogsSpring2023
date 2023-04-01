document.addEventListener('DOMContentLoaded', () => {
    const locationForm = document.getElementById('location-form');
    const loginButton = document.getElementById('login-btn');

    locationForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const locationStartInput = document.getElementById('location-start-input');
        const locationEndInput = document.getElementById('location-end-input');
        const startLocation = locationStartInput.value.trim();
        const endLocation = locationEndInput.value.trim();

        if (startLocation && endLocation) {
            // Store start and end location in sessionStorage (or localStorage)
            sessionStorage.setItem('startLocation', startLocation);
            sessionStorage.setItem('endLocation', endLocation);

            // Navigate to results.html page once the user fills out the required fields and hit submit
            window.location.href = 'results.html';
        }
    });
    loginButton.addEventListener('click', () => {
        window.location.href = 'login.html';
      });
});


function initAutocomplete() {
    const input = document.getElementById("pac-input");
    const searchBox = new google.maps.places.SearchBox(input);
  
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();
  
      if (places.length == 0) {
        return;
      }
  
      const resultsDiv = document.getElementById("results");
  
      // Clear out any existing results.
      resultsDiv.innerHTML = "";
  
      // Display a list of the search results.
      places.forEach((place) => {
        const result = document.createElement("div");
        result.textContent = place.name;
        resultsDiv.appendChild(result);
      });
    });
  }
  
initAutocomplete();
