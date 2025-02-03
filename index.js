/////////////////////
// VARIABLES
/////////////////////

// API's base urls
const timeZoneDbUrl = 'https://api.timezonedb.com/v2.1/';
const openWeatherUrl = 'https://api.openweathermap.org/data/2.5/'

// API's needed keys
const openWeatherKey = '<api_key>'
const timeZoneDbKey = '<another_api_key>'

// DOM objects to be manipulated
const form = document.getElementById('ChronoWeatherForm');



/////////////////////
// FUNCTIONS
/////////////////////

// Auxiliar function to give the formated data of the timezone fetched
function formatTime(date) {
    return `day: ${date.slice(8,10)}/${date.slice(5,7)}/${date.slice(0,4)} - ${date.slice(11)}`
    //return `day: ${date.getDate()}/${date.getMonth()}/${date.getFullYear()} - ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2,'0')} `;       
}

// Handler to get the current time of the input's place
async function getTime(lon, lat) {
    let url = `${timeZoneDbUrl}get-time-zone?key=${timeZoneDbKey}&format=json&by=position&lat=${lat}&lng=${lon}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            // Formalizing the recieved data into date object
            let time = data.formatted;
            
            // Inserting the title of the place
            document.getElementById('outTitle').innerText = `Time and weather in ${data.cityName}`

            // Inserting the time information
            document.getElementById('outTimeText').innerText = formatTime(time);
            console.log(data);
        })
        .catch(error => {
            console.log(`ERROR: ${error}`); // Just for debug...
        });
}

// Handler to get the current weather of the input's place
async function getWeather(city) {
    let url = `${openWeatherUrl}weather?q=${city}&appid=${openWeatherKey}&units=metric`;

    try {
        let res = await fetch(url);
        let data = await res.json();

        document.getElementById('outWeatherText').innerText = `${data.weather[0].main} - ${data.weather[0].description}`;
        document.getElementById('temperature').innerText = `${data.main.temp}˚c - Fells like ${data.main.temp}˚c`;

        console.log(data);

        return [data.coord.lon, data.coord.lat];
    }
    catch(error) {
        console.log(`ERROR: ${error}`);
        return null;
    }
}

// Main function that fetches time and weather
async function getData() {
    let city = document.getElementById('city').value;

    try {
        let coord = await getWeather(city);

        // If coordinates were recieved, we will fetch the time at the place
        if(coord) {
            console.log(coord);
            getTime(coord[0], coord[1]);
        }
        else {
            throw new Error();
        }
    }
    catch(error) {
        // Informing the user and cleaning the previous info
        alert('Invalid place informed!!')
        document.getElementById('outTitle').innerText = '';
        document.getElementById('outTimeText').innerText = '';
        document.getElementById('outWeatherText').innerText = '';
        document.getElementById('temperature').innerText = '';

    }
    finally {
        // Cleaning the terminal's inputs
        document.getElementById('timeZone').value = '';
        document.getElementById('city').value = '';
    }
  
}



/////////////////////
// EVENTS
/////////////////////

// Event listener for the form delivery
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Stops the page to relaod?
    getData();
});