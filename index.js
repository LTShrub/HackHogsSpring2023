document.addEventListener('DOMContentLoaded', () => {
    const locationForm = document.getElementById('location-form');
    const weatherData = document.getElementById('weather-data');

    locationForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const locationInput = document.getElementById('location-input');
        const location = locationInput.value.trim();

        if (location) {
            // Fetch weather data based on location
            const data = await fetchWeatherData(location);

            if (data) {
                // Display weather data on the page
                weatherData.innerHTML = `
                    <h2>Weather for ${location}</h2>
                    <p>${data.description}</p>
                    <p>Temperature: ${data.temperature}°C</p>
                `;
            } else {
                weatherData.textContent = 'Error fetching weather data. Please try again.';
            }
        }
    });
});

async function fetchWeatherData(location) {
    // Replace with your API call to fetch weather data based on the location
    // For example, using OpenWeatherMap API:
    // const apiKey = 'your_openweathermap_api_key';
    // const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

    try {
        // const response = await fetch(url);
        // const data = await response.json();

        // Mock weather data for now
        const data = {
            description: 'Partly Cloudy',
            temperature: 23,
        };

        return {
            description: data.description,
            temperature: data.temperature.toFixed(1),
        };
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
}

