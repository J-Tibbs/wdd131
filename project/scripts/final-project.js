let year = document.querySelector("#year");
let today = new Date();

let lastModified = document.querySelector("#lastModified");
let oLastModif = new Date(document.lastModified);
const apiKey = '6d079164c94e68ca6a0aea6389e053ca';

year.innerHTML = `<span class="footer">${today.getFullYear()}</span>`;
lastModified.innerHTML = `Last modified: ${oLastModif.toLocaleDateString()}`;


// Weather
  const weatherUrl = (lat, lon) =>
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

  function updateWeatherInfo(weather) {
    const location = weather.name; // City name from the API
    const temperature = weather.main.temp;
    const conditions = weather.weather[0].description;
    const windSpeed = weather.wind.speed;
    let isGoodForDiscGolf = temperature >= 65 && temperature <= 80 && windSpeed <= 15;

    // Update the HTML elements with the weather info and location
    document.getElementById('location').innerText = `Location: ${location}`;
    document.getElementById('temperature').innerText = temperature;
    document.getElementById('conditions').innerText = conditions;
    document.getElementById('windSpeed').innerText = windSpeed;
    document.getElementById('answer').innerText = isGoodForDiscGolf ? "Yes" : "No";
  }

  function fetchWeather(lat, lon) {
    fetch(weatherUrl(lat, lon))
      .then(response => response.json())
      .then(updateWeatherInfo)
      .catch(error => console.error('Error fetching weather data:', error));
  }

  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      fetchWeather(latitude, longitude);
    }, error => {
      console.error('Error getting location:', error);
    });
  } else {
    console.error('Geolocation is not supported by this browser.');
  }


//   Courses
  // Initialize the map
  document.addEventListener('DOMContentLoaded', function() {
    const map = L.map('map').setView([51.505, -0.09], 13); 


  // Add OpenStreetMap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
  }).addTo(map);

  // Add geolocation to find the user's location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const userLocation = [position.coords.latitude, position.coords.longitude];
      map.setView(userLocation, 12);

      // Add a marker for the user's location
      L.marker(userLocation).addTo(map)
        .bindPopup("You are here.")
        .openPopup();

      // Fetch nearby disc golf courses using Overpass API
      fetchCourses(userLocation);
    });
  }

  function fetchCourses(location) {
    const [lat, lon] = location;
    const radius = 15000; // 15 km
    
    // Overpass API query for disc golf courses near the user's location
    const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];node[leisure=pitch][sport=disc_golf](around:${radius},${lat},${lon});out;`;

    fetch(overpassUrl)
      .then(response => response.json())
      .then(data => {
        const courses = data.elements;
        displayCourses(courses);
      });
  }

  function displayCourses(courses) {
    const courseList = document.getElementById("course-list");
    courseList.innerHTML = '';

    courses.forEach(course => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <strong>Course ID: ${course.id}</strong>
        <p>Location: [${course.lat}, ${course.lon}]</p>
      `;

      // Add marker on the map
      L.marker([course.lat, course.lon]).addTo(map)
        .bindPopup("Disc Golf Course");

      courseList.appendChild(listItem);
    });
  }
});


//Scorecard
document.addEventListener('DOMContentLoaded', function() {
  const scoreInput = document.querySelector('#score');
  const parInput = document.querySelector('#par');
  const button = document.querySelector('#enter');
  const list = document.querySelector('#list');
  const totalParElement = document.querySelector('#totalPar');
  const totalScoreElement = document.querySelector('#totalScore');
  const overUnderElement = document.querySelector('#overUnder');

  // Initialize total score and total par
  let totalPar = 0;
  let totalScore = 0;

  button.addEventListener('click', function() {
    // Make sure both inputs are filled
    if (scoreInput.value.trim() !== '' && parInput.value.trim() !== '') {
      // Parse the input values as numbers
      const scoreValue = parseInt(scoreInput.value);
      const parValue = parseInt(parInput.value);

      if (!isNaN(scoreValue) && !isNaN(parValue)) {
        // Update the running totals
        totalScore += scoreValue;
        totalPar += parValue;

        // Update the display for total par, total score, and over/under
        totalParElement.textContent = totalPar;
        totalScoreElement.textContent = totalScore;
        overUnderElement.textContent = totalScore - totalPar;

        // Create a list item for the new score entry
        const li = document.createElement('li');
        const deleteButton = document.createElement('button');
        li.textContent = `Par: ${parValue}, Score: ${scoreValue}`;
        deleteButton.textContent = '❌';

        list.appendChild(li);
        li.appendChild(deleteButton);

        // Clear the input fields
        scoreInput.value = '';
        parInput.value = '';

        // Add event listener for the delete button
        deleteButton.addEventListener('click', function () {
          // Subtract the values from totals when an entry is deleted
          totalScore -= scoreValue;
          totalPar -= parValue;

          // Update the display again
          totalParElement.textContent = totalPar;
          totalScoreElement.textContent = totalScore;
          overUnderElement.textContent = totalScore - totalPar;

          // Remove the list item from the DOM
          list.removeChild(li);
        });
      }
    }
  });
});
