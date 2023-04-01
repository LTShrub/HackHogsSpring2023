document.addEventListener('DOMContentLoaded', () => {
    const locationForm = document.getElementById('location-form');

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
});