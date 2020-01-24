/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let month = d.getMonth() + 1;
let newDate = month +'.'+ d.getDate()+'.'+ d.getFullYear();
let feelingsValue = '';

// Personal API Key for OpenWeatherMap API

const baseURL = 'http://api.openweathermap.org';
const apiKey = '2564aecf6948c03527f98672bb1cd0e7';

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', handleGeneratingData);

/* Function called by event listener */
function handleGeneratingData(event) {
  const zipCode = document.getElementById('zip').value;
  feelingsValue = document.getElementById('feelings').value;
  if (!zipCode || !feelingsValue) {
    alert('Please fill in all informations!');
  }
  else {
    getWeatherData(baseURL, zipCode, apiKey)
    .then(allData => postData('/weather', allData))
    .then(updateUI);
  }
}
/* Function to GET Web API Data*/
const getWeatherData = async (url='', zipCode, key) => {
  const request = await fetch(`${url}/data/2.5/weather?zip=${zipCode}&APPID=${apiKey}`);
  try {
    const data = await request.json();
    // return allData;
    const allData = {
      temp: data.main.temp,
      date: newDate,
      feeling: feelingsValue,
    }
    console.log(allData);
    return allData;
  }
  catch(error) {
    console.log('error',error);
  }
}

/* Function to POST data */
const postData = async (url='', data={}) => {
  const response = await fetch (url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }) 
  try {
    if (response.status == 200) { return;}
  } catch (error) {
    console.log('error',error);
  }
}

/* Function to GET Project Data */

const updateUI = async () => {
  const response = await fetch('/all');
  try{
    const allData = await response.json();
    document.getElementById('date').innerHTML = `<span style="color:#000000">Today is:</span> ${allData.date}`;
    document.getElementById('temp').innerHTML = `<span style="color:#000000">Temperature:</span> ${allData.temp} degrees`;
    document.getElementById('content').innerHTML = `I am feeling '${allData.feeling}'!`;
  }
  catch(error){
    console.log("error", error);
  }
}

