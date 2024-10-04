const temperature = 56; // °F
const windSpeed = 10; // mph


let year = document.querySelector("#year");
let today = new Date();

let lastModified = document.querySelector("#lastModified");
let oLastModif = new Date(document.lastModified);


year.innerHTML = `<span class="footer">${today.getFullYear()}</span>`;
lastModified.innerHTML = `Last modified: ${oLastModif.toLocaleDateString()}`;

function calculateWindChill(temp, speed) {
    return (35.74 + (0.6215 * temp) - (35.75 * Math.pow(speed, 0.16)) + (0.4275 * temp * Math.pow(speed, 0.16))).toFixed(2);
  }

  function displayWindChill() {
    const tempElement = document.getElementById('temperature');
    const windSpeedElement = document.getElementById('windSpeed');
    const windChillElement = document.getElementById('windChill');
  
    const temp = parseFloat(tempElement.textContent);
    const speed = parseFloat(windSpeedElement.textContent);
  
    // Viable Wind Chill Conditions
    if (temp <= 50 && speed > 3) {
      const windChill = calculateWindChill(temp, speed);
      windChillElement.textContent = windChill + " °F";
    } else {
      windChillElement.textContent = "N/A";
    }
  }

  window.onload = displayWindChill;