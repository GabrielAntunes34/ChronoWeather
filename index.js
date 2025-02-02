/////////////////////
// VARIABLES
/////////////////////

// API's base urls
const worldTimeUrl = 'https://worldtimeapi.org/api/timezone/'
const openWeatherUrl = 'https://api.openweathermap.org/data/2.5/'

// API's needed keys
const openWeatherKey = '06d78e10495591c0c503e30c7898eb69'

// DOM objects to be manipulated
const form = document.getElementById('ChronoWeatherForm');

/////////////////////
// FUNCTIONS
/////////////////////
function formatTime(date) {

    return `day: ${date.getDate()}/${date.getMonth()}/${date.getFullYear()} - ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2,'0')} `;       
}


async function getData(params) {
    let timeZone = document.getElementById('timeZone').value;
    let city = document.getElementById('city').value;


    fetch('https://worldtimeapi.org/api/timezone/' + timeZone + '/' + city)
        .then(res => res.json())
        .then(data => {
            // Formalizing the recieved data into date object
            let time = new Date(data.datetime.split('.')[0]);
            
            // Inserting the title of the place
            document.getElementById('outTitle').innerText = `Time and weather in ${city}`

            // Inserting the time information
            document.getElementById('outTimeText').innerText = formatTime(time);
            console.log(data);
        })
        .catch(error => {
            console.log(`ERROR: ${error}`); // Just for debug...

            // Informing the user and cleaning the previous info
            alert('Invalid place informed!!')
            document.getElementById('outTitle').innerText = '';
            document.getElementById('outTimeText').innerText = '';
        })
        .finally(() => {
            // Cleaning the terminal's inputs
            document.getElementById('timeZone').value = '';
            document.getElementById('city').value = '';
        });

    
}



/////////////////////
// EVENTS
/////////////////////

// Event listener for the form delivery
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Stops the page to relaod?
    getData();
});