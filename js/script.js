
// Welcome button interaction
const welcomeButton = document.getElementById("welcomeButton");

if (welcomeButton) {
    welcomeButton.addEventListener("click", function() {
        document.getElementById("welcomeMessage").textContent =
            "Welcome to LaGrange College! Make today a great day!";
    });
}

// Campus event interest button
const eventButton = document.getElementById("eventButton");

if (eventButton) {
    eventButton.addEventListener("click", function() {
        document.getElementById("eventMessage").textContent =
            "Thanks for your interest in campus activities!";
    });
}


// Weather API integration using Open-Meteo
const weatherButton = document.getElementById("weatherButton");

if (weatherButton) {
    weatherButton.addEventListener("click", async function() {

        const status = document.getElementById("weatherStatus");

        status.textContent = "Loading weather information...";

        // LaGrange, Georgia coordinates
        const url = "https://api.open-meteo.com/v1/forecast?latitude=33.0393&longitude=-85.0313&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=auto";

        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Weather information could not be loaded.");
            }

            const data = await response.json();
            const current = data.current;

            // Display current weather information
            document.getElementById("temperature").textContent =
                Math.round(current.temperature_2m) + "°F";

            document.getElementById("windSpeed").textContent =
                "Wind: " + current.wind_speed_10m + " mph";

            document.getElementById("humidity").textContent =
                "Humidity: " + current.relative_humidity_2m + "%";

            const descriptions = {
                0: "Clear skies",
                1: "Mostly clear",
                2: "Partly cloudy",
                3: "Cloudy",
                45: "Foggy",
                48: "Foggy",
                51: "Light drizzle",
                61: "Light rain",
                63: "Moderate rain",
                65: "Heavy rain",
                71: "Light snow",
                80: "Rain showers",
                95: "Thunderstorms"
            };

            document.getElementById("weatherDescription").textContent =
                descriptions[current.weather_code] || "Current weather conditions";

            status.textContent = "Weather updated successfully!";

        } catch (error) {
            status.textContent = "Unable to load weather. Please try again.";
            console.error(error);
        }
    });
}
